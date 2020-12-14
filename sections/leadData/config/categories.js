let categoriesPage = new DataPage('categories', 'categories.html', 'lead-data/categories');
let verticals = verticalsPage;

categoriesPage.page.fieldsArr = [
    {
        verticals_pk : {
            element: {
                tagName: 'select',
                optionTextFields: ['code', 'description'],
                multiSelect: {
                    nonSelectedText: 'Check an option!'
                },
                addOnLeft: {htmlStr: 'Vertical'}
            }
        }
    },
    'code',
    'description'
];

categoriesPage.setup(
{
    forms: {
        layout: {
            standardForms: {
                rows: {
                    0: {
                        btns: true,
                        cols: {
                                0: {
                                    fieldNames: ['verticals_pk'], 
                                    colspan: 2, 
                                    fieldSettings: {addOnLeft: {className: 'addOn45Percent'}}
                                },
                                1: {
                                    fieldNames: ['code'],
                                    colspan: 2,
                                    fieldSettings: {addOnLeft: {className: 'addOn45Percent'}}
                                },
                                2: {
                                    fieldNames: ['description'],
                                    colspan: 2,
                                    fieldSettings: {addOnLeft: {className: 'addOn45Percent'}}
                                }
                            }
                    }
                }
            }
        }
    },
    depends: {
        verticals: {
            page: verticalsPage.page,
            runCrudOptions:  {
                updateDOM: false,
                doFlashStatusVisuals: false,
                fieldObjName: 'verticals_pk',
                setRowsTo: {
                            funcName: 'setSelectOptionsStr', 
                            params: {
                                fieldObj: {}
                            },
                    rowsAlias: 'optionVals'
                }
            }
        }
    }
});

/*logDebug.log('categories obj - ');
logDebug.log(categories);*/
/*verticals_pk : {
            element: {
                tagName: 'select',
                dataAttributes: {'crud-proc': 'update'},
                attributes: {size: 2},
                className: 'form-control input-sm crud_btn',
                optionTextFields: ['code', 'description'],
                multiSelect: {
                    buttonWidth: 225,
                    nonSelectedText: 'Select Vertical',
                    doOnChange: true
                }
            }
        }*/