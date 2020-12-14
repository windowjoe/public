/** Class to integrate with the CloudFlare API */
class CloudFlareAPI
{
    /**
     *Create CloudFlareAPI Object for dataExchange to use.
     *
     *@param data Takes a DataPage Object to interact with the page's forms
     */
    constructor(options)
    {
        Object.assign(this, {
            fields: options.p.fields,
            contentElementID: 'content',
            clearCacheFilesSelectName: 'clear_cache_files',
            clearCacheFilesSelectID: 'clear_cache_files',
            cloudFlareClearCacheClass: 'cloudFlare_clear_cache',
            cloudFlareClearCacheURL: DOMAIN + 'intranet/php/ajax/apis/cloudflare/clear-cache.php',
            documentFiles: []
        }, options);
    }

    /**
     * Initializes needed variables AFTER the read/update form(s) have loaded thus giving access to the DOM
     * Sets the options in the Clear Cache Files multi-select element
     * Sets URL of page as a class level variable
     */
    init(data)
    {
        let s = this;

        s.setEventListeners(s.initialized);
        s.initialized = true;

        let site = document.getElementById('site');
        let value = site ? site.value : false;

        if (site && value) {
            s.setClearCacheFileSelectOptions(s.fields.standardForms[s.clearCacheFilesSelectName].element);
            s.setURL();
        }
    }

    /**
     * Sets this.pageURL to URL of page e.g. https://www.windowreplacement.net/alabama.html
     * Uses page field to get name of page
     */
    setURL()
    {
        let s = this;
        let pageName = '';

            s.page = document.querySelector('[name="page"]').value;
            pageName = s.page.toLowerCase();
            pageName = pageName.replace(/ /g, '-');
            s.pageURL = DOMAIN_WR + pageName + '.html';
    }


    /**
     * Creates and sets the options in the select element, id=clear_cache_files by default
     * By default the main css, main js and all images in the article are included in the list
     * There is not an option to dynamically add other files at this time
     *
     * @param element The element object from the clear_cache_files field object which contains all element attributes
     */
    setClearCacheFileSelectOptions(element)
    {
        let  s = this;

        element.optionVals.length = 0;

        s.setCSSFiles(element);
        s.setJSFiles(element);
        s.setImageFiles(element);

        s.dS.setSelectOptionsStr(element);

        s.dS.replaceOptions(s.clearCacheFilesSelectID, element.optionsStr);
    }

    /**
     * Adds CSS files to element.optionVals array
     *
     * @param element The element object from the clear_cache_files field object which contains all element attributes
     */
    setCSSFiles(element)
    {
        let s = this;

        element.optionVals.push({htmlStr: 'CSS', value: DOMAIN_WR + CSS_FILE});
    }

    /**
     * Adds JS files to element.optionVals array
     *
     * @param element The element object from the clear_cache_files field object which contains all element attributes
     */
    setJSFiles(element)
    {
        let s = this;

        element.optionVals.push({htmlStr: 'JS', value: DOMAIN_WR + JS_FILE});
    }

    /**
     * Adds image files to element.optionVals array. Gets article content from contentElementID element.
     * Pulls all image filenames from the src attribute and reduces to the option htmlStr to filename with path or extension
     * and places full URL in the option value attribute.
     *
     * @param element The element object from the clear_cache_files field object which contains all element attributes
     */
    setImageFiles(element)
    {
        let s = this;
        let contentElementID = s.contentElementID;

        let content = document.querySelector('#' + contentElementID);

        if (content) {
            content = content.innerHTML;

            let regex = /https:\/\/www.windowreplacement.net\/cdn-cgi\/image\/width=[^"]*.jpg/g;
            let images = content.match(regex);

            if (images) {
                images.forEach(function(image) {
                    let imageName = image.substring(image.lastIndexOf('/') + 1, image.length - 4);
                    element.optionVals.push({htmlStr: imageName, value: image});
                });
            }
        }
    }

    /**
     * Sets event listener on cloudFlareClearCacheClass elements. Default class is set in contstructor.
     * Calls back to this.cloudFlareClearCache with the event.
     */
    setEventListeners(initialized)
    {
        if (initialized) return true;

        let s = this;
        let selector = '.' + s.cloudFlareClearCacheClass;

        //setup clear cache button
        s.eLM.setEventListeners(s.page, s.page.containers.main.attributes.id, {
            selector: selector,
            cancelEventTrigger: true,
            callbacks: [function(event){ return s.cloudFlareClearCache(event);}]
        });
    }

    /**
     * Triggered by the click event on any element with the this.cloudFlareClearCacheClass class.  Gets all
     * files from the this.clearCacheFilesSelectID element and adds, by default, the this.pageURL.  Creates
     * AjaxProcessing object and sends the request to CloudFlare.
     * On success the clicked button turns green then back to default color
     * On failure the clicked button turns red then back to default color and an alert box is triggered.
     *
     * @param event The event triggered by clicking the this.cloudFlareClearCacheClass element
     */
    cloudFlareClearCache(event)
    {
        event.preventDefault();

        let s = this;

        let formID = event.currentTarget.form.id;
        let proc = "purge";

        let files = new Array();
        let options = document.querySelectorAll('#' + formID + ' #' + s.clearCacheFilesSelectID + ' option:checked');
            files = Array.from(options).map(el => el.value);
            files.push(s.pageURL);

            files = {files: files};

        let namesVals = 'proc=' + proc + '&files=' +  JSON.stringify(files);

        let ajax = new AjaxProcessing(statePagesPage);
        let result = ajax.ajaxProcessing(namesVals, {url: s.cloudFlareClearCacheURL});

        result.done(function(data) {
            let result = JSON.parse(data);
            let success = result.success;

            if (success) {
                s.fV.flashResultStatusOnBtn(s.cloudFlareClearCacheClass, formID, success);
            } else {
                s.fV.flashResultStatusOnBtn(s.cloudFlareClearCacheClass, formID, false);
                alert (result);
            }
        });

        document.getElementById(s.clearCacheFilesSelectID).value = '';
    }
};
