class FormTemplates
{
    constructor(options)
    {
        Object.assign(this, options);
    }

    createFormTemplate(fields, formClass, btns, layout, formType, formObj)
    {
        let s = this;
        let formTypeFields = s.getFormTypeFields(fields, formType);

                      this.setFormFieldHTMLTemplates(formTypeFields, formType);
        let htmlStr = s.layouts.createFormFieldsTemplate(formTypeFields, btns, layout, formType);
            htmlStr = s.createFormTemplateStr(htmlStr, formClass, formObj);
            htmlStr = s.layouts.createFormTemplate(htmlStr, layout, formType);


        return htmlStr;
    }

    createFormTemplateStr(htmlStr, className, options)
    {
        let s = this;
        let defaults = {dataAttributes: false};
        let {dataAttributes} = Object.assign(defaults, options);

            dataAttributes = s.createDataAttributesStr(dataAttributes);

        var formStr  = '<form id="{{pk}}" ';
            formStr += 'data-list_order="list_order={{pk}}" ';
            formStr += dataAttributes;
            formStr += 'class="' + className + '" ';
            formStr += '>';
            formStr += '<input type="hidden" name="pk" value="{{pk}}" />';
            formStr += htmlStr;
            formStr += '</form>';

            return formStr;
    }

    createDataAttributesStr(dataAttributes)
    {
        let str = '';

        if (!dataAttributes) return str;

        dataAttributes = new Map(Object.entries(dataAttributes));

        dataAttributes.forEach(function(value, attr) {
            str += 'data-' + attr + '=' + value;
        });

        return str + ' ';
    }

    getFormTypeFields(fields, formType)
    {
        let formTypeFields = {};

            fields = new Map(Object.entries(fields));

        fields.forEach(function(field, fieldName)
        {
            if ((field.forms && field.forms.includes(formType)) || !field.forms) {
                formTypeFields[fieldName] = field;
            }
        });

        return formTypeFields;
    }

    setFormFieldHTMLTemplates(fields, formType)
    {
        var s = this;
        var fieldNames = Object.keys(fields);

        fieldNames.forEach(function(key) {
           fields[key].element.formElStrings[formType] = s.createFormElementStr(fields[key], formType);
        });
    }

    createFormElementStr(field, formType)
    {
        var element = field.element;

        if (element.processed === true &&  typeof element.formElStrings[formType] === 'undefined') {
            return this.userInputs.createUserInput(field, formType);
        }

        return element.formElStrings[formType];
    }
};
