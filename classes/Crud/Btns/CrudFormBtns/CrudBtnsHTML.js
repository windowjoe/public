class CrudBtnsHTML
{
    constructor(options)
    {
        Object.assign(this, options);
    }

    createBtnsStrInCol(btns, colAttrObj)
    {
        if (btns) {
            if  (typeof btns === 'string') {
                return createColStr(btns, colAttrObj);
            } else if (typeof btns === 'object') {
                return createColStr(this.createBtnStr(btns), colAttrObj);
            }
        }

        return false;
    }

    /**
     * creates an individual button string
     * @param  {string} buttonName the name of the button
     * @param  {array} buttonAttrObj an array with options for the button
     * @return {string} a string representing the new button
     */
    createBtnStr(btnName, btnOptions, options)
    {
        let s = this;
        let btnStr = '';

        if (typeof btnName === 'string') {
            btnOptions = btnOptions.input || btnOptions;  //allows user to pass the full btn obj or the btn.input object

            //let name = s.eO.getElementNameStr(btnName, btnOptions.name);
            let eO = s.objects.eO.o;

            let name = eO.getElementNameStr(btnName, btnOptions.name);
            let title = btnOptions.title;
            let type = btnOptions.type;
            let className = btnOptions.className;
            let dataAttributes = btnOptions.dataAttributes;

            let btnTitle = title || btnName;

            //let iconStr = s.labelsIconsHTML.createFontAwesomeIconStr(btnOptions.icon);
            let iconStr = s.objects.labelsIconsHTML.o.createFontAwesomeIconStr(btnOptions.icon);

            let attributesStr = eO.createAttributesStr(btnOptions.attributes);
            let dataAttributesStr = eO.createDataAttributesStr(dataAttributes);

            let {value = btnName} = Object.assign({value: false}, options);

            btnStr  = '<button ';
            btnStr += 'type="' + type + '" ';
            btnStr += 'class="' + className + '" ';
            btnStr += 'name="' + name + '" ';
            btnStr += 'value="' + value + '" ';
            btnStr += 'title="' + btnTitle + '" ';
            btnStr += dataAttributesStr;
            btnStr += attributesStr;
            btnStr += '>';
            btnStr += iconStr;
            btnStr += '</button>';

            return btnStr;
        } else if (typeof btnName === 'object') {
            $.each(btnName, function(btnName, btnOptions) {
                if (btnName !== 'container' && btnName !== 'attributes' && btnOptions.input.show === true) {
                    btnStr += s.createBtnStr(btnName, btnOptions.input, options);
                }
            });
        }

        return btnStr;
    }

    createButtonStr(btnName, val, btnOptions)
    {
        return createBtnStr(btnName, btnOptions, {value: val});
    }
};