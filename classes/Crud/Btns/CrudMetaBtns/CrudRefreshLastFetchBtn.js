class CrudRefreshLastFetchBtn
{
    constructor(options)
    {
        Object.assign(this, {
            metaBtns: {},
            metaBtnsContainer: options.p.containers.metaBtns.attributes.id,
            metaBtnsClass: '.refresh_btn'
        }, options);
    }

    initMetaBtns()
    {
        let s = this;

        s.metaBtns.objects = s.createMetaBtnObjects();
        s.metaBtns.htmlStr = s.crudBtnsHTML.createBtnStr(s.metaBtns.objects.buttons);
        s.setMetaBtnEventListeners();
    }

    getMetaBtnsStr()
    {
        return this.metaBtns.htmlStr;
    }

    getMetaBtnsObjects()
    {
        return this.metaBtns.objects;
    }

    setMetaBtnEventListeners()
    {
        let s = this;

        if (s.page.pagn8) {
            s.setPaginatorRefreshEventListener(s.metaBtnsClass);
        } else {
            s.setDefaultEventListener(s.metaBtnsClass);
        }
    }

    /**
     * This is called prior to init being called for the first time
     */
    setPaginatorRefreshEventListener(pagn8Obj)
    {
        let s = this;

        s.objects[s.classes.eLM.name].o.setEventListeners(s.page, s.metaBtnsContainer, {
            selector: s.metaBtnsClass,
            callbacks: [function(event){ return s.pagn8.refresh(event);}]
        });
    }

    setDefaultEventListener()
    {
        let s = this;

        s.eLM.setEventListeners(s.pageObject, s.metaBtnsContainer, {
            selector: s.metaBtnsClass,
            callbacks: [s.doFetch]
        });
    }

    doFetch(event)
    {
        event.data.pageObject.dpForms.initUpdate();
    }

    createMetaBtnObjects()
    {
        return {
            attributes: {
                insertAt: 'append',
                show: true
            },
            container: {
            },
            buttons: {
                refresh: {
                    input: {
                        show: true,
                        editable: true,
                        type: 'button',
                        dataAttributes: {},
                        attributes: {id: 'refresh'},
                        className: 'btn btn-default btn-sm refresh_btn',
                        icon: 'refresh',
                        title: 'Refresh Page'
                    }
                }
            }
        };
    }
};
