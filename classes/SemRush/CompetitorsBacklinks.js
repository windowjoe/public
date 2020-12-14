/**
 * Class to integrate with the SemRush API's backlinks call
 * This class queries and stores backlinks for a given url
 */
class CompetitorsBacklinks
{
    /**
     *Create Backlinks Object for dataExchange to use.
     *
     *@param data Takes a DataPage Object to interact with the page's forms
     */
    constructor(options)
    {
        Object.assign(this, {
            fields: options.p.fields,
            ajaxAPIURL: DOMAIN + 'intranet/php/ajax/apis/semRush/competitors-backlinks.php',
            tableHeadline: 'Competitors Backlinks',
            noBacklinksMessage: 'No competitor backlinks exist for this page.  Please refresh to check again',
            refreshBtnID: 'competitors_backlinks_refresh',
            contentElementID: 'competitors_backlinks',
            tableID: 'competitors_backlinks_table',
            url: '',
            type: '',
            pageName: '',
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

        s.setPageName();
        s.setURL();
        s.setType();
    }

    /**
     * Sets this.pageURL to URL of page e.g. https://www.windowreplacement.net/alabama.html
     * Uses page field to get name of page
     */
    setURL()
    {
        this.url = DOMAIN_WR + this.pageName + '.html';
    }

    setType()
    {
        this.type = document.getElementById('type').value;
    }

    setPageName()
    {
        let s = this;
        let pageName = document.querySelector('[name="page"]').value;
        pageName = pageName.toLowerCase();
        s.pageName = pageName.replace(/ /g, '-');
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

        let namesVals  = 'proc=' + 'fetch' + '&url=' + s.url;
            namesVals += '&refresh_data=' + refresh_data;
            namesVals += '&page=' + s.pageName + '&type=' + s.type;

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
        let competitorsDomain = '';

        let html = `
        <table id="` + s.tableID + `" class="table-striped">
            <tr style="border-bottom: 1px solid #000000;"><th colspan="10" style="text-align: left;">` + s.tableHeadline + `</th></tr>`;

            if (rows.size === 0) {
                html += `<tr><td class="left" colspan="10">` + s.noBacklinksMessage + `</td></tr>`;
            }

        rows.forEach(function(row, pk) {
            let firstSeen = row.first_seen;
            let lastSeen = row.last_seen;

            if (competitorsDomain !== row.competitors_domain) {
                competitorsDomain = row.competitors_domain;
                html += `<tr style="border-bottom: 1px solid #000000;"><th colspan="10" style="text-align: left;">` + competitorsDomain + `</th></tr>`;
            }

            let rowHTML = `
                       <tr class="header_border">
                         <th>Pulled</th><th>First Seen</th><th>Last Seen</th><th>DAS</th><th>DS</th>
                         <th>DTS</th><th>BLN</th>
                       </tr>
                       <tr class="header_border">
                         <td>` + row.record_date + `</td><td>` + firstSeen + `</td><td>` + lastSeen + `</td>
                         <td>` + row.domain_ascore + `</td><td>` + row.domain_score + `</td>
                         <td>` + row.domain_trust_score + `</td><td>` + row.backlinks_num+ `</td>
                       </tr>
                       <tr class="header_border">
                         <td colspan="4" style="text-align:left;"><a target="_blank" href="https://www.` + row.domain + `">` + row.domain + `</a></td>
                         <td colspan="3" style="text-align:left;">
                            <a target="_blank" title="` + row.competitors_url + `" href="https://wwww.` + row.competitors_url + `">` + row.competitors_url + `</a>
                         </td>
                       </tr>`;

                html += rowHTML;
        });

        html += `
        </table>`;

        document.getElementById(s.contentElementID).innerHTML = html;

        document.querySelector('#competitors_backlinks_table tr:last-child').style.borderBottomWidth = 0;
    }

    formatDate(date)
    {
        let formattedDate = new Date(date);
            return (formattedDate.getMonth() + 1) + '/' + formattedDate.getDate() + '/' + formattedDate.getFullYear();
    }
};
