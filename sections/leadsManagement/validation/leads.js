var leadsValidationRules = 
{
    framework: 'bootstrap',
    icon: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
    },
    err: {
        container: 'popover'
    },
    fields: {
        record_id: {
            threshold: 2,
            validators: {
                notEmpty: {
                    message: 'A record id is required'
                },
                stringLength: {
                    min: 5,
                    max: 100,
                    message: 'The id must be at least 5 digits'
                },
                regexp: {
                    regexp: /^[0-9_ ]+$/,
                    message: 'Code must consist of only digits'
                }
            }
        },
        FN: {
            threshold: 2,
            validators: {
                notEmpty: {
                    message: 'First name is required'
                },
                stringLength: {
                    min:2,
                    max:50,
                    message: 'First name must be between 2 and 50 characters'
                }
            }
        },
        LN: {
            threshold: 2,
            validators: {
                notEmpty: {
                    message: 'Last name is required'
                },
                stringLength: {
                    min:2,
                    max:50,
                    message: 'Last name must be between 2 and 50 characters'
                }
            }
        }
    }
};
