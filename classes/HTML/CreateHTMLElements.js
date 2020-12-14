class CreateHTMLElements
{
    constructor(options)
    {
        Object.assign(this, options);
    }

    createHTMLElement(elementOptions, innerHTML = '') {

        if (!elementOptions) return innerHTML;

        let s = this;
        let {tagName,
            className,
            dataAttributesStr,
            attributesStr} = elementOptions;

        let html = this.createBaseTag(tagName, className, dataAttributesStr, attributesStr);
        let funcName = 'create' + s.sM.ucWords(tagName) + 'Str';

        if (typeof this[funcName] === 'function') {
            html = this[funcName](html, elementOptions);
            html += '>' + innerHTML + '</' + tagName + '>';
        } else {
            html += '>' + innerHTML + '</' + tagName + '>';
        }

        return html;
    }

    createBaseTag(tagName, className=false, dataAttributesStr=false, attributesStr=false)
    {
        let html  = '<' + tagName + ' ';

            html += className ? 'class="' + className + '" ' : '';
            html += dataAttributesStr ? dataAttributesStr + ' ' : '';
            html += attributesStr ? attributesStr + ' ' : '';

        return html;
    }

    createAStr(html, elementOptions)
    {
        let {href} = elementOptions;

        return html += href ? ' href="' + href + '"' : '';
    }
};
