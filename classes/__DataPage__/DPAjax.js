class DPAjax
{
    constructor(data)
    {
        Object.assign(this, data.instanceVars, {
            path: '../../../intranet/php/ajax/sections/'
        });
    }

    getAjaxUrls()
    {
        return this.setAjaxUrls();
    }

    setAjaxUrls(ajaxUrls = this.page.ajaxUrls, url = '', options = {})
    {
        return this.setAJAXURLs(ajaxUrls, url, options);
    }

    setAJAXURLs(ajaxUrls = this.page.ajaxURLs, url = '', options = {})
    {
        let {proc = Object.keys(ajaxUrls)} = options;

        if (!proc) return false;

        Array.isArray(proc) || (proc = [proc])

        url = this.validateUrl(url);

        for (let urlProc in ajaxUrls) {
            if (!proc.includes(urlProc)) continue;

            ajaxUrls[urlProc] = url;
        }
    }

    validateUrl(url)
    {
        if (!url) return url;

        url = this.validatePath(url);
        url = this.validateExt(url);

        return url;
    }

    validatePath(url)
    {

        if (url.indexOf(this.path) > -1) return url;

        return this.path + url;
    }

    validateExt(url)
    {
        if (url.indexOf('.php') > -1) return url;

        return url + '.php';
    }
};
