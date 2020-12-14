class ResetForms
{
    constructor(options)
    {
        Object.assign(this, options);
    }

    resetForm(page, proc, reset)
    {
        if (!reset.submittedFormID) return false;

        let {submittedFormID: formId, selectID: selectId, fetchFormID: fetchFormId} = reset;
        let isLastSelect = this.resetSelects(formId, selectId);

        this.doReset(proc, formId);
        this.updateDoReset(proc, formId, fetchFormId, isLastSelect);
    }

    doReset(proc, formId)
    {
        if (!(formId = this.dpForms.getDoReset(formId))) return false;

        this.resetFormFields(this.dpForms, formId);
        this.resetObjects(proc, this.objects, formId);
    }

    resetSelects(formId, currSelectId)
    {
        let selects = document.querySelector('#' + formId).getElementsByTagName('select');

        if (!selects.length) return true;

        let lastSelectId = selects[selects.length - 1].id;
        let currSelectFound = currSelectId === 'all' ? true : false;
        let isLastSelect = currSelectId === lastSelectId ? true : false;

        for (let select of selects) {
            if (currSelectFound) this.dS.emptySelect(select, true);

            if (currSelectId === 'all' && select.id === lastSelectId) this.dS.emptySelect(select);

            currSelectFound = select.id === currSelectId ? true : currSelectFound;
        }

        return isLastSelect;
    }

    resetFormFields(forms, formID)
    {
        let elements = document.getElementById(forms.getFormID(formID)).elements;

        for (let element of elements) {
            let fieldType = element.dataset.iseditablelistitem === 'true' ? 'isEditableListItem' : element.type.toLowerCase();

            if (fieldType === 'hidden' && formID.indexOf('add_') !== 0) {
                element.value = '';
            } else if (fieldType !== 'hidden') {
                switch (fieldType) {
                    case 'isEditableListItem':
                        this.emptyEditableLists(element);
                        break;
                    case 'text':
                    case 'password':
                    case 'textarea':
                            element.value = ''
                            break;
                    case 'radio':
                    case 'checkbox':
                        element.checked = false;
                        break;
                    case 'select-one':
                    case 'select-multi':
                        element.selectedIndex = 0;
                        break;
                    default:
                        element.value = '';
                }
            }

        }
    }

    emptyEditableLists(editableLists, containerId = false)
    {
        editableLists = makeArray(editableLists);

        editableLists.forEach((editableList) => {
            editableList = editableList.tagName ? editableList : document.querySelector('#' + containerId + ' div[name="' + editableList + '"]');

            if (editableList) {
                editableList = editableList.dataset.iseditablelist ? editableList : editableList.closest('div[data-iseditablelist="true"]');

                editableList.innerHTML = '';
            }
        });
    }

    resetObjects(proc, objects, formId)
    {
        for (let name in objects) {
            if (name === 'instances' || typeof objects[name].o.reset !== 'function') continue;

            objects[name].o.reset(proc, formId);
        }
    }

    updateDoReset(proc, formId, fetchFormId = false, isLastSelect = false)
    {
        if (proc === 'add') return false;

        if (isLastSelect && proc === 'fetch') {
            this.dpForms.setDoReset(fetchFormId);
        } else if (isLastSelect) {
            this.dpForms.toggleDoReset(fetchFormId || formId);
        } else if (proc !== 'update') {
            this.dpForms.toggleDoReset(formId);
        }
    }
};
