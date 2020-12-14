class SubmitValidatedForms
{
    constructor(options)
    {
        Object.assign(this, {
            add: this.run,
            fetch: this.run,
            update: this.run
        }, options);
    }

    processSuccess(event, preventDefault = true)
    {
        if (preventDefault) event.preventDefault();

        let s = this;
        let {btn, form} = event.data;
        let proc = btn.dataset.crudProc;

        s.removeInputMasks(form);

        s[proc](proc, form, btn, event);
    }

    run(proc, form, btn, event)
    {
        return this.ajax.runCrud(this.page, {
            proc,
            event,
            updateDOM: this.getDoUpdateDOM(form),
            doFlashStatusVisuals: this.getDoFlashStatusVisuals(form),
            firedElement: btn,
            insertAt: btn.dataset.insertAt
        });
    }

    delete(proc, form, btn, options = {})
    {
        if (proc !== 'delete') return proc;

        let s = this;

        let {page, runCrud, title, message, appendTo, promise} = Object.assign({
                page: s.page,
                runCrud: {proc, firedElement: btn, submittedFormID: form.id},
                title: s.page.dialogs.delete.title || "Delete",
                message: s.getSetDeleteMessage(s.page.dialogs.delete),
                appendTo: getByID(s.page.containers.metaBtns.attributes.id),
                promise: false}, options);

        let opt = {
            title,
            resizable: true,
            modal: true,
            show: 'fade',
            hide: 'fade',
            appendTo,
            buttons: {
                "Delete": () => {
                    $('#dialog-confirm').dialog("close");

                    promise = s.ajax.runCrud(s.page, runCrud);
                },
                Cancel: () => {
                    $('#dialog-confirm').dialog( "close" );
                }
            }
        }

        getByID('#dialog-confirm').dialog(opt);

        return promise;
    }

    /*delete(proc, event = false, options = {})
    {
        if (proc !== 'delete') return proc;

        let s = this;

        let {page, runCrud, title, message, appendTo, promise} = Object.assign({
                page: s.page,
                runCrud: {proc, firedElement: event.target, event},
                title: s.page.dialogs.delete.title || "Delete",
                message: s.getSetDeleteMessage(s.page.dialogs.delete),
                appendTo: getByID(s.page.containers.metaBtns.attributes.id),
                promise: false}, options);

        let opt = {
            title,
            resizable: true,
            modal: true,
            show: 'fade',
            hide: 'fade',
            appendTo,
            buttons: {
                "Delete": () => {
                    $('#dialog-confirm').dialog("close");

                    promise = s.ajax.runCrud(s.page, runCrud);
                },
                Cancel: () => {
                    $('#dialog-confirm').dialog( "close" );
                }
            }
        }

        getByID('#dialog-confirm').dialog(opt);

        return promise;
    }*/

    removeInputMasks(form)
    {
        $(form).find('.mask').unmask();
    }

    getDoFlashStatusVisuals(form)
    {
        if (!form) return true;

        var doFlashStatusVisuals = (typeof form.dataset.flashStatusVisuals === 'undefined') ? true : form.dataset.flashStatusVisuals;
            doFlashStatusVisuals = (doFlashStatusVisuals === 'true') ? true : doFlashStatusVisuals;
            form.dataset.flashStatusVisuals = true;

            return doFlashStatusVisuals;
    }

    getDoUpdateDOM(form)
    {
        if (!form) return true;

        let updateDOM = form.dataset.updatedom === 'false' ? false : true;

        form.dataset.updatedom = String(updateDOM);

        return updateDOM;
    }

    processFailure()
    {

    }

    getSetDeleteMessage(dialog, message = "This cannot be undone")
    {
        if (dialog.message_1 && dialog.message_2) {
            message = dialog.message_1 + ' ' + dialog.message_2;
        }

        return getByID('#dialog-message').html(message);
    }
};
