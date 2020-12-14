class DataPage
{
	/**
	 * Creates the main object for the page
     *
	 * @moduleName     {string}              name of the module in camelCase format
	 * @htmlPageName   {string}              html page of the module
     *                                       in  html-page format without an extension
	 * @ajaxUrls       {(string|object)}     the ajax urls for CRUD operations. Either in
     *                                       'section/module-name' format, e.g. 'business-listings/window-installers'
     *                                       or in object format e.g. {add: 'business-listings/window-installers',
     *                                       fetch: 'business-listings/window-installers', ... n}
     *
	 */
    constructor(moduleName, htmlPageName, ajaxUrls)
    {
        this.setDefaults(moduleName, htmlPageName, ajaxUrls);
        this.instanceVars = {module: this.getModule(), pageObject: this, pO: this, dP: this, page: this.page, p: this.page, dpAjax: this.dpAjax};

        this.dpClasses = new DPClasses(this);
        this.dpForms = new DPForms(this);

        this.dpForms.setAddFormDoReset('add');
    }

    /**
     * Sets base default variables for the class
     *
     * @moduleName     {string}              name of the module in camelCase format
     * @htmlPageName   {string}              html page of the module
     *                                       in  html-page format without an extension
     * @ajaxUrls       {(string|object)}     the ajax urls for CRUD operations. Either in
     *                                       'section/module-name' format, e.g. 'business-listings/window-installers'
     *                                       or in object format e.g. {add: 'business-listings/window-installers',
     *                                       fetch: 'business-listings/window-installers', ... n}
     */
    setDefaults(moduleName, htmlPageName, ajaxUrls)
    {
        this.setPage();
        this.setModule(moduleName);
        this.setHTMLPageName(htmlPageName);

        this.dpAjax = new DPAjax(this);

        this.dpAjax.setAjaxUrls(this.page.ajaxURLs, ajaxUrls);
        this.page.ajaxUrls = this.page.ajaxURLs;

       // this.setDefaults('windowInstallers', 'window-installers', {add: 'test.php'});
    }

    /**
    *Setup the dataPage object
    *
    *@param {object} obj - the maing page object
    *@param {object} options - options for the function
    */
    setup(obj, options = {})
    {
        if (![this.page.module.plural, this.page.module.htmlPageName].includes(currentPage)) return false;

        let s = this, {setSelects = false} = options;

        s.dpForms.setFormButtons(obj.forms);

        s.dpClasses.setClasses(s.page.module.plural, obj.classes);

        delete obj.classes;

        s.merge(obj);

        s.dpClasses.createInstanceHolders(s.dpClasses.classes, s.dpClasses.objects);

        s.dpClasses.createInstances(s.dpClasses.objects, 'utility');

        s.dpContainers = new DPContainers(s);

        s.dpForms.setDPClassName();

        s.dpContainers.createContainers();

        s.dpClasses.createInstances(s.dpClasses.objects, ['core', 'module', 'page']);

        //rendering has occurred, set form fields as needed
        s.dpForms.setDPFields();
        s.dpForms.setDPSelects(setSelects);
        s.dpForms.setupDP();
    }

    /**
     * Merges the user defined object for the page from the
     * <section>/config/<moduleName.js> file into this object's
     * page object
     *
     * @obj    {Object}  User defined values to be merged with this
     *                   instances page object
     *
     * @return {Object}  This instance's page object
     */
    merge(obj)
    {
        $.extend(true, this.page, obj);

        if (typeof obj.buttons !== 'undefined') {
            this.page.buttons = obj.buttons;
        }

        return this.page;
    }

    /**
     * Sets the module name in both singular and plural formats
     *
     * @plural  {String} The plural version of the module name
     * @options {Object} Function options include the singular version
     *                   of the module name
     */
    setModule(plural, options)
    {
        if(!plural) return false;

        let s = this;
        let {singular} = Object.assign({singular: false}, options);

        s.page.module.plural = plural;
        s.page.module.singular = s.setModuleSingular(plural, singular);
    }

    /**
     * Sets the singular form of the module name. If the singular form
     * is not passed, the function attempts to create it.
     *
     * @plural {String} The module name in plural form
     * @singular {String} The module name in singular form
     */
    setModuleSingular(plural, singular)
    {
        if (singular) return singular;

        let length = plural.length;

        return plural.endsWith('ies') ?  plural.substring(0, length - 3) + 'y' : plural.substring(0, length - 1);
    }

    /**
     * Returns the module name of this module
     *
     * @type {String} Either singular, plural, or htmlPageName
     *
     * @return {String} Returns the name string of the corresponding type
     */
    getModule(type = 'plural')
    {
        return this.page.module[type];
    }

    /**
     * @name {string} html page of the module in page-name format
     *                without extension
     */
    setHTMLPageName(name = false)
    {
        if (!name) name = this.page.module.plural;

        if (!name) return false;

        this.page.module.htmlPageName = name;
    }

    /**
     * Creates the default page object for the user's page.
     * Contains all variables needed for page to function.
     */
    setPage()
    {
        this.page =
        {
            module: {
                singular: '',
                plural: '',
                htmlPageName: ''
            },
            depends: false,
            dependsDone: false,
            ajaxURLs: {
                add: '',
                fetch: '',
                update: '',
                update_order: '',
                delete: '',
                runFunc: ''
            },
            viewQueryParams: {
            },
            objects: {
            },
            dialogs: {
                delete: {
                    title: 'Delete this field',
                    message_1: '<p>The <strong>',
                    message_2: ' field</strong> will be deleted.</p><p>This is a FOR REAL DELETE</p><p>It cannot be undone!</p>'
                }
            },
            containers: [],
            rows: {
                fieldNames: {
                    className: 'headerRow form-inline',
                    id: 'fieldNames'
                },
                common: {
                    className: 'row'
                }
            },
            forms: {
                formTemplates:{},
                /*move container, layout, customizeRows to each form*/
                common: {
                    className: 'form-inline hover_form fields_form_draggable'
                },
                standardForms: {
                    addSearch: {
                        has: false,
                        showHide: false,
                        initialized: false,
                        saveOnSelectChange: false,
                        preProcCallbacks: [],
                        procCallbacks: [],
                        btns: false,
                        layout: false,
                        fields: 'addSearch',
                        insertAt: 'append'
                    },
                    add: {
                        has: true,
                        showHide: true,
                        order: 'ASC',
                        initialized: false,
                        saveOnSelectChange: false,
                        dataAttributes: {updateDom: true},
                        preProcCallbacks: [],
                        procCallbacks: [],
                        layout: 'standardForms',
                        fields: 'standardForms',
                        btns: {
                            names: {showHide: {iName: 'sH'}, crud: ['add']},
                            //names: {showHide: true, crud: ['add']},
                            attributes: {},
                            htmlStr: ''
                        },
                        doReset: false
                    },
                    viewSearch: {
                        has: false,
                        showHide: false,
                        initialized: false,
                        saveOnSelectChange: false,
                        preProcCallbacks: [],
                        procCallbacks: [],
                        btns: false,
                        layout: false,
                        fields: 'viewSearch',
                        insertAt: 'append'
                    },
                    update: {
                        has: true,
                        showHide: true,
                        initDoFetch: true,
                        order: 'ASC',
                        container: 'fetch',
                        saveOnSelectChange: true,
                        dataAttributes: {updateDom: true},
                        preProcCallbacks: [],
                        procCallbacks: [],
                        layout: 'standardForms',
                        fields: 'standardForms',
                        btns: {
                            names: {showHide: {iName: 'sH'}, crud: ['update', 'delete', 'update_order']},
                            attributes: {},
                            htmlStr: ''
                        },
                        doReset: false
                    }
                },
                layout: {
                    standardForms: {}
                }
            },
            fieldsArr: [],
            fields: {},
            functions: {}
        };
    }

    /*
     * DO NOT USE functions below this line, they are candidates for removal
     */
     pushFormCrudButton(form, name)
     {
         return this.dpForms.addDPBtn(form, name);
     }

     removeFormCrudButton(form, name)
     {
         return this.dpForms.rmDPBtn(form, name);
     }
};