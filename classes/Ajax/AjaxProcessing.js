class AjaxProcessing
{
    constructor(options)
    {
        Object.assign(this, options);
    }

    init()
    {
        this.dpClasses.setINames(this);
    }

    makeParams(page, options)
    {
        let s = this;

        let {event = false,
            proc = 'fetch',
            insertAt = false,
            firedElement = false,
            submittedFormID = false,
            fetchFormID = false,
            selectID = false,
            doFlashStatusVisuals = true,
            updateDOM = true,
            namesVals = false,
            preProcOptions = {},
            doPagn8 = false,
            params = '',
            fetchNamesVals = '',
            submittedForm = false,
            fetchContainer = page.containers.fetch.attributes.id,
            ajaxOptions = {},
            urlType = false,
            postProcOptions = {}} = options;

        submittedForm = s.getSubmittedForm(firedElement);
        submittedFormID = submittedFormID || submittedForm.id;

        params = 'proc=' + proc + '&insertAt=' + insertAt + '&' + fetchNamesVals;

        let flash = {doFlashStatusVisuals, submittedForm};

        let pre = Object.assign({params, doPagn8, paramOptions: {submittedForm, fetchContainer}},
                    preProcOptions);

        let reset = {submittedFormID, selectID, fetchFormID};

        let ajax =  {url: s.setAjaxURL(proc, urlType, ajaxOptions.url, page.ajaxURLs),
                    ajaxOptions};

        let post = Object.assign({submittedForm, fetchContainer,
                    insertAt}, postProcOptions);

        post.fetchContainer = pre.paramOptions.fetchContainer = getByDOMID(fetchContainer);

        return {proc, namesVals, event, flash, pre, reset, ajax, updateDOM, post};
    }

    runCrud(page, options)
    {
        let s = this;

        [page, options] = s.getPage(page, options);

        let {proc, namesVals, event, flash, pre, reset, ajax, updateDOM, post} = s.makeParams(page, options);

        namesVals = s.preCrudProcessing(proc, namesVals, pre);

        s.flashVisuals.flashStatusVisuals('first', proc, flash);

        if (s.rF.resetForm && proc !== 'delete') {
            s.rF.resetForm(page, proc, reset);
        }

        return s.ajaxProcessing(namesVals, ajax)
        .then((data) => {
            let result = Object.assign({}, data);

            s.postCrudProcessing(updateDOM, page, proc, data, post);
            s.doInits(updateDOM, proc, Object.assign(data, {event}));
            s.flashVisuals.flashStatusVisuals('last', proc, Object.assign(flash, {success: data.success, successMessage: data.successMessage}));

            return result;
        });
    }

    preCrudProcessing(proc, namesVals = '', options = {})
    {
        if (namesVals) return namesVals;

        return options.params +
               this.getPreProcParams(proc, options.paramOptions) +
               this.getPaginatorParams(proc, options.doPagn8);
    }

    ajaxProcessing(namesVals, options)
    {
        let ajax = Object.assign({
            url: '',
            data: namesVals,
            method: 'POST',
            dataType: 'json',
            processData: true,
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            fail: function() {console.debug('ajaxProcessing - ajax failure');},
            statusCode: {404: function(){console.debug('AJAX function error code: 404: page could not be found' );}}
        }, options);

        return new Promise((resolve, reject) => {
            $.ajax(ajax).done((data) => {
                resolve(data);
            });
        });
    }

    postCrudProcessing(updateDOM, page, proc, data, options)
    {
        if (!updateDOM || !data.success) return false;

        let s = this;

        let {module = page.module.plural,
            dataType = 'json',
            insertAt = false,
            submittedForm = false,
            fetchContainer = false,
            renderType = page.containers.renderType.attributes.id,
            rows = data.results.rows,
            setRowsTo = false} = options;

        data.proc = proc;

        s.prepareDOM(proc, fetchContainer, submittedForm);

        insertAt = s.getInsertAt(proc, insertAt, submittedForm);
        renderType = s.getRenderType(updateDOM, renderType);

        s.render(proc, {renderType, insertAt, page, fetchContainer, data});
    }

    prepareDOM(proc, fetchContainer, submittedForm)
    {
        switch (proc) {
            case 'fetch':
            case 'runFunc':
                $(fetchContainer).empty();
                break;
            case 'delete':
                submittedForm.remove();
                break;
        }
    }

    getInsertAt(proc, insertAt, submittedForm)
    {
        switch (proc) {
            case 'add':
                return insertAt || 'prepend';
            case 'fetch':
            case 'runFunc':
                return insertAt || 'append';
            case 'update':
                return insertAt ? {insertType: 'replace', elToReplace: insertAt} : {insertType: 'replace', elToReplace: submittedForm};
            default:
                return false;
        }
    }

    getRenderType(updateDOM, renderType)
    {
        return updateDOM && renderType ? renderType : false;
    }

    render(proc, options)
    {
        let s = this;
        let {renderType, insertAt, page, fetchContainer, data: {results: {rows: rows}}} = options;

        if (!renderType || typeof rows !== 'object') return false;

        switch (renderType) {
            case 'form':
                s.createForms.createUpdateForms(rows, proc, insertAt);
                break;
            case 'table':
                createInsertTable(fetchContainer, page, rows, {proc, insertAt});
                break;
            case 'html':
                fetchContainer.appendChild(data);
                break;
        }
    }

    /*Support Functions for Main Functions Above*/
    getPage(page, options = page)
    {
        return [this.page, options];
    }

    getSubmittedForm(firedElement) {
        firedElement = getByDOMID(firedElement);

        if (!firedElement || firedElement.tagName === 'FORM') return firedElement;

        return firedElement.closest('FORM');
    }

    doInits(updateDOM, proc, data = {results: false, success: true})
    {
        let {classes, objects} = this.page;

        if (!updateDOM || !['init', 'add', 'fetch', 'update'].includes(proc)) return false;

        this.checkData(updateDOM, proc, data);

        for (let name in classes) {
            if (!objects[classes[name].name].o.init) continue;

            objects[classes[name].name].o.init(data);
        }
    }

    checkData(updateDOM, proc, data)
    {
        //if (!data.proc === 'add' || this.page.forms.standardForms.add.dataAttributes.updateDom)  return true;
        if (data.proc !== 'add' || this.page.forms.standardForms.add.dataAttributes.updateDom)  return true;

        data.results = data.results || {};

        data.results.fields = false;
        data.results.rows = false;
    }

    getPreProcParams(proc, options)
    {
        let {submittedForm, fetchContainer} = options;

        switch (this.getPreProcType(proc, submittedForm)) {
            case 'add':
            case 'update':
            case 'delete':
                return this.getFormData(submittedForm);
            case 'fetchForm':
                //return 'parent_form_id=' + submittedForm.id + this.getPaginatorParams(proc);
                return 'parent_form_id=' + submittedForm.id;
            case 'update_order':
                return fetchContainer.sortable("serialize", {attribute: 'data-list_order', expression: '(.+)[=](.+)'});
            default:
                return '';
        }
    }

    getPreProcType(proc, submittedForm = {})
    {
        return proc === 'fetch' && submittedForm.id ? 'fetchForm' : proc;
    }

    getFormData(submittedForm, getDisabled = true)
    {

        let disabledElements = submittedForm.querySelectorAll('input:disabled');

        this.changeElementsAttribute(disabledElements, 'disabled', false, getDisabled);

        let data = new URLSearchParams(new FormData(submittedForm)).toString();

        this.changeElementsAttribute(disabledElements, 'disabled', true, getDisabled);

        return data;
    }

    changeElementsAttribute(elements, attribute, value, changeAttr = true)
    {
        if (!changeAttr) return false;

        elements.forEach(function(element) {
            element[attribute] = value;
        });
    }

    getPaginatorParams(proc, doPagn8)
    {
        if (!['fetch', 'fetchForm'].includes(proc) || !doPagn8) return '';

        let pagn8 = this.objects[this.classes.paginator.name].o;

        return 'pk_start=' + pagn8.pkStart + '&pk_limit=' + pagn8.pkLimit + '&records_order=' + pagn8.recordsOrder  + '&records_order_default=' + pagn8.recordsOrderDefault;
    }

    setAjaxURL(proc, urlType, url, ajaxURLs)
    {
        if (url) return url;

        return ajaxURLs[urlType || proc];
    }
};
