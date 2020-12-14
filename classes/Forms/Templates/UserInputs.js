class UserInputs
{
    constructor(options)
    {
        Object.assign(this, options);
    }

    createUserInput(field, formType) {
        var s = this;

        var {tagName,
            name,
            className,
            dataAttributesStr,
            attributesStr,
            templateValueSlug,
            defaultVal} = field.element;

        var html  = '<' + tagName + ' ';
            html += 'name="' + name + '" ';
            html += 'class="' + className + '" ';

            if (dataAttributesStr) html += dataAttributesStr;
            if (attributesStr) html += attributesStr;

        var val = this.getValStr(templateValueSlug, formType, defaultVal);

        var funcName = 'create' + s.sM.ucWords(tagName) + 'Str';

        if (typeof this[funcName] === 'function') {
            html = this[funcName](field, html, val, defaultVal);
        } else {
            html += '>' + val + '</' + tagName + '>';
            html = s.createLabelsIcons(html, field.element);
            html = s.createHTMLElements.createHTMLElement(field.container, html);
        }

        return html;
    }

    createButtonStr(field, html, templateValueSlug, defaultVal)
    {
        html += 'type="button">' + defaultVal + '</button>';

        return html;
    }

    createInputStr(field, html, val)
    {
        var s = this;
        var {type} = field.element;

            html += 'type="' + type + '" ';
            html += 'value="' + val + '" ';
            html += ' />';

        if (type !== 'hidden') {
            html = s.createLabelsIcons(html, field.element);
            html = s.createHTMLElements.createHTMLElement(field.container, html);
        }

        return html;
    }

    getValStr(templateValueSlug, formType, addFormValue = '')
    {
        addFormValue = addFormValue === false ? '' : addFormValue;

        return (formType === 'add' || formType === 'addSearch' || formType === 'viewSearch') ? addFormValue : templateValueSlug;
    }

    createLabelsIcons(html, element)
    {
        var {fieldName,
             labelLeft,
             addOnLeft,
             addOnRight,
             labelRight} = element;

        html = this.labelsIconsHTML.createAddOnStrings(html, addOnLeft, addOnRight);
        html = this.labelsIconsHTML.createLabelStrings(html, fieldName, labelLeft, labelRight);

        return html;
    }

/*    function createImg(fieldName, src, imgOptions)
    {
        var imgDefaults = {lazyLoad: true, style: false, imgFolder: ''};
            imgOptions = $.extend(imgDefaults, imgOptions);

        var name = getElementNameStr(fieldName, imgOptions.name);
        var className = imgOptions.className;
        var style = imgOptions.style;
        var imgFolder = imgOptions.imgFolder;
        var lazyLoad = imgOptions.lazyLoad;
        var dataAttributesStr = createDataAttributesStr(imgOptions.dataAttributes, {lazyLoad: lazyLoad, src: imgFolder + src});
        var attributes = createAttributesStr(imgOptions.attributes);

        var imgStr;
        imgStr  = '<img ';
        imgStr += dataAttributesStr;
        imgStr += attributes;
        imgStr += 'id="img-' + getFileNameBase(src) + '" ';
        imgStr += 'alt="' + src + '" ';
        imgStr += 'name="' + name + '" ';
        imgStr += 'class="' + className + '" ';

        imgStr += (style === false) ? '' : 'style="' + style + '" ';

        imgStr += (lazyLoad === true) ? '' : 'src="' + imgFolder + src + '" ';

        imgStr += ' />';

        return imgStr;
    }*/
};
