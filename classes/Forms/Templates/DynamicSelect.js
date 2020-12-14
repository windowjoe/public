/** Represents a select element and all of the operations to create and manipulate it */
class DynamicSelect
{
    /**
     * Represents a select element and all of the operations to create and manipulate it
     * @constructor
     */
    constructor(options)
    {
        Object.assign(this, options);
    }

    /**
     * Takes an array or an object and creates a string of options for a select box.
     *
     * @param fieldObj An object representing the field to be displayed in a form
     * @param options An object to set certain options for the function
     */
    setSelectOptionsStr(fieldObj, options)
    {
        let s = this;
        let defaults = {optionVals: false, elementFieldName: false};
        let settings = $.extend(defaults, options);

        let elementFieldName = settings.elementFieldName;

        let excludeFieldNames = ['addOnLeft', 'addOnRight'];

            //console.log('IS ARRAY FIRST: ', Array.isArray(fieldObj.optionVals));
        if (typeof fieldObj.tagName !== 'undefined' && (fieldObj.tagName === 'select' || typeof fieldObj.optionVals === 'object' || Array.isArray(fieldObj.optionVals))) {
            var optionTextFields = (typeof fieldObj.optionTextFields === 'undefined') ? false : fieldObj.optionTextFields;
            var optionVals = (settings.optionVals === false) ? fieldObj.optionVals : settings.optionVals;

            try {
                var optStr = '';
                var htmlStr = '';
                var optGroupName = false;

                if (Array.isArray(optionVals) === true) {
                    optionVals.forEach(function (item, index, array) {
                        if (typeof item === 'string') {
                            optStr += s.createOptionStr(item);
                        } else if (typeof item === 'object') {
                            var value = item.value;
                            var htmlStr = item.htmlStr;
                            var selected = item.selected;
                            optStr += s.createOptionStr(value, {htmlStr: htmlStr, selected: selected});
                        }
                    });
                } else if (typeof optionVals === 'object') {
                    $.each(optionVals, function(pk, row) {

                    //if opt_group_name field is present, set up opt group label
                    var tempOptGroupName = (typeof row['opt_group_name'] === 'string') ? row['opt_group_name'] : false;

                    if (tempOptGroupName !== optGroupName) {
                        if (optGroupName !== false) {
                            optStr += '</optgroup>'
                        }

                        optStr += '<optgroup label="' + row['opt_group_name'] + '">';
                        optGroupName = tempOptGroupName;
                    }

                    //check each successive time to see if opt group name has changed, update if it has

                        //if the field options are being set based on db column names, add each specified col val to the option string
                        if (optionTextFields !== false) {
                            $.each(optionTextFields, function(index, fieldName) {
                                htmlStr += (typeof row[fieldName] !== 'undefined') ? row[fieldName] + ' - ' : '';
                            });

                            htmlStr = htmlStr.substr(0, htmlStr.length - 3);
                        //else if this db column has a defined option, just use the pk as the html string
                        } else if (row === true || row.htmlStr === true || typeof row.htmlStr === 'undefined') {
                            htmlStr = pk;
                        //if the html string is defined in the query, it is named htmlStr, use it here
                        } else if (typeof row.htmlStr === 'string'){
                            htmlStr = row.htmlStr;
                        //else use all the data in the row to create the option htmlStr
                        } else {
                            $.each(row, function(fieldName, val) {
                                htmlStr += val + ' - ';
                            });

                            htmlStr.substr(0, htmlStr.length - 3);
                        }

                        var selected = row.selected; //is this the default selected row?

                        var optVal = pk;

                        if (typeof row.pk === 'string') {
                            optVal = row.pk;
                        }

                        optStr += s.createOptionStr(optVal, {htmlStr: htmlStr, selected: selected});
                        htmlStr = '';
                    });

                    //terminate the last option group
                    if (optGroupName !== false) {
                        optStr += '</optgroup>';
                    }

                }

                fieldObj.optionsStr = optStr;
                fieldObj.defaultVal = optStr;
            } catch(e) {
                console.error('setSelectOptionsStr - optionTextFields or optionVals must be set ::', e);
            }
        } else /*if (typeof fieldObj.className === 'undefined')*/ { //youre one level up from input object in fields object
            $.each(fieldObj, function(fieldName, fieldObject) {
                if (fieldObj.tagName === 'select' ||
                   (typeof fieldObject === 'object' && (typeof fieldObject.element === 'object' && typeof fieldObject.element.tagName === 'string') &&
                        (fieldObject.element.optionsStr === false || fieldObject.element.optionsStr === '' || typeof fieldObject.element.optionsStr === 'undefined')
                   )
                ) {
                    s.setSelectOptionsStr(fieldObject.element);
                }
            });
        }
    }

    /**
     * creates an individual option string
     * @param {string} val the value to set the option to
     * @param {string} htmlStr the string to show in the dropdown
     * @param {object} options an object - {selected: if true adds the selected property}
     * @return {string} a string representing the option element
     */
    createOptionStr(val, options)
    {
        var defaults = {selected: false, htmlStr: val.replace('_', ' ')};
        var settings = $.extend(true, defaults, options);

        var selected = settings.selected;
        var htmlStr = settings.htmlStr;

        var optionStr  = '<option ';
            optionStr += 'value="' + val + '" ';

            optionStr += (val === selected || selected === true) ? 'selected="selected" ' : '';

            optionStr += '>' + htmlStr + '</option>';

        return optionStr;
    }


    /**
     * Replace all the options in a select
     *
     * @param selectID The ID of the html select element
     * @param optionStr a string representing all of the options to be placed in the select element
     */
    replaceOptions(selectID, optionsStr)
    {
        let s = this;

        s.emptySelect(selectID);
        getByID(selectID).html(optionsStr);

    }

    emptySelect(select, reset = false)
    {
        select = getByID(select);

        var firstOptionVal = select.find("option:first-child").val();

        if (reset) {
            select.val('');
        } else if (firstOptionVal == '') {
            select.find('option:not(:first)').remove();
        } else {
            select.find('option').remove();
        }
    }

    setSelectValue(selector, value)
    {
        let dl = typeof selector === 'string' ? document.querySelector(selector) : selector;
        let el = 0;

        for (let i = 0; i < dl.options.length; i++) {
          if (dl.options[i].value == value) {
            el = i;
            break;
          }
        }

        dl.selectedIndex = el;
    }

    removeSelectedIndex(selector)
    {
        let select = document.querySelector(selector);

        select.remove(select.selectedIndex);
    }

    updateOptionText(selector, value, index = false)
    {
        let select = document.querySelector(selector);

        index || (index = select.selectedIndex);

        select.options[index].text = value;
    }












    updateSubSelectOptions(page)
    {
        var fields = page.fields;
        var fetchForms = getByID(page.containers.fetch).find('form');
        var addForm = getByID('add_' + page.module.plural);

        setSubSelectOptionStr(fields, fetchForms);
        updateAddSelectOptions(fields, addForm);
    }

    setSubSelectOptionStr(fieldsObj, forms)
    {
        for(var fieldName in fieldsObj) {
            var field = fieldsObj[fieldName];
            //console.log('FIELDNAME: ', fieldName);

            if (typeof field.subSelects === 'object') {
                var optObj = field.subSelects;

                for (var subSelectName in optObj) {
                    var subSelect = optObj[subSelectName];
                    var subSelectTagName = fieldsObj[subSelectName].element.tagName;

                    for (var parentOptVal in subSelect) {
                        var parentOption = subSelect[parentOptVal];
                        var parentOptionVals = parentOption.optionVals;
                        var optionsStr = false;

                        for (var index in parentOptionVals) {

                            //if not set as an object in config, make it one here so other props can be added
                            if (typeof parentOptionVals[index] === 'string') {
                                parentOptionVals[index] = {value: parentOptionVals[index]};
                            }

                            var option = parentOptionVals[index];
                            var optionVal = option.value;

                           // console.log('TAGNAME 2: ', subSelectTagName);
                            setCurrCount(option, forms, fieldName, parentOptVal, subSelectName, optionVal, subSelectTagName);

                            //if ((option.currCount < option.maxCount) || typeof option.maxCount === 'undefined') {
                            if ((option.currCount < option.maxCount) || (option.currCount === 0 && typeof option.maxCount === 'undefined')) {
                                optionsStr = (optionsStr === false) ? '' : optionsStr;
                                optionsStr += s.createOptionStr(optionVal, {htmlStr: option.htmlStr});
                            }
                        }

                        parentOption.optionsStr = optionsStr;
                        //console.log('parentOptVal: ', parentOptVal, ', parentOption: ', parentOption, ', optionsStr: ', optionsStr);
                    }
                }
            }
        }
    }

    setCurrCount(option, forms, fieldName, fieldValue, subSelectName, subSelectValue, subSelectTagName)
    {
        option.currCount = 0;
        //console.log('FIELDNAME: ', fieldName, ', fieldValue: ', fieldValue, ', subSelectName: ', subSelectName, ', subSelectValue: ', subSelectValue, ', currCount: ', option.currCount, ', maxCount: ', option.maxCount);
        var theseForms = forms.has('[name="' + fieldName + '"] option[value="' + fieldValue + '"]:selected').filter(function(index) {
            var propNameVal = $(this).find('[name="' + subSelectName + '"]').val();

            //console.log('subSelectTagName: ', subSelectTagName);
            if (typeof propNameVal !== 'undefined' && propNameVal === subSelectValue && subSelectTagName === 'select') {
                //console.log('subSelectTagName: ', subSelectTagName);
                option.currCount = option.currCount + 1;
                //console.log('propNameVa: ', propNameVal, ', currCount: ', option.currCount);
            }
        });

        //console.log('option: ', option, ', theseForms - fieldName: ', fieldName, ', theseForms: ', theseForms);
    }

    getFirstObject(object)
    {
        var firstObj = new Object({});

        $.each(object, function(index, eachObject) {
            firstObj = eachObject;
            return false;
        });

        return firstObj;
    }

    updateAddSelectOptions(fields, addForm)
    {
        var addFormSelects = $(addForm).find('select');

        $.each(addFormSelects, function(index, select) {
                select = $(select);
            var selectName = select.prop('name');

            var optionVals = fields[selectName].element.optionVals;
            var subSelect = getFirstObject(fields[selectName].subSelects);

            optionVals.forEach(function (optionValue, index, array) {
                optionValue = (typeof optionValue.value !== 'undefined') ? optionValue.value : optionValue;

                var subSelectParentOptVal = subSelect[optionValue];

                if (typeof subSelectParentOptVal !== 'undefined' && subSelectParentOptVal.optionsStr === false) {
                    addForm.find('select[name="' + selectName + '"]').find('option[value="' + optionValue + '"]').remove();
                }
            });
        });

        //console.log('updateFormSelectOptions - forms: ', forms, ', firstFormSelects: ', firstFormSelects);
    }

    setSubSelectOptions(event, subSelect)
    {
        var page = event.data.page;
        var select = event.data.btn;

        var selectName = select.prop('name');
        var selectVal = select.val();

        var subSelectName;

        if (typeof subSelect === 'string') {
            subSelectName = subSelect;

            var form = select.closest('form');
            subSelect = form.find('select[name="' + subSelect + '"]');
        } else {
            subSelectName = subSelect.prop('name');
        }

        var optionsStr = '';

        try {
            optionsStr = page.fields[selectName].subSelects[subSelectName][selectVal].optionsStr;
        } catch(e) {
            console.error('Must define subselect optionVals for parent select option.', e );
        }

        subSelect.find('option:gt(0)').remove();
        subSelect.append(optionsStr);

        //console.log('updating sub select, event: ', event, ', subSelect: ', subSelect);
    }
};