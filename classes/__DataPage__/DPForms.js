class DPForms
{
    constructor(dataPage)
    {
        Object.assign(this, {
            forms: dataPage.instanceVars.p.forms,
            stdForms: dataPage.instanceVars.p.forms.standardForms,
            containerNames: new Map([['add', ['add']], ['fetch', ['fetch', 'view', 'PK']]])
        }, dataPage.instanceVars);

        dataPage.instanceVars.dpForms = this;
    }

    getForm(entity, object, form = false)
    {
        if (form instanceof HTMLElement) return form;

        if (typeof entity !== 'string') return false;

        if ((form = document.getElementById(entity))) return form;

        if ((object instanceof HTMLElement) && (form = object.getElementById(entity))) return form;

        return false;
    }

    getContainerType(form)
    {
        if (!form) return false;

        let s = this, containerName = false;

        if (typeof form === 'object') {
            if (form.id) {
                form = form.id;
            } else if (form.form && form.form.id) {
                form = form.form.id;
            } else if (form.target && form.target.form) {
                form = form.target.form.id;
            } else if (form.event && form.event.target && form.event.target || form.event.target.form.id) {
                form = form.event.target.form.id;
            }
        }

        if (typeof form !== 'string') return false;

        this.containerNames.forEach((types, container) => {
            types.forEach((type) => {
                if (s.isContainerType(form, type)) containerName = container;
            });
        });

        return containerName === 'update' ? 'fetch' : containerName;
    }

    isContainerType(form, type)
    {
        return form.indexOf(type) === 0 || (type === 'PK' && form.indexOf(type) >= 0) || false;
    }

    getType(entity)
    {
        let  name = this.getContainerType(entity);

        return  name  === 'fetch' ? 'update' : name;
    }

    getSearchType(entity)
    {
        return this.getType(entity) === 'update' ? 'view' : 'addSearch';
    }

    getId(entity)
    {
        if (entity.formId || entity.formID) {
            return entity.formId || entity.formID;
        }

        switch(this.getContainerType(entity)) {
            case 'add':
                return this.getAddFormId();
            case 'fetch':
                return this.getUpdateFormId(entity);
            default:
                return false;
        }
    }

    getAddFormId()
    {
        return 'add_' + this.dP.getModule();
    }

    getUpdateFormId(entity)
    {
        if (this.getEntityType(entity) !== 'object') return entity;

        if (entity.value && entity.value.indexOf('PK')) return entity.value;

        entity.form || (entity = entity.target || entity.results);

        entity  = entity.form || entity.rows;

        return entity.id && entity.id.indexOf('PK') ? entity.id : Object.keys(entity)[0];
    }

    getEntityType(entity)
    {
        return !entity || typeof entity === 'string' ? entity : 'object';
    }

    getDoReset(entity)
    {
        return this.stdForms[this.getFormType(entity)].doReset;
    }

    setDoReset(entity)
    {
        if (!entity) return false;

        let doReset = this.getId(entity);

        doReset = (doReset.indexOf('view_search_form') === 0) ? false : doReset;

        this.stdForms.update.doReset = doReset;
    }

    setAddFormDoReset()
    {
        this.stdForms.add.doReset = 'add_' + this.dP.getModule();
    }

    toggleDoReset(entity)
    {
        let s = this, type = s.getType(entity);

        let doReset = this.getId(entity);

        doReset = (doReset.indexOf('view_search_form') === 0) ? false : doReset;

        s.stdForms[type].doReset = s.stdForms[type].doReset ? false : doReset;
    }






   /*
    *getters/setters
    */
    getDPForm(forms, form = 'update')
    {
        if (!forms) return false;

        if (typeof forms === 'string') return this.stdForms[forms];

        if (!forms.standardForms) return forms[form] || forms;

        return forms.standardForms[form] || false;
    }

    getDPHas(name)
    {
        return this.stdForms[name].has;
    }

    getDPInitialized(name)
    {
        return this.stdForms[name].initialized;
    }

    toggleDPInitialized(name)
    {
        this.stdForms[name].initialized = !this.stdForms[name].initialized;
    }

    getDPInitDoFetch(name)
    {
        return this.stdForms[name].initDoFetch;
    }

    setDPOrder(name, order)
    {
        this.stdForms[name].order = order;
    }

    getDPBtnNames(form, type = 'crud')
    {
        return form.btns.names[type] || false;
    }

    setDPBtnNames(form, btns, type = 'crud')
    {
        form.btns.names[type] = btns;
    }

    addDPBtn(form, btns, type = 'crud')
    {
        if (!form || !btns) return false;

        btns = this.makeArray(btns);
        form = this.getDPForm(form);

        this.setDPBtnNames(form, this.concat(this.getDPBtnNames(form, type), btns), type);
    }

    rmDPBtn(form, rmBtns, type = 'crud', formBtns = false)
    {
        if (!form || !rmBtns) return false;

        form = this.getDPForm(form);
        formBtns = this.getDPBtnNames(form);
        rmBtns = this.makeArray(rmBtns);

        this.setDPBtnNames(form, formBtns.filter(formBtn => !rmBtns.includes(formBtn)));
    }

    getDPBtnsHTML(form)
    {
        return this.getDPForm(form).btns.htmlStr;
    }

    getDPLayout(form)
    {
        return this.forms.layout[this.getDPForm(form).layout] || false;
    }

    setDPClassName(overwrite = false)
    {
        let name = this.dP.getModule() + '_form';

        this.forms.common.className = overwrite ? name : this.forms.common.className + ' ' + name;
    }

    setDPFields()
    {
        let eO = this.dpClasses.getInstance('eO');

        Object.assign(this.p.fields, eO.setAllFormsFields(this.p.fieldsArr, this.p.forms.layout));

        delete this.p.fieldsArr;
    }

   /*Start page initialization functions*/
   /*
    *merges config.js forms object with default forms object
    */
    setDPBtns(userForm = false, form = this.getDPForm(this.stdForms), formType = 'update', btnType = 'crud')
    {
        let btns, userBtns;

        if (!(userForm = this.getDPForm(userForm)) ||
            !(btns = this.getDPBtnNames(form, btnType)) ||
            !(userBtns = this.getDPFormBtnNames(userForm, btnType)))
        return false;

        this.setDPBtnNames(form, this.concat(btns, userBtns), btnType);
    }

   /*
    * sets selects on non-db driven dropdowns
    * db driven dropdowns are handled in runDepends below
    */
    setDPSelects(setSelects)
    {
        if (!setSelects) return false;

        let dS = this.dpClasses.getInstance('dS');

        for (let form in this.p.fields) {
            dS.setSelectOptionsStr(this.p.fields[form]);
        }
    }

    setupDP()
    {
        this.page.validationRules = window[this.page.module.plural + 'ValidationRules'];

        this.initDPBtns();
        this.createDPTemplates();
        this.initForms();
        this.doInits();
    }

    initDPBtns()
    {
        let s = this;

        let crudRefreshLastFetchBtn = this.dpClasses.getInstance('crudRefreshLastFetchBtn');
        let sh = this.dpClasses.getInstance('sH');
        let crudFormBtns = this.dpClasses.getInstance('crudFormBtns');
        let crudMetaBtnsHTML = this.dpClasses.getInstance('crudMetaBtnsHTML');

        crudRefreshLastFetchBtn.initMetaBtns();
        sh.initBtns();
        crudFormBtns.initFormBtns();
        crudMetaBtnsHTML.createInsertMetaBtns(this.pO.dpContainers.getId('metaBtns'), this.objects);
    }

    createDPTemplates()
    {
        let s = this;
        let fT = s.dpClasses.getInstance('formTemplates');

        new Map(Object.entries(this.stdForms)).forEach((form, name) => {
            if (!form.has) return;

            form.template = fT.createFormTemplate(s.p.fields[form.fields], s.forms.common.className, this.getDPBtnsHTML(form), this.getDPLayout(form), name, form);
        });

        return true;
    }

    /*
    * Functions to generate and insert HTML forms
    */
    initForms()
    {
        new Map(Object.entries(this.stdForms)).forEach((form, name) => {
            if (!this.getDoInit(form)) return;

            name === 'update' ? this.initUpdate(form) : this.init(name, form);
        });
    }

    //initUpdate(form = this.stdForms.update)
    initUpdate(event = false)
    {
        if (!this.getDPHas('update') || !this.getDPInitDoFetch('update')) return false;


        if (event) {
            this.dpClasses.getInstance('ajax').runCrud(event);
        } else {
            this.dpClasses.getInstance('ajax').runCrud(this.page);
        }
    }

    init(name, form)
    {
        let cF = this.dpClasses.getInstance('createForms');

        cF[this.getCreateFormsFunc(name)](form);

        this.toggleDPInitialized(name);
    }

    getDoInit(form)
    {
        if (!form.has || form.initialized || form.initDoFetch === false) return false;

        return true;
    }

    getCreateFormsFunc(name)
    {
        return 'create' + this.dpClasses.getInstance('sM').ucWords(name) + 'Form';
    }

    doInits()
    {
        if (this.getDPInitialized('update')) return false;

        this.dpClasses.getInstance('ajax').doInits('init', 'init');
    }

    makeArray(entity)
    {
        return Array.isArray(entity) ? entity : [entity];
    }

    concat(arr1, arr2)
    {
        return arr1.concat(arr2.filter((item) => arr1.indexOf(item) < 0));
    }





    /*
    * Do NOT USE these functions, they are slated to be removed
    */
    getContainer(entity)
    {
        return this.getContainerType(entity);
    }

    getFormType(entity)
    {
        return this.getType(entity);
    }

    getSearchFormType(entity)
    {
        return this.getSearchType(entity);
    }

    getFormID(entity)
    {
        return this.getId(entity);
    }

    getFormId(entity)
    {
        return this.getId(entity);
    }

    setFormButtons(userForm = false, form = this.getDPForm(this.stdForms))
    {
        return this.setDPBtns(userForm = false, form = this.getDPForm(this.stdForms));
    }

    pushFormCrudButton(form, btns, type = 'crud')
    {
        return this.addDPBtn(form, btns, type);
    }

    removeFormCrudButton(form, rmBtns, type = 'crud')
    {
        return this.rmDPBtn(form, rmBtns, type);
    }
};
