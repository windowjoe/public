var allowedValuesValidationRules = 
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
        value: {
            validators: {
                notEmpty: {
                    message: 'A value is required'
                },
                stringLength: {
                    min: 1,
                    max: 32,
                    message: 'The value must be between 1 and 32 characters long'
                },
                regexp: {
                    regexp: /^[a-zA-z0-9][_a-zA-z0-9- '+]*$/,
                    message: 'The value must consist of only digit, letter, and _ chars'
                }
            }
        },
        html_str: {
            threshold: 1,
            validators: {
                notEmpty: {
                    message: 'An html string is required'
                },
                stringLength: {
                    min:1,
                    max:32,
                    message: 'The html string must be between 1 and 32 characters long'
                },
                regexp: {
                    regexp: /^[a-zA-z0-9][_a-zA-z0-9- '+]*$/,
                    message: 'The html string must consist of only digit, letter, and _ chars'
                }
            }
        },
        default_value: {
            validators: {
                callback: {
                    message: 'Please choose if this is the default value',
                    callback: function(value, validator, $field) {
                        // Get the selected options
                        var options = validator.getFieldElements('default_value').val();
                        return (options !== '');
                    }
                }
            }
        }
    }
};
