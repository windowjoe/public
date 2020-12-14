class BootStrapTabs
{
    constructor(options)
    {
        Object.assign(this, {
            addFormID: 'add_' + options.module,
            tabsContentCount: 0,
            tabNavAnchorClass: 'tab-nav-anchor',
            activeTabs: []
        }, options);
    }

    init(data) {
        let s = this;

        if (!s.page.forms.layout.hasTabs) return false;

        if (!this.pageInitialized) s.setEventListeners();

        let rows = data.results.rows;
        let formIDs = s.gSV.getRowPKIDs(rows, 'array');

        //apply to add form
        if (!this.pageInitialized) {
            s.updateTabContentIDs(s.addFormID);
        }

        //apply to update forms, some pages don't have update forms on initial load
        s.updateTabContentIDs(formIDs);

        s.setActiveTabs(formIDs);

        this.pageInitialized = true;
    }

    setEventListeners()
    {
        var s = this;

        s.eLM.setEventListeners(s.page, s.page.containers.fetch.attributes.id, {
            selector: '.' + s.tabNavAnchorClass,
            eventTrigger: 'show.bs.tab',
            cancelEventTrigger: true,
            callbacks: [function(event){ return s.tabShowingFlag(event);}]
        });
    }

    tabShowingFlag(event)
    {
        let s = this;
        let anchor = event.target;

        let hrefAttr = anchor.attributes.getNamedItemNS(null, 'href');
        let href = hrefAttr.nodeValue;
        let form = anchor.closest('FORM');
        let formID = form.id;
        let tabContent = anchor.closest('.nav-tabs').nextSibling;
        let tabContentID = tabContent.id;


        if (!s.activeTabs.includes(formID)) {
            s.activeTabs.push(formID);
            s.activeTabs[formID] = [];
        }

        if (!s.activeTabs[formID].includes(tabContentID)) {
            s.activeTabs[formID].push(tabContentID);
            s.activeTabs[formID][tabContentID] = [];
        }

        if (!s.activeTabs[formID][tabContentID].includes(href)) {
            s.activeTabs[formID][tabContentID] = [];
            s.activeTabs[formID][tabContentID].push(href);
        }
    }

    setActiveTabs(formIDs)
    {
        if (!formIDs) return false;

        let s = this;

        s.activeTabs.forEach(function(formID) {
            if (formIDs.includes(formID)) {
                s.activeTabs[formID].forEach(function(tabContentID) {
                    let tabPaneID = s.activeTabs[formID][tabContentID][0].substring(1);
                    let anchorID = '#' + tabPaneID + '-anchor';
                    let anchor = document.getElementById(anchorID);
                    let liList = anchor.closest('UL').getElementsByTagName('LI');

                    for (let li of liList) {
                        li.className = '';
                    }

                    let li = anchor.closest('LI').className = 'active';

                    let tabPanes = document.getElementById(tabContentID).childNodes;

                    for (let pane of tabPanes) {
                        pane.className = 'tab-pane fade';
                    }

                    document.getElementById(tabPaneID).className = 'tab-pane fade in active';
                });
            }
        });
    }


    createTabLayout(tabs, fields, r, c, f)
    {
        if (!tabs) return false;

        let s = this;

        tabs = new Map(Object.entries(tabs));

        r.currRowHTML += s.createTabNav(tabs);
        r.currRowHTML += '<div class="tab-content">';

        tabs.forEach(function(tab, tabName) {
            s.getBegOfTabPaneHTML(tabName, tab.active, r);
            s.layouts.createColLayout(tab.cols, fields, r, c, f);
            s.getEndOfTabPaneHTML(r, c);
        });

        r.currRowHTML += '</div><!--end tab-content-->';
    }

    /**
     * @param {Object} tabs tab objects
     */
    createTabNav(tabs)
    {
        let s = this;
        let tabNav = '<ul class="nav nav-tabs">';

        tabs.forEach(function(tab, tabName) {
            let a = s.createHTMLElements.createHTMLElement({tagName: 'a', attributesStr: 'name="' + tabName + '"', dataAttributesStr: 'data-toggle="tab"', className: 'tab-nav-anchor', href: tabName}, tab.tabHeader);

            let className = tab.active ? ' active' : '';
            tabNav += s.createHTMLElements.createHTMLElement({tagName: 'li', className: className}, a);
        });

        tabNav += '</ul>';

        return tabNav;
    }

    getBegOfTabPaneHTML(tabName, active = false, r)
    {
        let classNameTabPane = 'tab-pane fade';
        let classNameTabPaneActive = 'in active';

        let html  = '<div id="' + tabName +'" class="' + classNameTabPane;
            html += active ? ' ' + classNameTabPaneActive + '"' : '"';
            html += '>';

        r.currRowHTML += html;
    }

    getEndOfTabPaneHTML(r, c)
    {
        r.currRowHTML += c.currColHTML + '</div>';
        c.currColHTML = '';
        r.currRowHTML += '</div><!--end current tab pane-->';
    }

    updateTabContentIDs(formIDs, options)
    {
        if (!formIDs) return false;

        formIDs = Array.isArray(formIDs) === true ? formIDs : [formIDs];

        let s = this;
        let defaults = {tabContentClass: 'tab-content'};
        let {tabContentClass} = Object.assign(defaults, options);
        let tabsContentCount = 0;

        formIDs.forEach(function(formID) {
            tabsContentCount = 0;
            let form = document.getElementById(formID);
            let tabsContent = form.getElementsByClassName(tabContentClass);

            for (let tabContent of tabsContent) {
              tabContent.id = formID + '-tabContent-' + s.addLeadingZeroToDigit(tabsContentCount);
              s.updateTabPaneIDs(tabContent);
              tabsContentCount++;
            }
        });
    }

    updateTabPaneIDs(tabContent, options)
    {
        if (!tabContent) return false;

        let s = this;
        let tabContentID = tabContent.id;
        let defaults = {tabNavAnchorClass: 'tab-nav-anchor', tabPaneClass: 'tab-pane'}
        let {tabNavAnchorClass, tabPaneClass} = Object.assign(defaults, options);
        let tabPanes = tabContent.getElementsByClassName(tabPaneClass);
        let tabNavAnchors = tabContent.previousSibling.getElementsByTagName('A');

        s.setTabNavAnchorAttributes(tabContentID, tabNavAnchors);
        s.setTabPaneIDs(tabContentID, tabPanes);
    }

    setTabNavAnchorAttributes(formID, tabNavAnchors)
    {
        for (let anchor of tabNavAnchors) {
            anchor.setAttribute('href', '#' + formID + '-' + anchor.getAttribute('href'));
            anchor.setAttribute('id', anchor.getAttribute('href') + '-anchor');
        }
    }

    setTabPaneIDs(formID, tabPanes)
    {
        for (let tabPane of tabPanes) {
          tabPane.id = formID + '-' + tabPane.id;
        }
    }

    addLeadingZeroToDigit(num)
    {
        return (String(num).length == 1) ? '0' + String(num) : num;
    }
};