/** Class to integrate with the SemRush API's site_audit_page_info call */
class SiteAuditPageInfo
{
    /**
     *Create SiteAuditPageInfo Object for dataExchange to use.
     *
     *@param data Takes a DataPage Object to interact with the page's forms
     */
    constructor(options)
    {
        Object.assign(this, {
            apiProjectInfoURL: DOMAIN + 'intranet/php/ajax/apis/semRush/site-audit-page-info.php',
            fields: options.p.fields,
            refreshPageDataBtnID: 'refresh_page_data',
            contentElementID: 'page_data',
            semRushPageID: false,
            pageName: '',
            url: '',
            semRushProjectID: ''
        }, options);
    }

    init()
    {
        this.setEventListeners();
    }

    setEventListeners(event)
    {
        let s = this;
        let selector = '#' + s.refreshPageDataBtnID;

        s.eLM.setEventListeners(s.page, s.page.containers.main.attributes.id, {
            selector: selector,
            cancelEventTrigger: true,
            callbacks: [function(event){ return s.semRushLoadPageInfo(event);}]
        });
    }

    init()
    {
        let s = this;
        let site = document.getElementById('site');
        let value = site ? site.value : false;

        if (site && value) {
            s.setClassVars();
            s.semRushLoadPageData();
        }
    }

    setClassVars()
    {
        let s = this;

        s.semRushPageID = false;
        s.setSemRushProjectID();
        /*s.setSemRushPageID();*/
        s.setURL();
    }

    setSemRushProjectID()
    {
        let s = this;

        s.semRushProjectID = document.querySelector('[name="semrush_project_id"]').value;
    }

/*    setSemRushPageID()
    {
        let s = this;

        let semRushPageID = document.querySelector('[name="semrush_page_id"]');
        s.semRushPageID = semRushPageID ? semRushPageID.value : false;
    }*/

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

    semRushLoadPageData()
    {
        let s = this;

        s.semRushLoadPageInfo();
    }

    semRushLoadPageInfo(event)
    {
        event = event || false;

        let refresh_page_data = false;
        let formID = false;

        if (event) {
            formID = event.currentTarget.form.id;

            if (event.currentTarget.id == 'refresh_page_data') {
                refresh_page_data = true;
            } else {
                refresh_page_data = false;
            }
        }

        let s = this;
        let proc = "fetch";
        let url = s.url;
        let semRushProjectID = s.semRushProjectID;
        let semRushPageID = s.semRushPageID;

        let namesVals  = 'proc=' + proc + '&url=' + url + '&semrush_project_id=' + semRushProjectID + '&semrush_page_id=' + semRushPageID;
            namesVals += '&refresh_page_data=' + refresh_page_data;

        let ajax = new AjaxProcessing(statePagesPage);
        let result = ajax.ajaxProcessing(namesVals, {url: s.apiProjectInfoURL});

        result.done(function(data) {
            let success = data.success;
            let row = data.results.rows[Object.keys(data.results.rows)[0]];

            if (success) {
                s.semRushPageID = row.semrush_page_id;
                s.formatPageInfo(row);

                if (refresh_page_data) {
                    s.fV.flashResultStatusOnBtn(s.refreshPageDataBtnID, formID, success);
                }
            } else {
                alert (result);
            }
        });
    }

    formatPageInfo(row)
    {
        let s = this;
        //let json = JSON.parse(row.original_json);
        let json = JSON.parse(row.original_json);
        let canonical = s.url === row.canonical ? 'self' : 'NM';
        let canonicalCompareUrl = canonical ? false : s.url;
        let canonicalUrl = canonical ? false : row.canonical;
        let incomingInternalLinks = s.getIncomingInternalLinks(json.incoming.urls);
        let pageViews = json.ga ? json.ga.pageViews : 'N/A';
        let notices = s.getIssues(json.notices, 'Notices');
        let warnings = s.getIssues(json.warnings, 'Warnings');
        let errors = s.getIssues(json.errors, 'Errors');
        let canonicalHTML = '';

        if (canonical === 'NM') {
            canonicalHTML += `<tr>
                                <td>Page</td>
                                <td colspan="7" class="left">` + canonicalCompareUrl + `</td>
                              </tr>
                              <tr>
                                <td>Canonical</td>
                                <td colspan="7" class="left">` + canonicalUrl + `</td>
                              </tr>`;
        } else {
            canonicalHTML = '';
        }

        let html = `<table id="page_data_table" class="table-striped">
            <tr>
              <th>Pulled</th><th>Can</th><th>LT</th><th>PV</th><th>PR</th>
              <th>CD</th><th>Out EL</th><th>Out IL</th><th>In IL</th>
            </tr>`
            + canonicalHTML +
            `<tr class="header_border">
              <td>` + row.record_date + `</td><td>` + canonical + `</td><td>` + json.pageLoadTime + `ms</td>
              <td>` + pageViews + `</td><td>` + json.prScore + `</td>
              <td>` + json.depth + `</td><td>` + json.outExtLnsCnt + `</td>
              <td>` + json.outIntLnsCnt + `</td><td>` + json.incoming.total + `</td>
            </tr>`
            + notices
            + warnings
            + errors +
            `<tr>
        </table>`;

        document.getElementById('page_data').innerHTML = html;
    }

    getIssues(issues, type)
    {
        let s = this;
        let text = '';
        let headerRow = true;

        issues.forEach(function(issue) {
            let header = headerRow ? '<th class="left">' + type + '</th>' : '<th></th>';
            let className = headerRow ?  'class="header_border"' : '';
                headerRow = false;

            text += `<tr ` + className + `>` + header + `<th class="left" colspan="8">` + semRushErrorCodeDesc[issue.id] + `</th></tr>`;

            let data = '';
            issue.data.forEach(function(obj) {
                data += `<tr><td></td><td class="left">` + s.formatDate(obj.discovered) + `</td>`;

                let info = obj.info;
                let targetUrl = obj.target_url;

                if (info && targetUrl) {
                    data += `<td class="left" colspan="7">` + info.resourceType + `<br />` + targetUrl + `</td>`;
                } else if (info) {
                    data += `<td class="left" colspan="7">` + info + `</td>`;
                } else if (targetUrl) {
                    data += `<td class="left" colspan="7">` + targetUrl + `</td>`;
                } else if (!info && !targetUrl) {
                    data += '<td class="left" colspan="7">' + s.url + '</td>';
                }

                data += `</tr>`;
            });

            text += data;
        });

        text = text === '' ? '<tr class="header_border"><th class="left">' + type + '</th><td class="left" colspan="8">No ' + type.toLowerCase() + '</td></tr>' : text;

        return text;
    }

    formatDate(date)
    {
        let formattedDate = new Date(date);
            return (formattedDate.getMonth() + 1) + '/' + formattedDate.getDate() + '/' + formattedDate.getFullYear();
    }

    getIncomingInternalLinks(urls)
    {
        let links = '';

        urls.forEach(function(url) {
            links += url.replace(DOMAIN_WR, '') + ', ';
        });

        return links.substring(0, links.lastIndexOf(','));
    }
};
