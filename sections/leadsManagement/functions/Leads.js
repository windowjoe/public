module.exports = class Leads
{
    constructor(options)
    {
        Object.assign(this, options);
    }

    init()
    {
        let s = this;

        s.setViewEventListeners();
    }

    setViewEventListeners()
    {
        let s = this;
        let metaBtnsContainerID = s.page.containers.metaBtns.attributes.id;
        let addContainerID = s.page.containers.add.attributes.id;
        let fetchContainerID = s.page.containers.fetch.attributes.id;

        //setup lead search form submit btn
        s.eLM.setEventListeners(s.page, metaBtnsContainerID, {
            selector: '#lead_search_submit',
            cancelEventTrigger: true,
            callbacks: [function(event){return s.doFetch(event);}]
        });

        s.eLM.setEventListeners(s.page, fetchContainerID, {
            selector: '.resubmit',
            cancelEventTrigger: true,
            callbacks: [function(event){return s.resubmitLeadForm(event);}]
        });
    }

    doFetch(event)
    {
        event.preventDefault();

        let s = this;        

        s.page.objects[s.page.objects.instances.bootStrapTabs.name].activeTabs = [];

        let fetchNamesVals = s.getViewQueryStr();
        let crudResult = s.ajax.runCrud(s.page, {
            fetchNamesVals: fetchNamesVals
        });

        s.fV.fadeAndEmptyContainer(this.page.containers.fetch.attributes.id);
    }

    getViewQueryStr()
    {
        let s = this;
        let value      = document.getElementById('lead_search_value').value;
        let param = s.getLeadSearchField(value);
        let start_date = document.getElementById('lead_search_start').value;
        let end_date   = document.getElementById('lead_search_end').value;
        let namesVals = '';

        if (value) {
            namesVals += param + '=' + value;
        }

        if (start_date && end_date) {
            namesVals += '&fetchFilter[dateTime]=' + start_date + ',' + end_date;
        }

        return namesVals;
    }

    getLeadSearchField(searchValue)
    {   
        if (searchValue.match(/^\d+$/)) {
            if (searchValue.length === 5) {
                return 'fetchFilter[Zip]';
            } 

            return 'fetchFilter[CCLeadID]';
        }

        return 'fetchFilter[BuyingVendor]';
    }

    resubmitLeadForm(event)
    {
        event.preventDefault();

        let fields = ['site', 'FN', 'LN', 'S1', 'CT', 'SP', 'PC', 'HP', 'phone_type', 'EM', 'user_ip', 'scope', 'num_windows', 'buy_timeframe', 'own_home', 'comments', 'tf_cert_url'];
        let btn = event.currentTarget;
        let btnName = btn.name;
        let buyingVendor = btnName.substring(0, btnName.indexOf('_'));
        let form = btn.closest('FORM');
        let queryStr = '?selected_buying_vendor=' + buyingVendor;

        fields.forEach(function(fieldName) {
            queryStr += '&' + fieldName + '=' + form.querySelector('[name="' + fieldName + '"]').value;
        });

        let url = DOMAIN + 'intranet/sections/leads-management/leads-form-windows.html' + queryStr;

         var win = window.open(url, '_blank');
             win.focus();
    }
};
