class WindowInstallers
{
    constructor(options)
    {
        Object.assign(this, {
            mainContainerID: options.page.containers.main.attributes.id,
            addContainerID: options.page.containers.add.attributes.id,
            addSearchInstallerSel: '#addSearch_search_form [name="installers"]',
            viewContainerID: options.page.containers.view.attributes.id,
            viewInstallerSel: '#view_search_form [name="view_installer"]',
            fetchContainerID: options.page.containers.fetch.attributes.id
        }, options);
    }

    init(data)
    {
        let s = this;

        s.setViewEventListeners(s.initialized);
        s.doProcInit(data.proc, s.initialized, data.results.rows);
        s.setInitialized(true);
    }

    doProcInit(proc, initialized, rows)
    {
        let s = this;

        if (!initialized || !s[proc + 'Init']) return false;

        rows = !rows || rows[Object.keys(rows)[0]];

        s[proc + 'Init'](initialized, rows);
    }

    addInit(initialized, row)
    {
        this.dS.removeSelectedIndex(this.addSearchInstallerSel);
    }

    updateInit(initialized, row)
    {
        let companyName = row.company_name;
        let locationAddress1 = row.location_address_1;

        this.dS.updateOptionText(this.viewInstallerSel, companyName + ' - ' + locationAddress1);
    }

    deleteInit(initialized, row)
    {
        let formType = s.page.dP.forms.getSearchFormType(row.data);

        this.dS.removeSelectedIndex(s[formType + 'InstallerSel']);
    }

    /**
     * Sets event listeners on the add and update/fetch forms
     *
     * @initialized {Boolean} Boolean value declaring if page has been
     *                        initialized
     *
     * @return      {Boolean} Returns true after setting event listeners
     */
    setViewEventListeners(initialized)
    {
        if (initialized) return false;

        let s = this;
        let mainContainerID = s.mainContainerID;
        let addContainerID = s.addContainerID;
        let fetchContainerID = s.fetchContainerID;

        //add form - clear fetch div when add button is clicked
        s.eLM.setEventListeners(s.page, addContainerID, {
            selector: '[name="add"]',
            callbacks: (event) => {return s.rF.resetSelects('addSearch_search_form', 'all');}
        });

        //add form - get all cities with listings in window_companies in the selected state
        s.eLM.setEventListeners(s.page, mainContainerID, {
            selector: '#addSearch_search_form [name="st"]',
            eventTrigger: 'change',
            callbacks: (event) => {s.fV.getSelectViewPagesList(event, {fetchFilter: 'CitiesList',
                                                           currSelectParamName: 'state',
                                                           nextSelectID: 'city',
                                                           urlType: 'addSearch',
                                                           tableModifier: false});
                            }
        });

        //add form - get all installers with listings in window_companies in the selected city and state
        s.eLM.setEventListeners(s.page, mainContainerID, {
            selector: '#addSearch_search_form [name="city"]',
            eventTrigger: 'change',
            callbacks: () => {s.fV.getSelectViewPagesList(event, {fetchFilter: 'InstallersList',
                                                                    currSelectParamName: 'city',
                                                                    fetchNamesVals: {state: 'st'},
                                                                    nextSelectID: 'installers',
                                                                    urlType: 'addSearch',
                                                                    tableModifier: false});
                        }
        });

        //add form - populate add form with specific installers
        s.eLM.setEventListeners(mainContainerID, {
            selector: '#addSearch_search_form [name="installers"]',
            eventTrigger: 'change',
            callbacks: () => {s.processIdRequest(event);}
        });



        //update form - get all cities that have an installer in them within the selected state
        s.eLM.setEventListeners(mainContainerID, {
            selector: '#view_search_form [name="view_state"]',
            eventTrigger: 'change',
            callbacks: (event) => {s.fV.getSelectViewPagesList(event, {fetchFilter: 'CitiesList', currSelectParamName: 'mailing_state',
                                                                              tableModifier: false, nextSelectID: 'view_city'});
                                }
        });

        //update form - get all installers within a selected state and city
        s.eLM.setEventListeners(mainContainerID, {
            selector: '#view_search_form [name="view_city"]',
            eventTrigger: 'change',
            callbacks: (event) => {s.fV.getSelectViewPagesList(event, {fetchFilter: 'InstallersList', fetchNamesVals: {'mailing_state': 'view_state'},
                                                                       currSelectParamName: 'mailing_city', nextSelectID: 'view_installer', tableModifier: false});
                                }
        });

        /**
         * update form - populate the update (fetch) form with
         * a specific installer that has been added to the new database
         */
        s.eLM.setEventListeners(mainContainerID, {
            selector: '#view_search_form [name="view_installer"]',
            eventTrigger: 'change',
            callbacks: (event) => {s.doFetch(event);}
        });


        /**
         * add and update forms - if location state changes, reverify address
         * if state is incorrect, address repopulates correctly
         */
        s.eLM.setEventListeners(mainContainerID, {
            selector: '[name="location_state"]',
            eventTrigger: 'change',
            callbacks: (event) => {s.aV.verifyAddresses(event, 'location');}
        });

        /**
         * add and update forms - if mailing state changes, reverify address
         * if state is incorrect, address repopulates correctly
         */
        s.eLM.setEventListeners(s.page, mainContainerID, {
            selector: '[name="mailing_state"]',
            eventTrigger: 'change',
            callbacks: (event) => {s.aV.verifyAddresses(event, 'mailing');}
        });

        /**
         * add and update forms - if location zip changes,
         * clears the address and service details tab/google map
         * new address is verified after address 1, address 2, city,
         * and state are chosen.  Verification is triggered by change in
         * state select element
         */
        s.eLM.setEventListeners(s.page, mainContainerID, {
            selector: '[name="location_zip"]',
            eventTrigger: 'keyup',
            callbacks: (event) => {s.aV.verify(event); s.gM.reset(event);}
        });

        /**
         * add and update forms - if mailing zip changes,
         * clears the address and service details tab/google map
         * new address is verified after address 1, address 2, city,
         * and state are chosen.  Verification is triggered by change in
         * state select element
         */
        s.eLM.setEventListeners(s.page, mainContainerID, {
            selector: '[name="mailing_zip"]',
            eventTrigger: 'keyup',
            callbacks: (event) => {s.aV.verify(event);}
        });

        /**
         * Service Details - if service radius is changed,
         * zips, cities, and map are cleared and repopulated per
         * new service radius
         */
        s.eLM.setEventListeners(s.page, mainContainerID, {
            selector: '[name="location_service_radius"]',
            eventTrigger: 'change',
            callbacks: (event) => {s.gM.init(event);}
        });

        //Service Details - map is drawn when tab is clicked?
        //VERIFY THIS ACTION
        s.eLM.setEventListeners(s.page, mainContainerID, {
            selector: '[name="service_details"]',
            eventTrigger: 'shown.bs.tab',
            callbacks: (event) => {s.gM.init(event);}
        });

        return true;
    }

    processSearchRequest(event, options)
    {
        event.preventDefault();

        let s = this;
        let searchType = document.getElementById('add_search_type').value;

        let defaults = {targetForm: 'add_windowInstallers'};
        let {targetForm} = Object.assign(defaults, options);

            targetForm = getByID(targetForm);

        let btn = $(event.srcElement);
        let searchForm = btn.parents('form');
        let searchField = searchForm.find('[name="add_search_field"]').val();
        let phoneSearch = (searchField === 'phone_search') ? true : false;
        let searchTerm = searchForm.find('[name="add_search_term"]').val();
        let searchCity = searchForm.find('[name="add_search_city"]').val();
        let searchState = searchForm.find('[name="add_search_st"]').val();
        let pk = searchForm.find('[name="add_search_results"]').val();

        s.gSV.clearFields(targetForm);

        s[searchType].getListings(phoneSearch, searchTerm, {city: searchCity, state: searchState});
    }

    processIdRequest(event)
    {
        event.preventDefault();

        if (event.target.value == '') return false;

        let s = this;
        let btn = $(event.target);
        let value = btn.val() == '' ? false : btn.val();
        let searchForm = btn.closest('form');
        let searchType = searchForm.find('[name="type"]').val();
        let containerName = searchForm.attr('id').indexOf('add') == 0 ? 'add' : 'fetch';

        let containerID = s.page.containers[containerName].attributes.id;
        let form = document.getElementById(containerID).getElementsByTagName('form')[0];

        let promise = s[searchType].doFetch(event);
    }

    doFetch(event)
    {
        if (!event.currentTarget.value) return false;

        let s = this;
        let fetchNamesVals = 'pk=' + event.currentTarget.value;

        let promise = s.ajax.runCrud({
                event,
                fetchNamesVals,
                selectID : event.target.id,
                fetchFormID: event.target.value,
                submittedFormID: event.currentTarget.form.id
            });
    }

    setInitialized(bool)
    {
        this.initialized = bool;
    }

    //FINISH CREATE WEB LINKS, IS FOUND IN POPULATE FORM
    createWebLinks(className)
    {
        className = valClassSelector(className);
        let elements = getByDOMID(windowInstallers.dP.containers.main.attributes.id).getElementsByClassName(className);

        elements = new Map(Object.entries(elements));

        elements.forEach(function(el) {
            el = document.getElementByID(el.id);
        });

        $.each(elements, function(index, el) {
                el = $(el);
            let input = el.find('input');
            let baseURL = input.attr('data-addon-url');
            let val = input.val();
            let addOn = $(el).find('.input-group-addon');

            if (val != false) {
                addOn.css('cursor', 'pointer');
                addOn.on('click', function() {
                    window.open(baseURL + val);
                });
            }
        });
    }

    /*
    getViewQueryStr()
    {
        var namesVals = '';

        $.each(this.page.viewQueryParams, function(paramName, elID) {
            namesVals += paramName + '=' + getByID(elID).val() + '&';
        });

        namesVals = namesVals.substring(0, namesVals.length - 1);

        return namesVals;
    }

    //reuse for yellow pages search
    //add form - setup add search form

    s.eLM.setEventListeners(s.page, addContainerID, {
        selector: '[name="add_search_submit"]',
        cancelEventTrigger: true,
        callbacks: [function(options){return s.processSearchRequest(event);}, {event: true}]
    });

    s.eLM.setEventListeners(s.page, mainContainerID, {
        selector: '[name="location_service_radius"]',
        eventTrigger: 'change',
        cancelEventTrigger: true,
        callbacks: [function(event){return s.zL.getZipsInRadius(event);}, {event: true}]
    });

    s.eLM.setEventListeners(s.page, addContainerID, {
        selector: '.web_link',
        cancelEventTrigger: true,
        callbacks: [function(event){return s.page.functions.smSearch(event);}, {event: true}]
    });

    s.eLM.setEventListeners(s.page, addContainerID, {
        selector: '.sm_profile_select',
        eventTrigger: 'change',
        cancelEventTrigger: true,
        callbacks: [function(event){return s.page.functions.smPageLookUp(event);}, {event: true}]
    });

    s.eLM.setEventListeners(s.page, addContainerID, {
        selector: '.pop_external_link_active',
        cancelEventTrigger: true,
        callbacks: [function(event){return s.page.functions.popLinkField(event);}]
    });
    */
};