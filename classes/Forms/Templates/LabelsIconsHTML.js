class LabelsIconsHTML
{
    constructor(options)
    {
        Object.assign(this, options);
    }

    createLabelStrings(elStr, fieldName, labelLeft, labelRight) {
        if (labelLeft !== false || labelRight !== false) {
            var labelLeftStr = '';
            var labelRightStr = '';

            if (labelLeft !== false) {
                labelLeftStr = this.createLabelStr(fieldName, labelLeft);
            }

            if (labelRight !== false) {
                labelRightStr = this.createLabelStr(fieldName, labelRight);
            }

            if (labelLeftStr !== '' || labelRightStr !== '') {
                var str;
                str  = labelLeftStr;
                str += elStr;
                str += labelRightStr;
            }

            return str;
        }

        return elStr;
    }

    createLabelStr(fieldName, labelOptions)
    {
        var labelDefaults = {className: 'label label-primary'};
            labelOptions = $.extend(true, labelDefaults, labelOptions);


        var forText = (typeof labelOptions.for === 'string') ? labelOptions.for : false;
        /*var form = (typeof labelOptions.form === 'string') ? labelOptions.form : false;*/
        var htmlStr = (typeof labelOptions.htmlStr === 'string') ? labelOptions.htmlStr : false;
        /*var className = labelOptions.className;*/

        var str  = '<label ';

        if (forText) {
            str += 'for="' + forText + '" ';
        }

        if (fieldName.form) {
            str += 'form="' + fieldName.form + '" ';
        }

        str += '>';

        str += (htmlStr) ? htmlStr : fieldName;

        str += '</label>';

        return str;
    }

    createAddOnStrings(elStr, addOnLeft, addOnRight)
    {
        if (addOnLeft || addOnRight) {
            var addOnLeftStr = '';
            var addOnRightStr = '';

            if (addOnLeft) {
                addOnLeftStr = this.createAddOnStr(addOnLeft);
            }

            if (addOnRight) {
                addOnRightStr = this.createAddOnStr(addOnRight);
            }

            if (addOnLeftStr || addOnRightStr) {
                var str;
                str  = '<div class="input-group input-group-sm">';
                str += addOnLeftStr;
                str += elStr;
                str += addOnRightStr;
                str += '</div>';
            }

            return str;
        }

        return elStr;
    }

    createAddOnStr(addOnOptions)
    {
        var s = this;
        var icon = addOnOptions.icon;
        var htmlStr = addOnOptions.htmlStr;
        var className = (typeof addOnOptions.className !== 'undefined') ? addOnOptions.className : '';
        var title = addOnOptions.title;

        var str;
        str  = '<span class="input-group-addon ' + className + '" ';
        str += (title) ? 'title="' + title + '">' : '>';
        str += s.createFontAwesomeIconStr(icon);
        str += (typeof htmlStr !== 'undefined') ? htmlStr : '';
        str += '</span>';

        return str;
    }

    createFontAwesomeIconStr(icon)
    {
        return (typeof icon !== 'undefined') ? '<i class="fa fa-' + icon + '" aria-hidden="true"> </i> ' : '';
    }

    popLinkField(event)
    {
        let target = $(event.target).closest('div').find('input');
        let link = target.val();

        var win = window.open(link, '_blank');
            win.focus();
    }

    doUserID()
    {
        let target = $(event.target).closest('div').find('input');
        let link = target.val();

        let doUserID = target.attr('data-do-user-id');

        if (doUserID) {
            let form = target.parents('form');
            let cc_lead_id = form.find('[name="cc_lead_id"]');
            let userID = cc_lead_id.val();
            link = link.replace('{{UID}}', userID);
            target.val(link);
        }
    }
};
