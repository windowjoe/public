var fieldsPage = new DataPage('fields', 'fields', 'lead-data/fields');

fieldsPage.setup(
    {
        fields: {
            categories_code : {
                container: {
                    className: 'form-group has-feedback'
                },
                element: {
                    editable: true,
                    name: 'categories_code',
                    tagName: 'select',
                    dataAttributes: {'crud-proc': 'update'},
                    className: 'form-control crud_btn',
                    title: 'Select category',
                    optionTextFields: ['verticals_code', 'description'],
                    multiSelect: {
                        buttonWidth: 250
                    }
                }
            },
            code: {
                container: { 
                    className: 'form-group has-feedback'
                },
                element: {
                    editable: true,
                    tagName: 'input',
                    type: 'text',
                    className: 'form-control'

                }
            },
            description: {
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
        },
        buttons: {
            field_properties: {
                input: {
                    editable: true,
                    type: 'button',
                    dataAttributes: {'crud-proc': 'fetch'},
                    className: 'btn btn-default',
                    glyphicon: 'edit',
                    title: 'Update Field Properties'
                },
            }
        }
    });


/*fields.functions.doFetch = function(event)
{
    var categoriesCrudResult = runCrud(categories, {
    doFlashStatusVisuals: false,
    updateDOM: false,
    setRowsTo: {funcName: setSelectOptionsStr, params: {fieldObj: fields.fields.categories_code.element}, rowsAlias: 'optionVals'}
    });

    categoriesCrudResult.done(function() {
        fieldsCrudResult = runCrud(fields);

        fieldsCrudResult.done(function() {
            setEventListeners(fields, fields.containers.fetch, {selector: '[name="categories_code"]', eventTrigger: 'change', callbacks: [submitForm, {btn: ''}]});
            setEventListeners(fieldProperties, fields.containers.fetch, {
                selector: '[name="field_properties"]',
                callbacks: [fieldsPage.editFieldProperties, {event: true, btn: ''}]
            });
        });
    });
}
*/
fieldsPage.editFieldProperties = function(event)
{
    var mainModal = $('#main_modal');
    var btn = event.data.btn;
    var form = btn.closest('.fields_form');
    var fieldPK = form.find('[name="pk"]').val();
    var fieldDescription = form.find('[name="description"]').val();
    var ogFlashContainer = 'flash_container';
    var modalFlashContainer = 'main_modal_header';

    switchFlashContainer(ogFlashContainer, modalFlashContainer);
    $('#main_modal_title').html('Properties for ' + fieldPK + ' Field - ' + fieldDescription);
    $('#main_modal_body').append('<div id="fieldProperties_container"></div><div id="allowedValues_container"></div>');

    var processSuccessResult;
    htmlAJAXFieldProperties = loadModalHTML(fieldProperties, 'fieldProperties_container', 'field-properties.html');
    htmlAJAXAllowableValues = loadModalHTML(allowedValues, 'allowedValues_container', 'allowable-values.html');

    htmlAJAXFieldProperties.done(function() {
        setEventListeners(fieldProperties, 'add_fieldProperties', {
            eventTrigger: 'change',
            selector: '[name="parent"]',
            callbacks: [setSubSelectOptions, {event: true, subSelect: 'prop_name'}]
        });

        $('#add_fieldProperties [name="fields_code"]').val(fieldPK);
        processSuccessResult = processSuccess(event); //CHANGE TO RUN CRUD????

        htmlAJAXAllowableValues.done(function() {
            processSuccessResult.done(function() {
                setEventListeners(allowedValues, allowedValues.containers.fetch, {
                    selector: 'select[name="default_value"]',
                    eventTrigger: 'change', 
                    callbacks: [[submitForm, {btn: ''}], [allowedValuesPage.updateDefaultValues, {event: true}]]
                });

                var avAddForm = $('#add_allowedValues');

                setEventListeners(allowedValues, avAddForm, {
                    selector: '[name="value"]',
                    eventTrigger: 'blur', 
                    callbacks: [duplicateFieldValues, {btn: '', fieldToCopyTo: avAddForm.find('[name="html_str"]')}]
                });


                setEventListeners(allowedValues, avAddForm, {
                    eventTrigger: 'success.form.fv',
                    cancelEventTrigger: false,
                    callbacks: [allowedValuesPage.updateDefaultValues, {event: true, options: {form: avAddForm}}]
                });

                avAddForm.find('[name="fields_code"]').val(fieldPK);
                runCrud(allowedValues, {proc: 'fetch', firedElement: btn});
            });
        });

        mainModal.modal();  //placed for best transition
    });

    mainModal.one('hidden.bs.modal', function() {
        switchFlashContainer(modalFlashContainer, ogFlashContainer);
        resetModal(mainModal);
    });
};

/*logDebug.log('fields obj - ');
logDebug.log(fields);
*/
