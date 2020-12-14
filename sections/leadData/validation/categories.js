var categoriesValidationRules = 
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
        verticals_pk: {
            validators: {
                callback: {
                    message: 'Please choose a vertical',
                    callback: function(value, validator, $field) {
                        // Get the selected options
                        var options = validator.getFieldElements('verticals_pk').val();
                        return (options !== '' &&  options !== null);
                    }
                }
            }
        },
        code: {
            threshold: 2,
            validators: {
                notEmpty: {
                    message: 'A code is required'
                },
                stringLength: {
                    min: 2,
                    max: 6,
                    message: 'The category code must be between 2 and 6 letters'
                },
                regexp: {
                    regexp: /^[a-zA-z][a-zA-Z0-9_]+$/,
                    message: 'Code must start with a letter and consist of only digit, letter, and _ chars'
                }
            }
        },
        description: {
            threshold: 2,
            validators: {
                notEmpty: {
                    message: 'A category description is required'
                },
                stringLength: {
                    min:2,
                    max:32,
                    message: 'The category description must be between 2 and 32 characters long'
                },
                regexp: {
                    regexp: /^[a-zA-z][a-zA-Z0-9_ ]+$/,
                    message: 'Description must start with a letter and consist of only digit, letter, and _ chars'
                }
            }
        }
    }
};
