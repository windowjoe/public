var fieldsValidationRules = 
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
        categories_code: {
            validators: {
                callback: {
                    message: 'Please choose a category',
                    callback: function(value, validator, $field) {
                        // Get the selected options
                        var options = validator.getFieldElements('categories_code').val();
                        return (options !== '');
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
                    max: 32,
                    message: 'The field code must be between 2 and 32 letters'
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
                    message: 'A field description is required'
                },
                stringLength: {
                    min:2,
                    max:32,
                    message: 'The field description must be between 2 and 32 characters long'
                },
                regexp: {
                    regexp: /^[a-zA-z][a-zA-Z0-9_ ]+$/,
                    message: 'Name must start with a letter and consist of only digit, letter, and _ chars'
                }
            }
        }
    }
};
