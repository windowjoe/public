var windowInstallersValidationRules = 
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
        company_name: {
            threshold: 2,
            validators: {
                notEmpty: {
                    message: 'A company name is required'
                },
                stringLength: {
                    min:2,
                    max:140,
                    message: 'The company name must be at least 2 letters long'
                }
            }
        },
        address_1: {
            threshold: 2,
            validators: {
                notEmpty: {
                    message: 'An address is required'
                },
                stringLength: {
                    min:2,
                    max:140,
                    message: 'The address must be at least 2 letters long'
                }
            }
        },
        city: {
            threshold: 2,
            validators: {
                notEmpty: {
                    message: 'A city is required'
                },
                stringLength: {
                    min:2,
                    max:140,
                    message: 'The city must be at least 2 letters long'
                }
            }
        },
        state: {
            threshold: 2,
            validators: {
                notEmpty: {
                    message: 'A state is required'
                },
                stringLength: {
                    min:2,
                    max:140,
                    message: 'The state must be at least 2 letters long'
                }
            }
        },
        zip: {
            threshold: 2,
            validators: {
                notEmpty: {
                    message: 'A zip code is required'
                },
                stringLength: {
                    min:2,
                    max:140,
                    message: 'The zip code must be 5 digits long'
                },
                regexp: {
                    regexp: /^[0-9]+$/,
                    message: 'Must only consist of digits'
                }
            }
        },
    }
};
