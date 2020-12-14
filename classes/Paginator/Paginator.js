class Paginator
{
    constructor(options)
    {
        Object.assign(this, {
            recordsOrderDefault: 'DESC',
            recordsOrder: 'DESC',

            pkLimit: '10',
            pkPrevStart: [],
            pkPrevStartLen: false,
            pkPrevStartLenB4: false,

            btnPrevID: 'pagn8_prev_btn',
            btnNextID: 'pagn8_next_btn',
            btnFirstID: 'pagn8_first_btn',
            btnLastID: 'pagn8_last_btn',

            currBtnClckd: 'pagn8_first_btn',
            lastBtnClckd: false,

            metaBtnsClass: '.pagn8_btn',
            metaBtnsContainer: options.containers.metaBtns.attributes.id,

            pkStartDefaultASC: 1262304000,
            pkStartDefaultDESC: this.getPKDefaultStartVal(),
            pkStartDefault: this.getPKDefaultStart(),
            pkStart: this.getPKDefaultStart(),

            prevLenWas3: false,
            refreshing: false,

            metaBtns: {}
        }, options);

        this.initMetaBtns();
    }

    init(data)
    {
        if (data.proc === 'fetch' && data.results.rows) {
            var rows = data.results.rows;

            this.setPKStart(rows);

            if (this.refreshing === false) {
                this.pushPKPrevStart(rows);
                this.setPaginatorBtns();
            }

            this.refreshing = false;
        }
    }

    refresh(event)
    {
        let s = this;
        event = (typeof event.event === 'object') ? event.event : event;
        s.refreshing = true;

        if (s.pkPrevStart.length === 1 && s.recordsOrder === 'DESC') {
            let newPKStart = this.getPKDefaultStartVal();
            s.setPKDefaultStart(newPKStart);
            s.pkPrevStart[0] = newPKStart;
        }

        this.doFetch(event);
    }

    CRUDSetUp(event)
    {
        let btn = event.data.btn;

        this.lastBtnClckd = this.currBtnClckd;
        this.currBtnClckd = $(btn).attr('id');
        this.doFetch(event);
    }

    doFetch(event)
    {
        let s = this;

        s.setDirection(event.data.btn.id);
        s.p.forms.standardForms.update.order = s.recordsOrder;

        s.dpForms.initUpdate({doPagn8: true});
    }

    setDirection(btn, options)
    {
        let s = this;
        let btnID = getByID(btn).attr('id');

            if ((btnID === s.btnPrevID && s.recordsOrder === s.recordsOrderDefault) ||
                (btnID === s.btnNextID && s.recordsOrder !== s.recordsOrderDefault)
            ) {
                s.setPKStartToPKPrevPageStart(btn, options);
            } else if (btnID === s.btnFirstID || btnID === s.btnLastID) {
                s.resetPaginator(btnID);
            } else if (btnID === 'refresh') {
                s.setPKStart('refresh');
            }
    }

    resetPaginator(btnID)
    {
        let s = this;

        if (btnID === s.btnFirstID) {
            s.recordsOrder = s.recordsOrderDefault;
        } else if (btnID === s.btnLastID && s.recordsOrder === s.recordsOrderDefault) {
            s.recordsOrder = (s.recordsOrder === 'DESC') ? 'ASC' : 'DESC';
        }

        s.setPKStart(s.getPKDefaultStart());
        s.pkPrevStart = [];
    }

    setPKStart(val)
    {
        if (typeof val === 'object') {
            if (this.recordsOrder === this.recordsOrderDefault) {
                //this.pkStart = this.getLastPaginatorID(val);
                this.pkStart = this.getFirstPaginatorID(val);
            } else {
                this.pkStart = this.getLastPaginatorID(val);
            }
        } else if (val === 'refresh') {
            let len = this.pkPrevStart.length;

            this.pkStart = this.pkPrevStart[len-1];
        } else if (typeof val === 'string' || typeof val === 'number') {
            this.pkStart = val;
        }
    }

    setPKStartToPKPrevPageStart() {
        this.prevLenWas3 = (this.pkPrevStart.length === 3) ? true : false;
        this.pkPrevStart.pop(); //get rid of the current page
        this.setPKStart(this.pkPrevStart.pop()); //pop again to get start for prev page

    }

    pushPKPrevStart(rows)
    {
            this.pkPrevStartLenB4 = this.pkPrevStart.length;
        let addTo = (this.recordsOrder === 'DESC') ? 1 : -1;

        if (this.recordsOrder === this.recordsOrderDefault) {
            this.pkPrevStart.push(this.getLastPaginatorID(rows) + parseInt(addTo));
        } else {
            this.pkPrevStart.push(this.getFirstPaginatorID(rows) + parseInt(addTo));
        }

        this.pkPrevStartLen = this.pkPrevStart.length;
    }

    setPaginatorBtns()    {
        var s = this;

        if (s.pkPrevStartLen === 1 || (s.pkPrevStartLen === 2 && s.prevLenWas3 === false)) {

            var btnsArr = [];

            //going from 1st to last page or last to first page
            if ((s.lastBtnClckd === s.btnFirstID && s.currBtnClckd === s.btnLastID) ||
                (s.lastBtnClckd === s.btnLastID && s.currBtnClckd === s.btnFirstID)
                )
            {
                btnsArr = [s.btnPrevID, s.btnFirstID, s.btnNextID, s.btnLastID];
            //turns off if on the 1st page and back on if you leave the first page
            } else if (s.recordsOrder === s.recordsOrderDefault) {
                btnsArr = [s.btnPrevID, s.btnFirstID];

                if (getByID(this.btnLastID).attr('disabled') == 'disabled') {
                    btnsArr[2] = s.btnNextID;
                    btnsArr[3] = s.btnLastID;
                }

            //turns off if on the last page and back on if you leave the last page
            } else if (s.recordsOrder !== s.recordsOrderDefault) {
                btnsArr = [s.btnNextID, s.btnLastID];

                if (getByID(this.btnFirstID).attr('disabled') == 'disabled') {
                    btnsArr[2] = s.btnFirstID;
                    btnsArr[3] = s.btnPrevID;
                }
            }

            s.toggleEnable(btnsArr);
        }
    }

    toggleEnable(el)
    {
        if (!Array.isArray(el)) {
            el = [el];
        }

        for (var i=0; i<el.length; i++) {
            var element = getByID(el[i]);

            var curr = element.attr('disabled');

            if (curr != true && curr != 'disabled') {
                element.attr('disabled', true);
            } else {
                element.removeAttr('disabled').removeClass('disabled');
            }
        }
    }

    getPKDefaultStartVal(type = 'timestamp', order = 'DESC')
    {
        if (type === 'timestamp' && order === 'DESC') {
            return Math.floor(Date.now() / 1000);
        } else if (type === 'timestamp' && order === 'ASC') {
            return 0;
        }
    }

    getPKDefaultStart()
    {
        return (this.recordsOrder === 'DESC') ? this.pkStartDefaultDESC : this.pkStartDefaultASC;
    }

    setPKDefaultStart(val)
    {
        if (this.recordsOrder === 'DESC') {
            this.pkStartDefaultDESC = val;
        } else {
            this.pkStartDefaultASC = val;
        }
    }

    getFirstPaginatorID(rows)
    {
        var keys = Object.keys(rows);
        var firstID = keys[0].substring(keys[0].lastIndexOf('-') + 1);

        return parseInt(firstID);
    }

    getLastPaginatorID(rows)
    {
        var keys = Object.keys(rows);
        var lastID = keys[keys.length-1].substring(keys[keys.length-1].lastIndexOf('-') + 1);

        return parseInt(lastID);
    }

    initMetaBtns()
    {
        let s = this;

        s.metaBtns.objects = s.createMetaBtnObjects();

        let crudBtnsHTML = s.p.objects[s.p.classes.crudBtnsHTML.name].o;

        s.metaBtns.htmlStr = crudBtnsHTML.createBtnStr(s.metaBtns.objects.buttons);
        s.setMetaBtnEventListeners();
        s.setCrudRefreshLastFetchEventListener();
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
        let eLM = s.p.objects[s.p.classes.eLM.name].o;

        eLM.setEventListeners(s.p, s.metaBtnsContainer, {
            cancelEventTrigger: true,
            selector: s.metaBtnsClass,
            callbacks: [function(event){ return s.CRUDSetUp(event);}]
        });
    }

    setCrudRefreshLastFetchEventListener()
    {
        let objects = this.p.objects;
        let classes = this.p.classes;

        let refreshObj = objects[classes.crudRefreshLastFetchBtn.name].o;

        if (typeof refreshObj  === 'object') {
            refreshObj.setPaginatorRefreshEventListener(this);
        }
    }

    createMetaBtnObjects()
    {
        return {
            attributes: {
                insertAt: 'prepend',
                show: true
            },
            container: {
            },
            buttons: {
                first: {
                    input: {
                        show: true,
                        editable: false,
                        type: 'button',
                        dataAttributes: {},
                        attributes: {id: 'pagn8_first_btn'},
                        className: 'btn btn-default btn-sm pagn8_btn',
                        icon: 'angle-double-left',
                        title: 'Go to First Page'
                    }
                },
                prev: {
                    input: {
                        show: true,
                        editable: false,
                        type: 'button',
                        dataAttributes: {},
                        attributes: {id: 'pagn8_prev_btn'},
                        className: 'btn btn-default btn-sm pagn8_btn',
                        icon: 'arrow-left',
                        title: 'Go to Previous Page'
                    }
                },
                next: {
                    input: {
                        show: true,
                        editable: true,
                        type: 'button',
                        dataAttributes: {},
                        attributes: {id: 'pagn8_next_btn'},
                        className: 'btn btn-default btn-sm pagn8_btn',
                        icon: 'arrow-right',
                        title: 'Go to Next Page'
                    }
                },
                last: {
                    input: {
                        show: true,
                        editable: true,
                        type: 'button',
                        dataAttributes: {},
                        attributes: {id: 'pagn8_last_btn'},
                        className: 'btn btn-default btn-sm pagn8_btn',
                        icon: 'angle-double-right',
                        title: 'Go to Last Page'
                    }
                }
            }
        };
    }
};
