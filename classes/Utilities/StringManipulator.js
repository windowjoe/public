/** Utility class to help with string manipulation. */
class StringManipulator
{   /**
     * Create a StringManipulator
     */
    constructor(options)
    {
        Object.assign(this, options);
    }

    /**
     * takes a raw value and formats it for an html page
     * @param  {string} val the value string to be manipulated
     * @param  {object} formats an object defining formatting options. if each option is
     * set to true, val will be formatted to that option
     * options: strong | uppercase
     * @return {string} the value formatted for insertion into the html page
     */
    valToFormattedHTMLStr(val, formats)
    {
        let s = this;
        let htmlStr = val;

        if (formats.uppercase) {
            val = s.firstLetterToUpper(val);
        }

        if (formats.strong) {
            htmlStr = '<strong>' + val + '</strong>';
        }

        return htmlStr;
    }

    /**
     * changes the first letter of each word to Upper Case
     * @param  {string} str the string to manipulate
     * @return {string} the transformed string
     */
    firstLetterToUpper(str)
    {
        return str.toLowerCase().replace(/\b[a-z]/g, function(letter) {
            return letter.toUpperCase();
        });
    }

    /**
     * Makes first letter in all words in a string uppercase
     * @param {string} str the string to update
     * @return {string} the string with the first letter of each word changed to uppercase
     */
    ucWords(str)
    {
        return str.replace(/\b[a-z]/g, function(letter) {
            return letter.toUpperCase();
        });
    }

    /**
     * Changes first letter in string to lowercase
     * @param {string} str the string to update
     * @return {string} the string with the first letter changed to lowercase
     */
    firstLetterToLower(str)
    {
        return str.slice(0).toLowerCase() + str.slice(1);
    }

    /**
     * Removes all characters not in the set [0-9]
     * @param {string} str the string to cleanse of non-numeric characters
     * @return {string} the string sans non-numeric characters
     */
    cleanPhoneNum(str)
    {
        if (!str) return '';

        return str.replace(/[^\d\.]/g, '');
    }

    /**
     * Returns the filename of a url
     * @param {string} str The url with the filename
     * @return {string} The filename inclusive of the extension
     */
    getFileName(str)
    {
        var lastSlash = str.lastIndexOf('/');

        return str.substring(lastSlash + 1);
    }

    /**
     * Removes the extension from a filename
     * @param {string} str a string to be examined
     * @return {string} the filename without the extension
     */
    getFileNameBase(str)
    {
        let fileName = getFileName(str);

        return fileName.substring(0, fileName.lastIndexOf('.'));
    }

    /**
     * Removes protocol from url
     * @param {string} url
     * @return {string} the url without the protocol
     */
    cleanURLToWebBase(url)
    {
        if (!url) return false;

        return url.replace(/^https?\:\/\//i, "");
    }

    getByID(idSelector)
    {
        if (typeof idSelector === 'string') {
            if (idSelector[0] !== '#') {
                idSelector = '#' + idSelector;
            }

            return $(idSelector);
        } else if (typeof idSelector === 'object' && idSelector.id) {
            return $('#' + idSelector.id);
        }

        return idSelector;
    }

    getByDOMID(id)
    {
        if (typeof id === 'object' && id[0]) {
            id = (id[0].id) ? id[0].id : id;
        }

        id = (id[0] === '#') ? id.substring(1) : id;

        if (typeof id === 'string') {
            return document.getElementById(id);
        }

        return id;
    }

    valClassSelector(className)
    {
        if (typeof className === 'string' && className[0] !== '.') {
            className = '.' + className;
        }

        return className;
    }

    valIsObject(obj)
    {
        if (typeof obj === 'undefined' || obj === null) {
            return {};
        } else {
            return obj;
        }
    }

    insertElement(container, htmlStr, options)
    {
        let s = this;

        container = s.getByID(container);

        var defaults = {insertAt: 'append'};
        var settings = $.extend(true, defaults, options);

        var insertAt = settings.insertAt;

        var elToReplace;

        if (typeof insertAt.elToReplace !== 'undefined' && typeof insertAt.insertType !== 'undefined') {
            elToReplace = s.getByID(insertAt.elToReplace);
            insertAt = insertAt.insertType;
        }

        if (insertAt == 'append') {
            container.append(htmlStr);
        } else if (insertAt == 'prepend') {
            container.prepend(htmlStr);
        } else if (insertAt === 'replace') {
            elToReplace.replaceWith(htmlStr);
        } else {
            $(htmlStr).insertAfter(s.getByID(insertAt));
        }

        //logDebug.log('insertElement - container: ' + container.attr('id') + ', insertAt: ' + insertAt);
    }

    makeArray(entity)
    {
        return Array.isArray(entity) ? entity : [entity];
    }

    concat(arr1, arr2)
    {
        return arr1.concat(arr2.filter((item) => arr1.indexOf(item) < 0));
    }

};
