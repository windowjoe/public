var fieldPropertiesPage = new DataPage('fieldProperties', 'field-properties', 'lead-data/field-properties');

fieldPropertiesPage.setup(
    {
        fields: {
            fields_code : {
                container: {
                    className: 'form-group has-feedback'
                },
                element: {
                    editable: true,
                    tagName: 'input',
                    type: 'hidden',
                    className: 'form-control',
                }
            },
            parent: {
                container: { 
                    className: 'form-group has-feedback'
                },
                element: {
                    editable: false,
                    tagName: 'select',
                    className: 'form-control',
                    title: 'Select Parent',
                    firstOption: {
                        value: '',
                        htmlStr: 'Parent'
                    },
                    optionVals: ['container', 'label', 'form', 'form_element', 'label_right', 'tooltip']
                },
                subSelects: {
                    prop_name: {
                        container: {
                            optionVals: [
                                {value: 'class', htmlStr: 'container class'},
                                {value: 'style', htmlStr: 'container style'},
                                {value: 'data', htmlStr: 'container data', maxCount: 5}
                            ]
                        },
                        label: {
                            optionVals: [{value: 'html_str', htmlStr: 'label text'}]
                        },
                        form: {
                            optionVals: ['form_element']
                        },
                        form_element : {
                            optionVals: ['placeholder', 'class', 'style', 'name', 'id', {value: 'data', maxCount:5}]
                        },
                        label_right: {
                            optionVals: [{value: 'html_str', htmlStr: 'label right text'} ]
                        },
                        tooltip: {
                            optionVals: [{value: 'html_str', htmlStr: 'tooltip text'}]
                        }
                    }
                }
            },
            prop_name: {
                container: {
                    className: 'form-group has-feedback'
                },
                element: {
                    editable: false,
                    tagName: 'select',
                    className: 'form-control',
                    firstOption: {
                        value: '',
                        htmlStr: 'Property'
                    },
                    optionVals: [
                        'placeholder',
                        'class',
                        'style',
                        'id',
                        'name',
                        'data',
                        {value: 'html_str', htmlStr: 'text'},
                        'disabled',
                        {value: 'input_type'},
                        {value: 'form_element'}
                    ]
                },
                subSelects: {
                    value: {
                        form_element: {
                            optionVals: ['input', 'select', 'text']
                        },
                        input_type: {
                            optionVals: ['text', 'radio', 'checkbox']
                        },
                        disabled: {
                            optionVals: ['true', 'false']
                        }
                    }
                }
            },
            value: {
                container: {
                    className: 'form-group has-feedback'
                },
                element: {
                    editable: true,
                    tagName: 'input',
                    type: 'text',
                    className: 'form-control',
                }
            }
        }
    }, {setSelects: true});

/*fieldProperties.forms.functions.customizeRows = function()
{
    var forms = $('#' + fieldProperties.containers.fetch + ' form');

    fieldPropertiesPage.updateMaxCounts(forms);
    updateSubSelectOptions(fieldProperties);

    var valueSelectString = '<select name="value" data-crud-proc="update" class="form-control" style="width:226px;"></select>';
    var valueOptionStrings = fieldProperties.fields.prop_name.subSelects.value;
    var formElement;
    var inputType;

    $.each(forms, function() {
        var currentForm = $(this);
        var propNameVal = currentForm.find('select[name="prop_name"]').val();

        if (propNameVal === 'form_element' || propNameVal === 'input_type' || propNameVal === 'disabled') {
            var value = currentForm.find('[name="value"]');
            var valueVal = value.val();

            var newSelect = $(valueSelectString);
            newSelect.append(valueOptionStrings[propNameVal].optionsStr);
            value.replaceWith(newSelect);
            newSelect.val(valueVal);

            if (propNameVal === 'form_element') {
                formElementUpdated = fieldPropertiesPage.updateFormElement(forms, currentForm, valueVal);
                formElement = valueVal;
            }

            if (propNameVal === 'input_type') {
                allowedValuesPage.checkButtons();
                inputType = valueVal;
            }
        }

        setEventListeners(fieldProperties, $(this), {selector: 'select[name="value"]', eventTrigger: 'change', callbacks: [submitForm, {btn: ''}]});
    });

    //do not run if inputType still exists after updating element to select
    if (false === (formElement === 'select' && inputType === 'text')) {
        allowedValuesPage.checkAllowedValues(formElement, inputType);
    } else if (formElement === 'text') {
        allowedValuesPage.checkAllowedValues(formElement, inputType);
    }

    if (true === (formElement === 'select' || inputType === 'radio' || inputType === 'checkbox')) {
        fieldPropertiesPage.removePlaceholderForm(forms);
    }
};*/

fieldPropertiesPage.updateFormElement = function(forms, currentForm, elementTagName)
{
    var inputTypeForm = forms.find('select[name="prop_name"] option[value="input_type"][selected="selected"]').closest('form');
    var inputTypeExists = inputTypeForm.length;
    var fieldsCodeVal = currentForm.find('input[name="fields_code"]').val();

    var namesVals;
    var crudDone = false;
    var inputType = false;
    //var inputType = (inputTypeExists === 1) ? inputTypeForm.find('[name="value"]').val() : inputType;

    if (elementTagName === 'input' && inputTypeExists === 0) {
        inputType = 'text';
        namesVals = 'proc=add&pk=add&fields_code=' + fieldsCodeVal + '&parent=form_element&prop_name=input_type&value=' + inputType;
        crudDone = runCrud(fieldProperties, {proc: 'add', namesVals: namesVals, insertAt: currentForm});
    } else if ((elementTagName === 'select' || elementTagName === 'text') && inputTypeExists === 1) {
        namesVals = 'proc=delete&pk=' + inputTypeForm.prop('id');
        crudDone = runCrud(fieldProperties, {proc: 'delete', namesVals: namesVals, firedElement: inputTypeForm});
    }

    if (crudDone !== false) {
        crudDone.done(function() {
            runCrud(fieldProperties, {proc: 'update_order', doFlashStatusVisuals: false});
        });
    }

    return crudDone;
};

//removes the attribute form for the form element
fieldPropertiesPage.removePlaceholderForm = function(forms)
{
    var placeholderForm = forms.find('option[value="placeholder"][selected="selected"]').closest('form');
    
    if (typeof placeholderForm !== 'undefined') {
        var placeholderFormID = placeholderForm.prop('id');
        var placeholderExists = placeholderForm.length;

        var namesVals = 'proc=delete&pk=' + placeholderFormID;
        return runCrud(fieldProperties, {proc: 'delete', namesVals: namesVals, firedElement: placeholderForm});
    }

    return false;
};

fieldPropertiesPage.updateMaxCounts = function(forms)
{
    var elementType = forms.has('select[name="parent"] option[value="form"]:selected').find('[name="value"]').val();
    var inputType = forms.has('select[name="prop_name"] option[value="input_type"]:selected').find('[name="value"]').val();

    inputType = (typeof inputType === 'undefined') ? false : inputType;

    var placeholderObject = findObjectByProperty(fieldProperties.fields.parent.subSelects.prop_name.form_element.optionVals, 'value', 'placeholder');

    if (elementType === 'text' || inputType === 'text') {
        placeholderObject.maxCount = 1;
    } else if (inputType === false) {
        placeholderObject.maxCount = 0;
    }
};


/*
fieldPropertiesPage.updateFormElement = function(forms, currentForm, valueVal)
{
    var typeForm = forms.find('select[name="prop_name"] option[value="input_type"][selected="selected"]').closest('form');
    var typeExists = typeForm.length;
    var fieldsCodeVal = currentForm.find('input[name="fields_code"]').val();

    var namesVals;
    var type = false;
    var crudDone = false;

    if (valueVal === 'input' && typeExists === 0) {
        namesVals = 'proc=add&pk=add&fields_code=' + fieldsCodeVal + '&parent=form_element&prop_name=input_type&value=text';
        crudDone = runCrud(fieldProperties, {proc: 'add', namesVals: namesVals, insertAt: currentForm});
        type = 'text';
    } else if (valueVal === 'select' && typeExists === 1) {
        namesVals = 'proc=delete&pk=' + typeForm.prop('id');
        runCrud(fieldProperties, {proc: 'delete', namesVals: namesVals, firedElement: typeForm});

        var placeholderForm = forms.find('option[value="placeholder"][selected="selected"]').closest('form');
        var placeholderFormID = placeholderForm.prop('id');
        var placeholderExists = placeholderForm.length;

        namesVals = 'proc=delete&pk=' + placeholderFormID;
        crudDone = runCrud(fieldProperties, {proc: 'delete', namesVals: namesVals, firedElement: placeholderForm});
    }

    if (crudDone !== false) {
        crudDone.done(function() {
            runCrud(fieldProperties, {proc: 'update_order', doFlashStatusVisuals: false});
            allowedValuesPage.checkAllowedValues(valueVal, type);
        });
    }
};*/

/*logDebug.log('fieldProperties obj - ');
logDebug.log(fieldProperties);
*/