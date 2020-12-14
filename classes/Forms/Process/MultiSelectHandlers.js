class MultiSelectHandlers
{
    constructor(options)
    {
        Object.assign(this, options);
    }

    setMultiSelect(fields, module)
    {
        let s = this;

        fields = new Map(Object.entries(fields));

        fields.forEach(function(obj, fieldName) {
            if (obj.element.tagName === 'select' && typeof obj.element.multiSelect === 'object') {
                let elements = document.getElementsByName(obj.element.name);

                let isFirst = true; //the first select of this name should be in the add form

                elements.forEach(function(element) {
                    //remove the onDropdownHidden update form event
                    if (isFirst) {
                        var msObj = JSON.parse(JSON.stringify(obj.element.multiSelect));
                        delete msObj.onDropdownHidden;
                        isFirst = false;
                        $(element).multiselect(msObj);
                    } else {
                        $(element).multiselect(obj.element.multiSelect);
                    }

                });
            }
        });

        $.each(fields, function(fieldName, obj) {
        });
    }

    doDropDownSubmit(event, page)
    {
        let s = this;
        let btn = event.currentTarget;

        s.setProcFromBootStrapMultipleSelect(event);
        s.setFlashStatusVisuals(btn, false);
        s.submitForm(btn);
    }

    setProcFromBootStrapMultipleSelect(event)
    {
        let btn = event.currentTarget;
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