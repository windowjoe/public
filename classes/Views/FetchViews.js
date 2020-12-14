class FetchViews
{
    constructor(options)
    {
        Object.assign(this, options);
    }

    setSelectViewOptions(select = false, selectsValEl = false, rows = false)
    {
        if (!select) return false;

        select = getByDOMID(select);

        let optionsStr = '<option value="">Select</option>', selOptions;

        selOptions = new Map(Object.entries(rows));

        selOptions.forEach(function(val, key) {
            optionsStr += '<option value="' + key + '">' + val.page + '</option>';
        });

        $(select).html(optionsStr);

        if (selectsValEl !== false) {
            alert('dom-manipulate-fetch-views.js - line 18 - selectsValEl');
            var selectsVal = selectsValEl.val();

            options = select.find('option');
            console.log('NUM OPTIONS: ', options.length);

             $.each(options, function(index, option) {
                var text = $(this).text();

                if (text === selectsVal) {
                    $(this).attr('selected', true);
                }
             });

        }
    }

    getSelectViewPagesList(event, options)
    {
        if (!event.target.value) return false;

        event = event.target;

        let s = this;
        let {form: {id: formID}, id: currSelectID, value: currSelectVal} = event;
        let {currSelectParamName = currSelectID, nextSelectID = false, fetchNamesVals = false,
             tableModifier = 'site', fetchFilter = 'PagesList', selectsValEl = false, urlType = false,
            } = options;

        let form = getByID(formID);

        fetchNamesVals  = s.getParamsStr(form, fetchNamesVals);
        fetchNamesVals += 'fetchOverload=1&fetchFilter[' + fetchFilter + ']=1&' + currSelectParamName + '=' + currSelectVal;
        fetchNamesVals += (getByDOMID(tableModifier).value) ? '&table_modifier=' + tableModifier : '';

        s.ajax.runCrud({
            doFlashStatusVisuals: false,
            submittedFormID: formID,
            selectID: currSelectID,
            updateDOM: false,
            fetchNamesVals: fetchNamesVals,
            urlType: urlType,
         })
        .then((data) => {
            s.setSelectViewOptions(nextSelectID, selectsValEl, data.results.rows);
        });
    }

    getParamsStr(form, params)
    {
        let str = '';

        if (!params) return str;

        params = new Map(Object.entries(params));

        params.forEach(function(elName, param) {
            let val = form.find('[name="' + elName + '"]').val();
                param = (Number.isInteger(param)) ? elName : param;

            str += str += '&' + param + '=' + val;
        });

        return Boolean(str) ? str + '&' : '';
    }
};
