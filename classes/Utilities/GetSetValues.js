class GetSetValues
{
    constructor(options)
    {
        Object.assign(this, options);
    }

    clearFields(form)
    {
        form = getByID(form);

        if (form !== false) {
            form.find('input[type="text"], select, textarea').val('');
        }
    }

    findObjectByProperty(array, property, value) {
        for (var i = 0, len = array.length; i < len; i++) {
            console.log('TYPE: ', typeof array[i], ', array[i]: ', array[i], ', VALUE: ', value);
            if (typeof array[i] === 'string' && array[i] === value) {
                array[i] = {};
                array[i][property] = value;

                return array[i]; // Return as soon as the object is found

            } else if (array[i][property] === value) {
                return array[i]; // Return as soon as the object is found
            }
        }
        return null; // The object was not found
    }

    getRowPKIDs(rows, options)
    {
        if (!rows) return false;

        let rowsType = typeof rows;

        let keys = (rowsType === 'object') ? Object.keys(rows) : rows;

        if (rowsType === 'object') {
            if (rows[keys[0]].pk){
                keys.length = 0;

                $.each(rows, function(index, row){
                    keys.push(row.pk);
                });
            } else {
                keys = Object.keys(rows);
            }
        } else {
            keys = rows;
        }

        keys = (typeof keys === 'string') ? [keys] : keys;

        let type;

        if (typeof options === 'string') {
            type = options;
        } else {
            let defaults = {type: 'string'};
            let settings = $.extend(defaults, options);
                type = settings.type;
        }

        if (type === 'array') {
            return keys;
        }

        keys = keys.join();

        if (type === 'string') {
            return keys;
        }

        keys = '#' + keys.replace(/,/g, ',#');

        if (type === 'jQueryIDString') {
            return keys;
        }

        if (type === 'jQueryIDArray') {
            return keys.split(',');
        }

        return keys;
    }
}
