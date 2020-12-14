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

        if (typeof form === 'object') form = form.id  || form.form.id;

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
        let s = this, type;

        if (s.getEntityType(entity) !== 'object') return entity;

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
        this.stdForms.update.doReset = this.getId(entity);
    }

    toggleDoReset(entity)
    {
        let s = this, type = s.getType(entity);

        s.stdForms[type].doReset = s.stdForms[type].doReset ? false : s.getId(entity);
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
        return s.stdForms[name].initDoFetch;
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

        this.setDPBtnNames(form, type, this.concat(this.getDPBtnNames(form, type), btns));
    }

    rmDPBtn(form, rmBtns, type = 'crud')
    {
        if (!form || !rmBtns) return false;

        form = this.getDPForm(form);
        formBtns = this.getDPBtnNames(form);
        rmBtns = this.makeArray(rmBtns);

        this.setDPBtns(form, formBtns.filter(formBtn => !rmBtns.includes(formBtn)));
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

        this.stdForms.common.className = overwrite ? name : this.stdForms.common.className + ' ' + name;
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
    }

    initDPBtns()
    {
        this.dpClasses.getInstance('crudRefreshLastFetchBtn').initMetaBtns();
        this.dpClasses.getInstance('sH').initBtns();
        this.dpClasses.getInstance('crudFormBtns').initFormBtns();
        this.dpClasses.getInstance('crudMetaBtnsHTML').createInsertMetaBtns(this.dpContainers.getId('metaBtns'), this.objects);
    }

    createDPTemplates()
    {
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
            if (!form.has) return;

            /*this[this.getInitFunc(name)](form);*/

            this.initForm(name, form);
        });

        this.doInits();
    }

    initForm(name, form)
    {
        if (!this.doInitForm(name)) return false;

        let cF = this.dpClasses.getInstance('createForms');

        this.getInitFunc(name);
    }

    doInitForm(name)
    {
        if (!this.getDPHas(name) ||
            this.getDPInitialized(name) ||
            this.getDPInitDoFetch(name) === false)
        return false;

        return true;
    }

    getInitFunc(name)
    {
        return 'init' + s.dpClasses.getInstance('sM').ucWords(name) + 'Form';
    }

    initAddSearchForm(form)
    {
        if (this.getDPInitialized('addSearch')) return false;

        this.dpClasses.getInstance('createForms').createAddSearchForm(form);

        this.toggleDPInitialized('addSearch');
    }

    initAddForm(form)
    {
        if (!this.getDPHas('add') || this.getDPInitialized('add')) return false;

        s.dpClasses.getInstance('createForms').createAddForm();

        this.toggleDPInitialized('add');
    }

    initViewSearchForm(form)
    {
        if (this.getDPInitialized('viewSearch')) return false;

        this.dpClasses.getInstance('createForms').createViewSearchForm(form);

        this.toggleDPInitialized('viewSearch');
    }

    initUpdateForm(form = this.stdForms.update)
    {
        if (!this.getDPHas('update') || !this.getDPInitDoFetch('update')) return false;

        this.dpClasses.getInstance('ajax').runCrud(this.page);
    }

    doInits()
    {
        if (this.getDPInitialized('update')) return false;

        this.dpClasses.getInstance('ajax').doInits('init', 'init');
    }


    makeArray(entity)
    {
        Array.isArray(entity) || (entity = [entity]);
    }

    concat(arr1, arr2)
    {
        return arr1.concat(arr2.filter((item) => arr1.indexOf(item) < 0));
    }

    setFormOrder(formType, order)
    {
        this.page.forms.standardForms[formType].order = order;
    }

    getContainer(entity)
    {
        return this.getContainerType();
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
        return setDPBtns(userForm = false, form = this.getDPForm(this.stdForms));
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
