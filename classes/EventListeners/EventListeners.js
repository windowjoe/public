class EventListeners
{
    constructor(options)
    {
        Object.assign(this, options);
    }

    setEventListeners(pageObject, container, options)
    {
        let s = this;

        if (!options) {
            options = container;
            container = pageObject;
            pageObject = s.page;
        }

        container = s.getByID(container);

        let {selector,
             uiHandle,
             eventTrigger,
             cancelEventTrigger,
             callbacks} = Object.assign({selector: false, uiHandle: false, eventTrigger: 'click', cancelEventTrigger: true, callbacks: false}, options);

        callbacks = Array.isArray(callbacks) ? callbacks : [callbacks];
        callbacks = (callbacks[0][0]) ? callbacks : [callbacks];

        s.resetEventTrigger(container, eventTrigger, selector, cancelEventTrigger);

        callbacks.forEach(function(callback) {
            s.setCallback(container, eventTrigger, selector, callback, pageObject, uiHandle);
        });
    }

    getByID(idSelector)
    {
        if (typeof idSelector === 'string') {
            if (idSelector[0] !== '#') {
                idSelector = '#' + idSelector;
            }

            return $(idSelector);
        } else if (typeof idSelector === 'object' && idSelector.id) {
            return $('#' + idSelector.id);
        }

        return idSelector;
    }

    setCallback(container, eventTrigger, selector, callback, pageObject, uiHandle)
    {
        var s = this;
        var eventData = {pageObject: pageObject, btn: undefined, form: undefined, uiHandle: uiHandle};
        var args = (callback[1]) ? Object.values(callback[1]) : undefined;
        var data = {callback: callback[0], args: args, eventData: eventData};

        container.on(eventTrigger, selector, data, s.doCallback);
    }

    doCallback(e, ui)
    {
        let page = e.data.eventData.pageObject.page || e.data.eventData.pageObject;
        let eLM = page.objects[page.classes.eLM.name].o;
        let callback = e.data.callback;
        let args = eLM.getArgs(e);

        e.data = e.data.eventData;

        eLM.setSubmittedForm(e);
        eLM.setSubmitBtn(e, ui);

        callback.apply(null, args);
    }

    getArgs(event)
    {
        if (event.data.args) {
            let firstArg = event.data.args[0];

            if (!firstArg.currentTarget) {
                event.data.args.unshift(event);
            }

            return event.data.args;
        } else {
            return [event];
        }
    }

    setSubmittedForm(event)
    {
        var tagName = event.currentTarget.tagName;
        var closestForm = $(event.currentTarget).closest('FORM');

        if (tagName === 'FORM') {
            event.data.form = event.currentTarget;
        } else if (tagName === 'BUTTON' || tagName === 'SELECT') {
            event.data.form = event.currentTarget.form;
        } else if (closestForm) {
            event.data.form = closestForm;
        } else {
            event.data.form = false;
        }
    }

    setSubmitBtn(event, ui)
    {
        var tagName = event.currentTarget.tagName;

        if (typeof ui !== 'undefined') {
            var temp = ui.item[0];

            event.data.btn = temp.elements[event.data.uiHandle];
        } else if (tagName === 'BUTTON' || tagName === 'SELECT') {
            event.data.btn = event.currentTarget;
        } else if (tagName === 'FORM') {
            event.data.btn = event.currentTarget.elements[event.currentTarget.dataset.crudProc];
        }
    }

    resetEventTrigger(container, eventTrigger, selector, cancelEventTrigger = false)
    {
        if (cancelEventTrigger) {
            container.off(eventTrigger, selector);
        }
    }
}

/* applie to cancelEventTrigger === true block above container.off(eventTrigger);*/ //THE ISSUE WITH THE MODAL POP UP IN FIELD PROPERTIES IS HERE.  SWITCH THESE TWO STATEMENTS TO MAKE THE MODAL WORK.
