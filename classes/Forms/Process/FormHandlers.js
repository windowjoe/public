class FormHandlers
{
    constructor(options)
    {
        Object.assign(this, options);
    }

    init(data)
    {
        let s = this;
        let rows = data.results.rows;

        if (!s.initialized) {
            s.setEventListeners('add');
            s.setFormValidation('add_' + s.module);
            s.setEventListeners('view');
            s.setEventListeners('addSearch');

            s.initialized = true;
        }

        if (rows) {
            s.setEventListeners('update');
            s.setFormValidation(rows);
        }
    }

    setEventListeners(formType)
    {
        let s = this;
        let stdForms = ['add', 'update', 'fetch'];
        let searchForms = ['view', 'addSearch'];

        let formCat = stdForms.includes(formType) ? 'stdForms' : searchForms.includes(formType) ? 'searchForms' : false;

        switch(formCat) {
          case 'stdForms':
            s.setStdFormsEventListeners(formType);
            break;
          case 'searchForms':
            s.setSearchFormsEventListeners(formType);
            break;
          default:
            return false;
        }
    }

    setStdFormsEventListeners(formType)
    {
        let s = this;
        let container = s.containers[formType].attributes.id;
        let form = valClassSelector(s.module + '_form');

        let selectorPopLinkField = '.pop_link_field';
        let selectorDoUserID = '.do_user_id';
        let selectCrudClass = '.select_crud';

       s.eLM.setEventListeners(s.pageObject, container, {
            selector: form,
            eventTrigger: 'success.form.fv',
            callbacks: (event) => {s.sVF.processSuccess(event);}
        });

        s.eLM.setEventListeners(s.pageObject, container, {
            selector: form,
            eventTrigger: 'failure.form.fv',
            callbacks: (event) => {s.sVF.processFailure(event);}
        });

        /**
         * Removes an input from an editablelist when the fa-times-circle
         * icon is clicked
         */
/*        s.eLM.setEventListeners(s.pageObject, container, {
            selector: form + ' .editable_list_span .fa-times-circle',
            eventTrigger: 'click',
            cancelEventTrigger: true,
            callbacks: (event) => {s.inputPillToggle(event);}
        });
*/
        if (s.page.forms.standardForms[formType].saveOnSelectChange) {
            s.eLM.setEventListeners(s.pageObject, container, {
                selector: selectCrudClass,
                eventTrigger: 'change',
                callbacks: (event) => {return s.doDropDownSubmit(event);}
            });
        }

        /*
        s.eLM.setEventListeners(s.pageObject, container, {
            selector: selectorPopLinkField,
            eventTrigger: 'click',
            callbacks: [s.labelsIconsHTML.popLinkField]
        });


        s.eLM.setEventListeners(s.pageObject, container, {
            selector: selectorDoUserID,
            eventTrigger: 'click',
            callbacks: [s.labelsIconsHTML.doUserID]
        });
        */
    }

    setSearchFormsEventListeners(formType)
    {
        /*
        let s = this;
        let container = s.containers[formType].attributes.id;
        let selectResetForm = '.select_reset_form';

        s.eLM.setEventListeners(s.pageObject, container, {
            selector: selectResetForm,
            eventTrigger: 'change',
            callbacks: [function(){return s.sVF.resetForm(event, {page: s.page});}]
        });
        */
    }

    preventDefault(event)
    {
        event.preventDefault();
    }

    setFormValidation(rows)
    {
        let s = this;
        let formIDs = s.gSV.getRowPKIDs(rows, 'jQueryIDString');

        getByID(formIDs).formValidation(s.page.validationRules);
    }

    doDropDownSubmit(event)
    {
        let s = this;
        let btn = event.target;

        s.setProcFromSelect(event);
        s.setFlashStatusVisuals(btn, false);
        s.submitForm(btn);
    }

    setProcFromSelect(event)
    {
        let btn = event.target;
        let val = btn.value;
        let form = btn.closest('FORM');
            form.dataset.crudProc = 'update';
    }

    submitForm(element)
    {
        let s = this;
        element = getByDOMID(element);

        if (element.tagName !== 'FORM') {
            element = s.getClosestForm(element);
        }

        $(element).submit();
    }

    getClosestForm(element)
    {
        element = getByDOMID(element);

        return element.closest('FORM');
    }

    setFlashStatusVisuals(element, trueFalse)
    {
        let s = this;
        element = getByDOMID(element);

        if (element.tagName !== 'FORM') {
            element = s.getClosestForm(element);
        }

        element.dataset.flashStatusVisuals = trueFalse;
    }
};
