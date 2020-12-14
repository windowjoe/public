/**
 * Class to integrate with the SemRush API's backlinks call
 * This class queries and stores backlinks for a given url
 */
class Backlinks
{
    /**
     *Create Backlinks Object for dataExchange to use.
     *
     *@param data Takes a DataPage Object to interact with the page's forms
     */
    constructor(options)
    {
        Object.assign(this, {
            ajaxAPIURL: DOMAIN + 'intranet/php/ajax/apis/semRush/backlinks.php',
            fields: options.p.fields,
            tableHeadline: 'Page Backlinks',
            refreshBtnID: 'backlinks_refresh',
            contentElementID: 'backlinks',
            tableID: 'backlinks_table',
            url: ''
        }, options);
    }

    init()
    {
        this.setEventListeners();
    }

    setEventListeners(event)
    {
        let s = this;
        let selector = '#' + s.refreshBtnID;

        s.eLM.setEventListeners(s.page, s.page.containers.main.attributes.id, {
            selector: selector,
            cancelEventTrigger: true,
            callbacks: [function(event){ return s.loadBacklinks(event);}]
        });
    }

    init()
    {
        let s = this;
        let site = document.getElementById('site');
        let value = site ? site.value : false;

        if (site && value) {
            s.setClassVars();
            s.loadBacklinks();
        }
    }

    setClassVars()
    {
        let s = this;

        s.setURL();
    }

    /**
     * Sets this.pageURL to URL of page e.g. https://www.windowreplacement.net/alabama.html
     * Uses page field to get name of page
     */
    setURL()
    {
        let s = this;
        let pageName = '';

            s.page = document.querySelector('[name="page"]').value;
            pageName = s.page.toLowerCase();
            pageName = pageName.replace(/ /g, '-');
            s.url = DOMAIN_WR + pageName + '.html';
    }

    loadBacklinks(event)
    {
        let s = this;
        event = event || false;

        let refresh_data = false;
        let formID = false;

        if (event) {
            formID = event.currentTarget.form.id;

            if (event.currentTarget.id == s.refreshBtnID) {
                refresh_data = true;
            } else {
                refresh_data = false;
            }
        }

        let proc = "fetch";
        let url = s.url;

        let namesVals  = 'proc=' + proc + '&url=' + url;
            namesVals += '&refresh_data=' + refresh_data;

        let ajax = new AjaxProcessing(statePagesPage);
        let result = ajax.ajaxProcessing(namesVals, {url: s.ajaxAPIURL});

        result.done(function(data) {
            let success = data.success;
            let rows = new Map(Object.entries(data.results.rows));

            if (success) {
                s.formatPageInfo(rows);
                if (refresh_page_data) {
                    s.fV.flashResultStatusOnBtn(s.refreshBtnID, formID, success);
                }
            } else {
                console.log(data);
                document.getElementById(s.contentElementID).innerHTML = 'No backlinks exist. Please refresh to check.'
            }
        });
    }

    formatPageInfo(rows)
    {
        let s = this;

        let html = `
        <table id="` + s.tableID + `" class="table-striped">
            <tr style="border-bottom: 1px solid #000000;"><th colspan="10" style="text-align: left;">` + s.tableHeadline + `</th></tr>`;

            if (rows.size === 0) {
                html += `<tr><td class="left" colspan="10">No backlinks exist for this page.  Please refresh to check again</td></tr>`;
            }

        rows.forEach(function(row, pk) {
            let firstSeen = row.first_seen;
            let lastSeen = row.last_seen;
            let sitewide = row.sitewide === 'false' ? 'No' : 'Yes';
            let nofollow = row.nofollow === 'false' ? 'No' : 'Yes';

            let rowHTML = `
                       <tr class="header_border">
                         <th>Pulled</th><th>First Seen</th><th>Last Seen</th><th>PS</th><th>PTS</th>
                         <th>SW</th><th>NF</th><th>IL</th><th>EL</th><th>RC</th>
                       </tr>
                       <tr class="header_border">
                         <td>` + row.record_date + `</td><td>` + firstSeen + `</td><td>` + lastSeen + `</td>
                         <td>` + row.page_score + `</td><td>` + row.page_trust_score + `</td>
                         <td>` + sitewide + `</td><td>` + nofollow + `</td><td>` + row.internal_num + `</td>
                         <td>` + row.external_num + `</td><td>` + row.response_code + `</td>
                       </tr>
                       <tr class="header_border">
                         <td colspan="10" style="text-align:left;"><a target="_blank" href="` + row.source_url + `">` + row.source_url + `</a></td>
                       </tr>
                       <tr class="header_border" style="border-color:#000000;">
                         <td colspan="10" style="text-align:left;"><a target="_blank" title="` + row.target_url + `" href="` + row.target_url + `">` + row.anchor + `</a></td>
                       </tr>`;

                html += rowHTML;
        });

        html += `
        </table>`;

        document.getElementById(s.contentElementID).innerHTML = html;

        document.querySelector('#backlinks_table tr:last-child').style.borderBottomWidth = 0;
    }

    formatDate(date)
    {
        let formattedDate = new Date(date);
            return (formattedDate.getMonth() + 1) + '/' + formattedDate.getDate() + '/' + formattedDate.getFullYear();
    }
};
