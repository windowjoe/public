var fieldPropertiesValidationRules = 
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
        parent: {
            validators: {
                callback: {
                    message: 'Please choose a parent element',
                    callback: function(value, validator, $field) {
                        // Get the selected options
                        var options = validator.getFieldElements('parent').val();
                        return (options !== '');
                    }
                }
            }
        },
        prop_name: {
            validators: {
                callback: {
                    message: 'Please choose a property name',
                    callback: function(value, validator, $field) {
                        // Get the selected options
                        var options = validator.getFieldElements('prop_name').val();
                        return (options !== '');
                    }
                }
            }
        },
        value: {
            threshold: 2,
            validators: {
                notEmpty: {
                    message: 'A property value is required'
                },
                stringLength: {
                    min:2,
                    max:100,
                    message: 'The property value must be between 2 and 100 characters long'
                },
                regexp: {
                    regexp: /^[a-zA-z][a-zA-Z0-9_\-?: ]+$/,
                    message: 'Property value must start with a letter and consist of only digit, letter, and _ chars'
                }
            }  
        }
    }
};


/*START WITH WHITEBOARDING HOW THE FIELD PROPERTIES MODULE IS GOING TO WORK

Field input Defaults

element_type: input
editable: true 


Field Properties Table Columns
field_code      parent          prop_name       values
FN              form            form_el         input | select | button 
FN              form_el         input_type      text
FN              form_el         placeholder     First Name 
FN              form_el         class           form-group
FN              form_el         data            update
FN              form_el         data            the-pk 
FN              form_el         disabled        true
FN              container       class           col-md-1 has-feedback


field_allowed_values
field_code      value           html            default
FN              1               One Windows     0
FN              2               Two Windows     0
FN              3-5             3-5 Windows     1 


if it's a select and it has allowed_values you know to create options
if it's an input and the type is text and it has allowed values you know to create options
if it's an input and the type is radio you know to create radio options

SELECT * FROM fieldProperties WHERE field_code = 'FN';



FN          allowed_values                  One Window          1
FN          allowed_values                  Two Winodws         2                    
FN          default_value   


What are the defaults?
FN          element         element_type    attribute_name      input 
FN          input           type            type                text 
FN          input           editable        editable            true 


Initial Page:
Update Section
Editable: true | false
Element: input || select - with current value selected 


if (element == input)
    Type: text || email || phone || checkbox || radio = with current value selected 
if (element changes to select)
    Remove type drop down
    Set value type drop down to 'delete'
if (element changes to input)
    Show type drop down, require selection
if (element changes to select || type changes to checkbox || radio)
    Show fields for adding allowed_values
    Require at least one
    Allow for more to be added

Add Section
Category: element | allowed_values | container
if (element_type == select)
    Property Type: class_name | data | allowed_values


for add of properties
if (element == input && (type == text || type == email || type == phone etc...))
    allow only addition of
        element class_name
        element data
        container class_name
if ((element == input && (type == radio || checkbox)) || element == select)
    allow addition of 
        element class_name
        element data
        element values
        container class_name 


on update of element type
if (element == input)
    insert select for type to be chosen if type isnt alread set. If already set type will already be showing
    require type to be set if it isnt already  
    if (type == text || type == email || type == phone etc...)
        delete allowed values if present 
else if (element == select)
    remove type property_type
    

if (if element == select || (element == input && (type == checkbox || type == radio))
    require allowed values to be added if not already present



on delete of a property 
if (element == input)
    dont allow delete of type 
if ((element == input && (type == radio || type == checkbox)) || element == select)
    dont allow delete of last allowed value


FN          validation      notEmpty        threshold           2
FN          validation      stringLength    min                 2
FN          validation      stringLength    max                 6            
*/
