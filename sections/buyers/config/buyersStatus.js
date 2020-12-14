var buyersStatusPage = new DataPage('buyersStatus', 'buyers-status', 'buyers/buyers-status');

buyersStatusPage.setup(
    {
        forms: {
            layout: {
                standardForms: {
                    rows: {
                        0: {
                            btns: true,
                            cols: {
                                    0: {
                                        fieldNames: ['name'], 
                                        colspan: 2, 
                                        fieldSettings: {addOnLeft: {className: 'addOn45Percent'}}
                                    },
                                    1: {
                                        fieldNames: ['code'],
                                        fieldSettings: {addOnLeft: {className: 'addOn45Percent'}}
                                    },
                                    2: {
                                        fieldNames: ['ping'],
                                        fieldSettings: {addOnLeft: {className: 'addOn45Percent'}}
                                    },
                                    3: {
                                        fieldNames: ['post'],
                                        fieldSettings: {addOnLeft: {className: 'addOn45Percent'}}
                                    },
                                    4: {
                                        fieldNames: ['min_lead_price'],
                                        fieldSettings: {addOnLeft: {className: 'addOn45Percent'}}
                                    },
                                    5: {
                                        fieldNames: ['active'],
                                        fieldSettings: {addOnLeft: {className: 'addOn45Percent'}}
                                    }
                                }
                        }
                    }
                }
            }
        },
        fieldsArr: ['name', 'code',
            {ping: {
                element: {
                    tagName: 'select',
                    optionVals: [{htmlStr: 'Yes', value: '1'}, {htmlStr: 'No', value: '0'}],
                    multiSelect: {buttonWidth: '75px', nonSelectedText: 'Ping'}
                }
            }},
            {post: {
                element: {
                    tagName: 'select',
                    optionVals: [{htmlStr: 'Yes', value: '1'}, {htmlStr: 'No', value: '0'}],
                    multiSelect: {buttonWidth: '75px'}
                }
            }},
            {min_lead_price: {
                element: {
                    tagName: 'select',
                    optionVals: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40'],
                    multiSelect: {buttonWidth: '75px'},
                    addOnLeft: {htmlStr: 'Min $'}
                }
            }},
            {active: {
                element: {
                    tagName: 'select',
                    optionVals: [{htmlStr: 'Yes', value: '1'}, {htmlStr: 'No', value: '0'}],
                    multiSelect: {buttonWidth: '75px'}
                }
            }}
        ]
}, {setSelects: true});

/*logDebug.log('buyersStatus obj - ');
logDebug.log(buyersStatus);*/
