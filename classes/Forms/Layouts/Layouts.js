class Layouts
{
    constructor(options)
    {
        Object.assign(this, options);
    }

    createFormFieldsTemplate(fields, btns, layout, formType)
    {
        if (layout)
            return this.createFormFieldsTemplateWithLayout(fields, btns, layout, formType);

        return this.createFormFieldsTemplateDefault(fields, btns, formType);
    }

    createFormFieldsTemplateWithLayout(fields, btns, layout, formType)
    {
        let s = this;
        let f = {formHTML: '', btns: btns, rows: layout.rows, formType: formType};
        let c = {currColIdentifier: undefined, currColHTML: '', colspan: false, className: ''};
        let r = {currRowIdentifier: undefined, currRowName: '', currRowHTML: '', currRowAttr: ''};

        let rows = new Map(Object.entries(layout.rows));

        rows.forEach(function(row, rowName) {
            s.setUpNewRow(rowName, r, c, f);
            s.bootStrapTabs.createTabLayout(row.tabs, fields, r, c, f);
            s.createColLayout(row.cols, fields, r, c, f, btns);
        });

        f.formHTML += s.getEndOfRowHTML(r.currRowHTML, c.currColHTML, r.currRowAttr, btns);

        return f.formHTML;
    }

    createColLayout(cols, fields, r, c, f, btns)
    {
        if (!cols) return false;

        let s = this;

        cols = new Map(Object.entries(cols));

        cols.forEach(function(col, colName) {
            c.colspan = col.colspan;
            c.className = col.className;

            s.setUpNewCol(colName, r, c);

            col.fieldNames.forEach(function(fieldName){
                if (fields[fieldName]) {
                    c.currColHTML += fields[fieldName].element.formElStrings[f.formType];
                }
            });

            if (col.btns && btns) {
                c.currColHTML += btns;
            }
        });
    }

    getFieldsArr(fields)
    {
        var fieldsArr = [], index = 0;

        for (let field in fields) {
            fieldsArr[index] = fields[field];
            index++;
        }

        return fieldsArr;
    }

    setUpNewRow(rowIdentifier, r, c, f)
    {
        var s = this;

        if (r.currRowIdentifier !== rowIdentifier) {
            f.formHTML += s.getEndOfRowHTML(r.currRowHTML, c.currColHTML, r.currRowAttr, f.btns);
            c.currColHTML = '';
            c.currColIdentifier = undefined;
            r.currRowIdentifier = rowIdentifier;
            r.currRowName = s.getRowName(r.currRowIdentifier);
            r.currRowAttr = f.rows[r.currRowIdentifier];
            r.currRowHTML  = s.getBegOfRowHTML(r.currRowName, r.currRowAttr, f.formType);
            r.currRowHTML += s.getRowHeader(r.currRowAttr);

            return true;
        }

        return false;
    }

    getRowName(rowIdentifier)
    {
        let s = this;
        let parsed = parseInt(rowIdentifier);

        rowIdentifier = (parsed == rowIdentifier && Number.isInteger(parsed)) ? s.addLeadingZeroToDigit(rowIdentifier) : rowIdentifier;

        return 'row-' + rowIdentifier;
    }

    getBegOfRowHTML(rowName, row, formType)
    {
        var s = this;

        var className = (row) ? row.className : false;
        var rowClassName = s.getRowClassName(rowName, className, formType);

        return '<div class="' + rowClassName + '" name="' + rowName + '">';
    }

    getRowClassName(rowName, rowClass = '', formType)
    {
        var rowClassName = '';
        var defaultClassName = 'row ' + rowName;

        if (typeof rowClass === 'string') {
            rowClassName = rowClass + ' ' + defaultClassName;
        } else if (typeof rowClass === 'object') {
            rowClassName = rowClass[formType] || rowClassName;
            rowClassName += ' ' + defaultClassName;
        } else {
            rowClassName = defaultClassName;
        }

        return rowClassName.trim();
    }

    getRowHeader(row = {rowHeader: ''})
    {
        let rowType = typeof row.rowHeader;

        if (rowType === 'string' || (row.rowHeader && row.rowHeader.htmlStr)) {
            let str = rowType === 'string' ? row.rowHeader : row.rowHeader.htmlStr;
            let x = this.createHTMLElements.createHTMLElement({className: 'col-xs-12', tagName: 'div'}, this.createHTMLElements.createHTMLElement({tagName: 'h4'}, str));

            return x;
        }

        return '';
    }

    getEndOfRowHTML(currRowHTML, currColHTML, currRow, btns)
    {
        if (currRowHTML) {
            var html = currRowHTML + currColHTML;

            if (currColHTML) html += '</div>';

            if (currRow && currRow.btns && btns) html += btns;

            html += '</div>';

            return html;
        }

        return '';
    }




    setUpNewCol(colIdentifier, r, c)
    {
        var s = this;

        if (c.currColIdentifier !== colIdentifier) {
            r.currRowHTML += s.getEndOfColHTML(c.currColHTML);
            c.currColIdentifier = colIdentifier;

            let currColName = s.getColName(r.currRowName, c.currColIdentifier);
            //let currColAttr = s.getColAttributes(r.currRowAttr);
            c.currColHTML = s.getBegOfColHTML(currColName, c);

            return true;
        }

        return false;
    }

    getColName(rowName, colIdentifier)
    {
        let s = this;
        let parsed = parseInt(colIdentifier);

        colIdentifier = (parsed == colIdentifier && Number.isInteger(parsed)) ? s.addLeadingZeroToDigit(colIdentifier) : colIdentifier;

        return rowName + '-' + 'col-' + colIdentifier;
    }

    getColAttributes(rowAttributes, colIdentifier)
    {
        if (rowAttributes && rowAttributes.cols && rowAttributes.cols[colIdentifier]) {
            return rowAttributes.cols[colIdentifier];
        }

        return false;
    }

    getBegOfColHTML(colName, cols = {})
    {
        let className = (cols.className) ? ' ' + cols.className : '';
        let colspan = (cols.colspan) ? cols.colspan : 1;

        let html = '<div ';
            html += 'class="col-xs-' + colspan + className + '" name="' + colName + '"';
            html += '>';

            return html;
    }

    getEndOfColHTML(currColHTML)
    {
        if (currColHTML) {
            return currColHTML + '</div>';
        }

        return '';
    }

    createFormFieldsTemplateDefault(fields, btns, formType)
    {
        var formHTML = '';

        $.each(fields, function(fieldName, props) {
            formHTML += props.element.formElStrings[formType];
        });

        if (btns) {
            formHTML += btns;
        }

        return formHTML;
    }

    createFormTemplate(template, layout, formType)
    {
        if (!layout) return template;

        var formWrapper = (layout.formWrapper) ? layout.formWrapper : {};

        return '<div class="' + this.getFormWrapperClass(formWrapper, formType) + '">' + template + '</div>';
    }

    getFormWrapperClass(formWrapper, formType, options)
    {
        var defaults = {ccFormWrapperClass: 'cc_form_wrapper'};
        var settings = $.extend(defaults, options);
        var {ccFormWrapperClass} = settings;

        if (formWrapper[formType] && formWrapper[formType].className) {
            return ccFormWrapperClass + ' ' + formWrapper[formType].className;
        } else if (formWrapper.className) {
            return ccFormWrapperClass + ' ' + formWrapper.className;
        }

        return ccFormWrapperClass;
    }

    addLeadingZeroToDigit(num)
    {
        return (String(num).length == 1) ? '0' + String(num) : num;
    }
};
