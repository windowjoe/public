class InputPills
{
    constructor(options)
    {
        Object.assign(this, options);
    }

    createEditableList(container, list, options={activeTitle: '', inactiveTitle: ''})
    {
        let s = this;
        let htmlList = '';
        let containerName = typeof container === 'object' ? container.attributes.getNamedItem('name').value : container;
        let {activeTitle, inactiveTitle} = options;

        let dataActiveTitle = s.getDataAttrStr('active-title', activeTitle);
        let dataInactiveTitle = s.getDataAttrStr('inactive-title', inactiveTitle);

        let input = `<input type="text"
                      disabled="disabled"
                      name="` + containerName + `[]"
                      value="{{VALUE}}" ` +
                      `class="` + containerName + `_item"
                      data-iseditablelistitem="true"
                      title="` + activeTitle + `" ` +
                      dataActiveTitle +
                      dataInactiveTitle +
                      `>`;

        let icon = `<i class="far fa-times-circle"
                    title="` + activeTitle + `" ` +
                    dataActiveTitle +
                    dataInactiveTitle +
                    `></i>`;

        list = Array.isArray(list) ? list : list.replace(/, /ig, list).split(',');

        list.forEach(function(value) {
            htmlList += '<span class="editable_list_span">' + input.replace(/{{VALUE}}/ig, value) + icon + '</span>';
        });

        return htmlList;
    }

    getDataAttrStr(name, value)
    {
        if (!value) return '';

        return 'data-' + name + '="' + value + '" ';
    }

    fitInputWidths(container, inputClass)
    {
        //container = container.attributes ? container;
        for (let item of container.querySelectorAll(inputClass).values()) {
            item.style.width = this.calcInputWidth(item.value);
        }
    }

    calcInputWidth(value)
    {
        return (((value.length) * 8) - 2) + 'px';
    }
};