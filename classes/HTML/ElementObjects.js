class ElementObjects
{
    constructor(options)
    {
        Object.assign(this, options);
    }

    setAllFormsFields(fields, layout)
    {
        let s = this;
        let finalFields = {};

        if (!Array.isArray(fields)) {
            //fields contains fields for more than one form
            fields = new Map(Object.entries(fields));

            fields.forEach(function(formFields, formType) {
                let formLayout = layout ? layout[formType] : false;

                finalFields[formType] = s.setFields(formFields, formLayout);
            });

            return finalFields;
        }

        finalFields.standardForms = s.setFields(fields, layout.standardForms);

        return finalFields;
    }

    setFields(fieldsArr, layout)
    {
        var s = this;
        var count = 1;
        var fields = {};

        fieldsArr.forEach(function(field, index) {
            let fieldName;

            if (typeof field === 'string') {
                fieldName = field;
                fields[fieldName] = {};
            } else {
                fieldName = Object.keys(field)[0];

                if (Array.isArray(field[fieldName])) {
                    let attributes = field[fieldName];

                    fields[fieldName] = {};

                    attributes.forEach(function(val) {
                        fields[fieldName][val] = fieldName;
                    });
                } else {
                    fields[fieldName] = field[fieldName];

                }

            }

            s.assignFieldProperties(fieldName, fields[fieldName]);

            fields[fieldName].order = count;
            count ++;

            fields[fieldName].element = s.setElementOptionDefaults(fieldName, fields[fieldName].element);


        });

        s.setFieldsFromFields(fields);

        if (layout) s.setFieldsFromLayout(fields, layout);

        return fields;
    }

    setFieldsFromFields(fields)
    {
        var s = this;

        $.each(fields, function(fieldName, field) {
            fields[fieldName].container = s.setContainerOptions(field.container);
            fields[fieldName].element = s.setElementOptions(fieldName, field.element);
        });
    }

    assignFieldProperties(fieldName, field)
    {
        var s = this;

        field.element = (typeof field.element === 'object') ? field.element : {};
        field.element.attributes = (!field.element.attributes) ? {} : field.element.attributes;

        if (typeof field.addOnLeft !== 'undefined') {
            field.element.addOnLeft = field.addOnLeft;
            delete field.addOnLeft;
        }

        if (typeof field.addOnRight !== 'undefined') {
            field.element.addOnRight = field.addOnRight;
            delete field.addOnRight;
        }

        let placeholder = (field.placeholder) ? field.placeholder : field.element.placeholder;
        field.element.attributes.placeholder = s.getPlaceholderStr(fieldName, placeholder);

        if (field.id) {field.element.attributes.id = field.id; delete field.id;}
    }

    setFieldsFromLayout(fields, layout)
    {
        var s = this;

        if (layout) {
            let rows = layout.rows;

            $.each(rows, function(rowName, rowObj) {
                let cols = rowObj.cols;
                let tabs = rowObj.tabs;

                s.setFieldsFromLayoutCols(cols, fields);
                s.setFieldsFromLayoutTabs(tabs, fields);
            });
        }
    }

    setFieldsFromLayoutCols(cols, fields)
    {
        let s = this;

        if (cols) {
            $.each(cols, function(colName, colObj) {
                let {fieldNames, fieldSettings} = colObj;

                if (fieldSettings) {
                    fieldNames.forEach(function(fieldName) {
                        fields[fieldName].element.addOnLeft = s.setAddOnAttributes(fields[fieldName].element.addOnLeft, fieldSettings.addOnLeft);
                    });
                }
            });
        }
    }

    setFieldsFromLayoutTabs(tabs, fields)
    {
        let s = this;

        if (tabs)
        {
            s.page.forms.layout.hasTabs = true;

            let tabMap = new Map(Object.entries(tabs));

            tabMap.forEach(function(tab, tabName) {
                if (tab.cols) {
                    s.setFieldsFromLayoutCols(tab.cols, fields);
                }
            });
        }
    }

    setContainerOptions(container = {})
    {
        var s = this;
        var defaultAttr = new Map ([
                                    ['tagName', 'div'],
                                    ['className', 'form-group'],
                                    ['attributes', false],
                                    ['dataAttributes', false]
                                ]);

        container = s.setElementAttributes(defaultAttr, container);

        container.attributesStr = s.createAttributesStr(container.attributes);
        container.dataAttributesStr = s.createDataAttributesStr(container.dataAttributes);

        return container;
    }

    setElementOptionDefaults(fieldName, element)
    {
        var s = this;

        var defaultAttr = new Map ([
                                    ['labelLeft', false],
                                    ['addOnLeft', ],
                                    ['editable'],
                                    ['tagName', 'input'],
                                    ['fieldName', fieldName],
                                    ['className', 'form-control input-sm'],
                                    ['attributes', false],
                                    ['dataAttributes', false],
                                    ['optionTextFields', false],
                                    ['optionVals', false],
                                    ['addOnRight', false],
                                    ['labelRight', false],
                                    ['value', false],
                                    ['defaultVal', false],
                                    ['formElStrings', {}]
                                ]);

        switch(element.tagName) {
            case 'select':
                defaultAttr.className += ' select_crud';
                break;
        }

        let defaults = s.setElementAttributes(defaultAttr, element);


        defaults.templateValueSlug = '{{' + fieldName + '}}';
        defaults.name = s.getElementNameStr(fieldName, element.name);

        switch(defaults.tagName) {
            case 'input':
                defaults.type = (typeof element.type === 'undefined') ? 'text' : element.type;
                break;
            case 'button':
                defaults.className += ' btn btn-primary';
                defaults.className  = defaults.className.replace('form-control input-sm ', '');
        }

        return defaults;
    }

    setElementAttributes(defaultAttr, element) {
        var s = this;
        var defaults = {};

        var disabled = (element.editable === false) ? true : false;
        if (disabled) {element.attributes.disabled = disabled; delete element.editable}

        if (element.addClassName) {
            defaultAttr.set('className', defaultAttr.get('className') + ' ' + element.addClassName);
            delete element.addClassName;
        }

        defaultAttr.forEach(function(attr, attrName) {
            defaults[attrName] = (typeof element[attrName] === 'undefined') ? attr : element[attrName];
        });

        defaults.processed = true;

        return defaults;
    }

    setElementOptions(fieldName, element = {})
    {
        var s = this;

        element.addOnLeft = s.setAddOnAttributes(element.addOnLeft, {'htmlStr': element.attributes.placeholder});

        var style = (typeof element.style === 'undefined') ? false : element.style;
        if (style) {element.attributes.style = style;}

        element.attributesStr = s.createAttributesStr(element.attributes);
        element.dataAttributesStr = s.createDataAttributesStr(element.dataAttributes);

        return element;

    }

    getElementNameStr(fieldName, elementName)
    {
        return (typeof elementName === 'string') ? elementName : fieldName;
    }

    getPlaceholderStr(fieldName, placeholderStr)
    {
        var str = (placeholderStr) ? placeholderStr : fieldName;

        return this.sM.ucWords(str.replace(/_/g, ' '));
    }

    setAddOnAttributes(element, defaultAttr)
    {
/*        if (addOnObj) {
            var addOn = $.extend(true, addOnObj, options);

            return addOn;
        }

        return false;*/


        if (element !== false) {
            element = (typeof element === 'object') ? element : {};

            let defaults = new Map([['htmlStr', ''], ['className', ''], ['icon', '']]);
            let obj = {};

            defaults.forEach(function(attr, attrName) {
                obj[attrName] = (typeof element[attrName] === 'undefined') ? defaultAttr[attrName] : element[attrName];
            });

            return obj;
        }

        return false;
    }

    createDataAttributesStr(dataAttributes, options)
    {
        if (!dataAttributes) return false;

        var defaults = {lazyLoad: false, src: false};
        var settings = $.extend(true, defaults, options);

        var lazyLoad = settings.lazyLoad;
        var src = (settings.src !== false) ? settings.src : false;

        var dataAttributesStr = '';

        for(var attr in dataAttributes) {
            dataAttributesStr += 'data-' + attr + '="' + dataAttributes[attr] + '" ';
        }

        if (lazyLoad !== false && src !== false) {
            dataAttributesStr += 'data-original="' + src + '" ';
        }

        return dataAttributesStr;
    }

    createAttributesStr(attributes)
    {
        if (!attributes) return false;

        var attributesStr = '';

        if (typeof attributes !== 'undefined') {
            if (Array.isArray(attributes)) {
                attributes.forEach(function(attr) {
                    attributesStr += attr + ' ';
                });
            } else if (this.sM.valIsObject(attributes)) {
                $.each(attributes, function(attr, val) {
                    if (attr === 'className') attr = 'class';

                    attributesStr += attr + '="' + val + '" ';
                });
            }
        }

        return attributesStr;
    }
};
