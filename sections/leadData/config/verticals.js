var verticalsPage = new DataPage('verticals', 'verticals', 'lead-data/verticals');

verticalsPage.setup(
{
    forms: {
        layout: {
            standardForms: {
                rows: {
                    1: {
                        btns: true,
                        cols: {
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
    fieldsArr: [{code: {element:{editable:true}}}, 
                'description']
});

//console.log('Verticals', verticalsPage);
