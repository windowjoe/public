var allowedValuesPage = new DataPage('allowedValues', 'allowed-values', 'lead-data/allowed-values');

allowedValuesPage.setup(
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
            value : {
                container: {
                    className: 'form-group has-feedback'
                },
                element: {
                    editable: true,
                    tagName: 'input',
                    type: 'text',
                    className: 'form-control',
                }
            },
            html_str: {
                container: { 
                    className: 'form-group has-feedback'
                },
                element: {
                    editable: true,
                    tagName: 'input',
                    type: 'text',
                    className: 'form-control',
                }
            },
            default_value: {
                container: {
                    className: 'form-group has-feedback'
                },
                element: {
                    editable: true,
                    tagName: 'select',
                    dataAttributes: {'crud-proc': 'update'},
                    className: 'form-control',
                    optionVals: [
                        {value: '0', htmlStr: 'no', selected: true},
                        {value: '1', htmlStr: 'yes'}
                    ]
                }
            }
        }
    }, {setSelects: true});

/*allowedValues.forms.functions.customizeRows = function()
{
    allowedValuesPage.checkButtons();
};*/

allowedValuesPage.updateDefaultValues = function(event, options)
{
    var defaults = {form: false, btn: false, defaultValue: 0};
    var settings = $.extend(defaults, options);

    var form = getByID(settings.form);
    var btn = getByID(event.data.btn);
    var defaultValue = settings.defaultValue;

    if (form !== false && form.is('form')) {
        defaultValue = form.find('[name="default_value"]').val();
    } else if (btn !== false)  {
        defaultValue = event.data.btn.val();
    }

    if (defaultValue === '1') {
        $('#' + allowedValues.containers.fetch).find('[name="default_value"]').val('0');
    }
};

allowedValuesPage.checkAllowedValues = function(tagName, inputType)
{
    var fetchContainer = getByID(allowedValues.containers.fetch);
    var formClass = valClassSelector(allowedValues.module.plural + '_form');

    var forms = fetchContainer.find(formClass);
    var formsLength = forms.length;

    var placeholderForm = forms.has('input[value="PLACEHOLDER_VALUE"], input[value="PLACEHOLDER_HTML"]');
    var numPlaceholderForms = placeholderForm.length;

    //console.log('PLACEHOLDERFORM: ', placeholderForm);
    //console.log('NUMPLACEHOLDERFORMS: ', numPlaceholderForms);
    //console.log('BEFORE ADDING PLACEHOLDER: tagName: ', tagName, ', inputType: ', inputType);
    if ((tagName === 'select' || inputType === 'checkbox' || inputType === 'radio') && formsLength === 0) {
        //console.log('ADDING PLACEHOLDER');
        var fieldsCodeVal = $('#add_allowedValues').find('input[name="fields_code"]').val();
        namesVals = 'proc=add&pk=add&fields_code=' + fieldsCodeVal + '&value=PLACEHOLDER_VALUE&html_str=PLACEHOLDER_HTML&default_value=1';
        var addRunCrud = runCrud(allowedValues, {proc: 'add', namesVals: namesVals});
    } else if (((tagName === 'input' && inputType === 'text') || tagName === 'text') && numPlaceholderForms > 0) {
        //console.log('DELETING PLACEHOLDER');
        var pk = placeholderForm.prop('id');
        namesVals = 'proc=delete&pk=' + pk;
        deleteRunCrud = runCrud(allowedValues, {proc: 'delete', namesVals: namesVals, firedElement: placeholderForm});
    }

    allowedValuesPage.checkButtons();
};

allowedValuesPage.checkButtons = function()
{
    var fieldPropertiesFetchContainer = getByID(fieldProperties.containers.fetch);
    var formElementName = fieldPropertiesFetchContainer.find('form').has('select[name="prop_name"] option[value="form_element"]:selected').find('select[name="value"]').val();
    var inputType = false;

    if (formElementName === 'input') {
        inputType = fieldPropertiesFetchContainer.find('form').has('select[name="prop_name"] option[value="input_type"]:selected').find('select[name="value"]').val();
    }

    var allowedValuesFetchContainer = getByID(allowedValues.containers.fetch);
    var AVForms = allowedValuesFetchContainer.find('form');
    var numAVForms = AVForms.length;

    if ((formElementName === 'select' || inputType === 'checkbox' || inputType === 'radio') && numAVForms === 1) {
        removeButtons(AVForms);
    } else if ((formElementName === 'input' && inputType === 'text') || numAVForms > 1) {
        addButtons(AVForms, allowedValues.buttons.delete);
    }

    //console.log('formElementName: ', formElementName, ', numAVForms: ', numAVForms);
};

/*
logDebug.log('allowedValues obj - ');
logDebug.log(allowedValues);
*/
