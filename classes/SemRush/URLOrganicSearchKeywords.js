/**
 * Class to integrate with the SemRush API's url_organic call
 * This class queries and stores those keywords that are in
 * Google's top 20 results and which lead to the url from organic
 * search results
 */
class URLOrganicSearchKeywords
{
    /**
     *Create URLOrganicSearchKeywords Object for dataExchange to use.
     *
     *@param data Takes a DataPage Object to interact with the page's forms
     */
    constructor(data)
    {
        Object.assign(this, {
            ajaxAPIURL: DOMAIN + 'intranet/php/ajax/apis/semRush/url-organic-search-keywords.php',
            tableHeadline: 'URL Organic Search Keywords',
            refreshBtnID: 'url_organic_search_keywords_refresh',
            contentElementID: 'url_organic_search_keywords',
            tableID: 'url_organic_search_keywords_table',
            url: '',
            type: '',
            pageName: '',
            fields: options.p.fields
        }, options);
    }

    init(data)
    {
        this.setEventListeners(this.initialized);
    }

    setEventListeners(event)
    {
        if (event === true) return false;

        let s = this;
        let selector = '#' + s.refreshBtnID;

        s.eLM.setEventListeners(s.page, s.page.containers.main.attributes.id, {
            selector: selector,
            cancelEventTrigger: true,
            callbacks: [function(event){ return s.loadURLOrganicSearchKeywords(event);}]
        });
    }

    init()
    {
        let s = this;
        let site = document.getElementById('site');
        let value = site ? site.value : false;

        if (site && value) {
            s.setClassVars();
            s.loadURLOrganicSearchKeywords();
        }
    }

    setClassVars()
    {
        let s = this;

        s.setURL();
        s.setType();
        s.setPageName();
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

    setType()
    {
        this.type = document.getElementById('type').value;
    }

    setPageName()
    {
        let sel = document.getElementById(this.type);

        this.pageName = sel.options[sel.selectedIndex].text;
    }

    loadURLOrganicSearchKeywords(event)
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
            namesVals += '&page=' + s.pageName + '&type=' + s.type;

        let ajax = new AjaxProcessing(statePagesPage);
        let result = ajax.ajaxProcessing(namesVals, {url: s.ajaxAPIURL});

        result.done(function(data) {
            let success = data.success;
            let rows = new Map(Object.entries(data.results.rows));

            if (success) {
                s.formatPageInfo(rows);
              //  console.log(data);
                if (refresh_page_data) {
                    s.fV.flashResultStatusOnBtn(s.refreshBtnID, formID, success);
                }
            } else {
                alert (result);
            }
        });
    }

    formatPageInfo(rows)
    {
        let s = this;

        let html = `
        <table id="` + s.tableID + `" class="table-striped">
            <tr><th colspan="5">` + s.tableHeadline + `</th>
            <tr><th style="width:50%;">Keyword</th><th>Pos</th><th>Srch Vol</th><th>CPC</th><th>Device</th></tr>`;

        rows.forEach(function(row) {
            html += '<tr>';
            html += '<td>' + row.keyword + '</td>';
            html += '<td>' + row.position + '</td>';
            html += '<td>' + row.search_volume + '</td>';
            html += '<td>' + row.cpc + '</td>';
            html += '<td>' + row.device_type + '</td>';
            html += '</tr>';
        });

        html += `
        </table>`;

        document.getElementById(s.contentElementID).innerHTML = html;
    }
};
