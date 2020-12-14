/**
 * creates rows for an object of result rows
 * @param  {string} insertAt valid values are append and prepend
 */
function createInsertTable(container, page, rows, options)
{
    container = getByID(container);
    /*var module = page.module.plural;*/

    var defaults = {insertAt: 'append'};
    var settings = $.extend(defaults, options);

    var insertAt = settings.insertAt;

    /*var formOptions = page.forms;*/
    var fields = page.fields;

    var currHTMLStr = createRowsStr(rows, fields);

    var tableStr = '<table class="table">' + currHTMLStr + '</table>';

    insertElement(container, tableStr, {insertAt: insertAt});
}

function createRowsStr(rows, fields)
{
    var currHTMLStr = '';

    $.each(rows, function(key, val) {
        if (typeof val === 'string') {
            if (typeof fields[key] !== 'undefined') {

                var tdStr = '<td>';

                if (key === 'chamber') {
                    if (val == 'lower') {
                        val = 'Rep';
                    } else if (val === 'upper') {
                        val = "Sen";
                    }
                }

                tdStr += val;

                 tdStr += '</td>';
                currHTMLStr += tdStr;
            }
        } else {
            //val here is the row or the form fields once transformed
            var rowStr = createRowsStr(val, fields);
            currHTMLStr += '<tr>' + rowStr + '</tr>';
        }
    });

    return currHTMLStr;
}