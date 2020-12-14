class CrudMetaBtnsHTML
{
    constructor(options)
    {
        Object.assign(this, {
            btnSetSeparator: '<span class="meta_btns_pipe"></span>',
            btnSpanId: '_meta_btns_span'
        }, options);
    }

    createInsertMetaBtns(metaBtnsContainer, objects, options = {})
    {
        let s = this, i, iBtn, id, iName;
        let {insertAt = 'append', btnStr = ''} = options;

        for (iName in s.classes) {
            if (typeof objects[s.classes[iName].name].o.getMetaBtnsStr !== 'function') continue;

            iBtn = objects[s.classes[iName].name].o.getMetaBtnsStr();

            btnStr =  '<span id="' + s.getId(iName) + '">'+ iBtn + s.btnSetSeparator + '</span>' + btnStr;
        }

        insertElement(metaBtnsContainer, btnStr, {insertAt});
    }

    getId(name)
    {
        return name + this.btnSpanId;
    }
}

    //iBtn = i.o.getMetaBtnsStr ? i.o.getMetaBtnsStr() : false;
/*
$.each(s.classes, function(iName, attributes) {
        i = objects[attributes.name];
        iBtn = i.o.getMetaBtnsStr ? i.o.getMetaBtnsStr() : false;

        if (iBtn) {
            id = iName + '_meta_btns_span';

            btnStr =  '<span id="' + id + '">'+ iBtn + s.btnSetSeparator + '</span>' + btnStr;
        }
});
*/