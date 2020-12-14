class CreateForms
{
    constructor(options)
    {
        Object.assign(this, {
            containers: options.p.containers,
            module: options.p.module.plural,
            fields: options.p.fields,
            forms: options.p.forms,
            formTemplates: options.p.forms.formTemplates
        }, options);
    }

    createAddForm()
    {
        let s = this, formType = 'add', insertAt = 'append';
        let addFormPK = 'add_' + this.module;
        let row = s.createEmptyDataRow(addFormPK, s.fields.standardForms);
        let formsStr = s.createFormsFromDataRows(formType, this.forms.standardForms[formType].template, row);

        insertElement(this.containers.add.attributes.id, formsStr, {insertAt: insertAt});

        return true;
    }

    createUpdateForms(rows, proc, insertAt = 'append')
    {
        let s = this, formType = 'update';
        let formRows = s.setOrder(s.page.forms.standardForms.update.order, rows);
        let formsStr = s.createFormsFromDataRows(formType, s.forms.standardForms[formType].template, formRows, s.fields.standardForms);

        insertElement(s.containers.fetch.attributes.id, formsStr, {insertAt: insertAt});
    }

    createAddSearchForm(form)
    {
        let s = this;

        let parents = form.parents;

        parents.forEach(function(parent) {
            let searchFormPK = parent + '_search_form';
            let row = s.createEmptyDataRow(searchFormPK, s.fields.addSearch);
            let formStr = s.createFormsFromDataRows('addSearch', form.template, row);

            insertElement(s.containers[parent].attributes.id, formStr, {insertAt: form.insertAt});
        });

        return true;
    }

    createViewSearchForm(form)
    {
        let s = this;

        let parents = form.parents;

        parents.forEach(function(parent) {
            let searchFormPK = parent + '_search_form';
            let row = s.createEmptyDataRow(searchFormPK, s.fields.viewSearch);
            let formStr = s.createFormsFromDataRows('viewSearch', form.template, row);

            insertElement(s.containers[parent].attributes.id, formStr, {insertAt: form.insertAt});
        });

        return true;
    }

    setOrder(order, rows)
    {
        var s = this;

        if (order === 'DESC') {
            rows = Object.keys(rows).map(function(key) {
                return [Number(key), rows[key]];
            });

            return rows.reverse();
        }

        return rows;
    }

    createEmptyDataRow(pk, fields)
    {
        if (typeof pk === 'string' && typeof fields === 'object') {
            var row = {};
                row[pk] = {};

            $.each(fields, function(fieldName, field) {
                row[pk][fieldName] = field.element.value ? field.element.attributes.value : '';
            });

            return row;
        }

        return false;
    }

    createFormsFromDataRows(formType, formTemplate, rows, fields)
    {
        var s = this;
        if (formType === 'add' || formType === 'addSearch' || formType === 'viewSearch') {
            return s.setFormPK(formTemplate, rows, Object.keys(rows)[0]);
        } else if (formType === 'update') {
            return s.setFormFieldValues(rows, formTemplate, fields);
        }

        return false;
    }

    setFormPK(formTemplate, row, pk)
    {
        if (pk) {
            pk = (typeof row.pk === 'string') ? row.pk : pk; //if pk is specified as a field, take it instead of the object pk.

            return formTemplate.replace(/{{pk}}/g, pk);
        }

        return false;
    }

    setFormFieldValues(rows, formTemplate, fields, pk = false)
    {
        var s = this;
        var currHTML = '';
        if (pk) currHTML = s.setFormPK(formTemplate, rows, pk); //if pk is not false, you know this is a result row that is about to be iterated over
        var regEx = new RegExp();

        $.each(rows, function(fieldName, val) {
            if (typeof val === 'string' || val == null) {
                if (val === null) val = '';

                var element = (fields[fieldName]) ? fields[fieldName].element: false;

                if (element && element.tagName === 'select') {
                    var optionsStr = s.setSelectVals(element.defaultVal, val);
                    currHTML = currHTML.replace(new RegExp('{{' + fieldName + '}}'), optionsStr);
                } else if (element && element.tagName === 'div') {
                    if (element.dataAttributes.iseditablelist) {
                        val = s.iP.createEditableList(fieldName, val);
                    }

                    currHTML = currHTML.replace(new RegExp('{{' + fieldName + '}}'), val);
                } else if (element) {
                    currHTML = currHTML.replace(new RegExp('{{' + fieldName + '}}'), val);
                }
            } else if (Array.isArray(val)) {
                currHTML += s.setFormFieldValues(val[1], formTemplate, fields, val[0]);
            } else if (typeof val === 'object' && val !== null) {
                currHTML += s.setFormFieldValues(val, formTemplate, fields, fieldName);
            }
        });

        return currHTML;
    }

    setSelectVals(selectStr, vals)
    {
        //if there are multiple values, make all of them selected
        if (vals !== false) {
            var valsArr = vals.split(',');
                valsArr.map(function(v) {
                    selectStr = selectStr.replace('value="' + v + '"', 'value="' + v + '"' + ' selected="selected"');
                });
        }

        return selectStr;
    }
};
