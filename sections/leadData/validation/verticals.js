var verticalsValidationRules = 
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
        code: {
            threshold: 2,
            validators: {
                notEmpty: {
                    message: 'A code is required'
                },
                stringLength: {
                    min: 2,
                    max: 6,
                    message: 'The vertical code must be between 2 and 6 letters'
                },
                regexp: {
                    regexp: /^[a-zA-z][a-zA-Z0-9_ ]+$/,
                    message: 'Code must start with a letter and consist of only digit, letter, and _ chars'
                }
            }
        },
        description: {
            threshold: 2,
            validators: {
                notEmpty: {
                    message: 'A vertical description is required'
                },
                stringLength: {
                    min:2,
                    max:32,
                    message: 'The vertical description must be between 2 and 32 characters long'
                },
                regexp: {
                    regexp: /^[a-zA-z][a-zA-Z0-9_ ]+$/,
                    message: 'Description must start with a letter and consist of only digit, letter, and _ chars'
                }
            }
        }
    }
};
