var minLeadPricesPage = new DataPage('minLeadPrices', 'min-lead-prices', 'leads-management/min-lead-prices');

minLeadPricesPage.setup(
{
    forms: {
        layout: {
            standardForms: {
                rows: {
                    0: {
                        btns: true,
                        cols: {
                                0: {
                                    fieldNames: ['scope'], 
                                    colspan: 2, 
                                    fieldSettings: {addOnLeft: {className: 'addOn45Percent'}}
                                },
                                1: {
                                    fieldNames: ['num_windows'],
                                    colspan: 2,
                                    fieldSettings: {addOnLeft: {className: 'addOn45Percent'}}
                                },
                                2: {
                                    fieldNames: ['min_lead_price'],
                                    colspan: 2,
                                    fieldSettings: {addOnLeft: {className: 'addOn45Percent'}}
                                }
                            }
                    }
                }
            }
        }
    },
    fieldsArr: [
        {scope: {
            element: {
                tagName: 'select',
                optionVals: ['Repair', 'Install'],
                multiSelect: {buttonWidth: '200px'}
            }
        }},
        {num_windows: {
            element: {
                tagName: 'select',
                placeholder: '# of Windows',
                optionVals: ['1', '2', '3-5', '6-9', '10+'],
                multiSelect: {buttonWidth: '150px'}
            }
        }},
        {min_lead_price: {
            element: {
                tagName: 'select',
                optionVals: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40'],
                multiSelect: {buttonWidth: '150px'}
            }
        }}
    ]
}, {setSelects: true});

/*logDebug.log('minLeadPrices obj - ');
logDebug.log(minLeadPrices);*/
