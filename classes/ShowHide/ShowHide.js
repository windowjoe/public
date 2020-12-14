class ShowHide
{
    constructor(options, shSectionsBtns)
    {
        Object.assign(this, {
            formBtnsClass: '.collapse_flag',
            sectionsShowing: new Map(),
            metaBtnsContainer: options.containers.metaBtns.attributes.id,
            containerBtnsContainer: options.containers.metaBtns.attributes.id,
            shSectionsBtns: {},
            formBtns: {},
            metaBtns: this.getInitialBtns(options.metaBtns, options.containers.metaBtns.attributes.id),
            containerBtns: this.getInitialBtns(options.containerBtns, options.containers.metaBtns.attributes.id)
        }, options);
    }

    init(data) {
        let s = this;
        let rows = data.results.rows;
        let formIds = s.gSV.getRowPKIDs(rows, {type: 'jQueryIDString'});

        s.setEventListeners(s.initialized);

        s.applyToggleClassesToCollapseContainers(s.initialized, s.formBtns, s.formBtns.add);

        this.initialized = true;

        s.applyToggleClassesToCollapseContainers(false, s.metaBtns, s.metaBtns);

        s.applyToggleClassesToCollapseContainers(false, typeof this.formBtns.update === 'object', this.formBtns.update, {formIds});

        s.setOpenContainers(this.sectionsShowing);
     }

    setEventListeners(initialized)
    {
        if (initialized) return true;

        var s = this;

        //setup lead and strings buttons event listeners
        s.eLM.setEventListeners(s.page, s.page.containers.main.attributes.id, {
            selector: s.formBtnsClass,
            cancelEventTrigger: true,
            callbacks: [function(event){ return s.toggleFormRows(event);}]
        });
    }

    toggleFormRows(event)
    {
        //var btn = event.btn;
        var btn = $(event.data.btn);
        var rowClass = btn.attr('name');
        var form = btn.parents('form');
        var formID = form.attr('id');

        /*var formRowID = formID + '_' + rowClass;*/

        this.toggleCollapseContainerFlag(formID, rowClass);
        this.showHideCollapseContainers(form, rowClass);
    }

    toggleCollapseContainerFlag(formID, rowClass)
    {
        var openFormCollapseContainers = this.sectionsShowing.get(formID);

        //if the form doesn't have an entry, we know the collapseContainer is collapsed
        //add the formID and create the array to hold the class
        if (!openFormCollapseContainers) {
            return this.sectionsShowing.set(formID, [rowClass]);
        } else if (openFormCollapseContainers.indexOf(rowClass) === -1) {
            //else, if the entry is present, see if the collapseContainer is there (open)
            return openFormCollapseContainers.push(rowClass);
        } else {
            var rowClassIndex = openFormCollapseContainers.indexOf(rowClass);
            openFormCollapseContainers.splice(rowClassIndex, 1);

            if (openFormCollapseContainers.length === 0) {
                this.sectionsShowing.delete(formID);
            }
        }
    }

    showHideCollapseContainers(form, rowClass, options)
    {
        let s = this;

        form = getByID(form);

        var defaults = {addClasses: false};
        var settings = $.extend(defaults, options);

        var addClasses = settings.addClasses;

        /*var formID = form.attr('id');*/
        var rows = form.find(s.sM.valClassSelector(rowClass));

        //toggle for a nice fade in/out
        if (!addClasses) {
            rows.collapse('toggle');
        } else {
        //add classes for immediate showing. useful when updating to prevent page from jumping
            rows.addClass(' on in');
        }
    }

    setOpenContainers(sectionsShowing)
    {
        var s = this;

        sectionsShowing.forEach(function(classes, formID/*, showing*/) {
            classes.forEach(function(rowClass/*, index, classes*/) {
                s.showHideCollapseContainers(formID, rowClass, {addClasses: true});
            });
        });
    }

    //this happens pre-render
    initBtns()
    {
        var initBtns = this.getInitBtnsObj(this.shSectionsBtns);

        this.metaBtns = initBtns.meta;
        this.formBtns = initBtns.forms;
    }

    getInitBtnsObj(shSectionsBtns)
    {
        var buttons = {containers: {add: 1}, forms: {add: 0, update: 0}};
        var btns = $.extend(true, buttons, shSectionsBtns);

        this.validateInitBtnsObj(btns);
        btns = this.standardizeBtnObj(btns);

        return btns;
    }

    validateInitBtnsObj(btns)
    {
        if ((btns.containers.add === 0 && btns.containers.fetch === 0) || btns.containers === 0) {
            btns.containers = false;
        }

        if ((btns.forms.add === 0 && btns.forms.update === 0) || parseInt(btns.forms) === 0) {
            btns.forms = false;
        } else {
            //if there is no add or update section, don't show any containers SH btns for that section
            //this will override the instances object in the page object
            var standardForms = this.page.forms.standardForms;

            $.each(standardForms, function(formName, formAttr) {
                if (formAttr.has === false) {
                    var containerName = (typeof formAttr.container === 'undefined') ? formName : formAttr.container;
                    btns.containers[containerName] = 0;
                    btns.forms[formName] = 0;
                }
            });
        }
    }

    standardizeBtnObj(btns)
    {
        var s = this;
        var newBtns = {meta: {objects: {}, htmlStr: ''}, forms: {}};

        $.each(btns, function(type, sections) {
            if (sections !== false) {
                $.each(sections, function(sectionName, sectionBtns) {
                    if (sectionBtns != false) {
                        sectionBtns = s.validateSectionBtns(sectionBtns);

                        var sectionBtnsStd = s.createBtns(type, sectionBtns, sectionName);

                        if (type === 'forms') {
                            newBtns.forms[sectionName] = sectionBtnsStd;

                            if (sectionBtnsStd !== false && typeof sectionBtnsStd.meta === 'object') {
                                newBtns.meta.objects = $.extend(true, newBtns.meta.objects, sectionBtnsStd.meta.objects);
                                newBtns.meta.htmlStr += sectionBtnsStd.meta.htmlStr;
                            }
                        } else if (type === 'containers') {
                            newBtns.meta.objects = $.extend(true, newBtns.meta.objects, sectionBtnsStd.objects);
                            newBtns.meta.htmlStr += sectionBtnsStd.htmlStr;
                        }
                    }
                });
            } else {
                newBtns[type] = false;
            }
        });

        return newBtns;
    }

    validateSectionBtns(btns)
    {
        var s = this;
        var validBtns = (Number.isInteger(btns)) ? s.createFillNumericalArray(btns) : btns;
            validBtns = (Array.isArray(btns)) ? btns : [btns];

        return validBtns;
    }

    createBtns(type, btns, sectionName)
    {
        var s = this;
        var stdBtns = {objects: {}, htmlStr: '', meta: {objects: {}, htmlStr: ''}};

        for (var index=0; index<btns.length; index++) {

            var btnNum = s.addLeadingZeroToDigit(index+1);
            var btnName = 'sh_' + type + '_' + sectionName + '_' + btnNum; //also the target container class
            var funcName = 'create' + s.sM.ucWords(type) + 'BtnObj';
            var btn = s[funcName](btnName, btns[index], sectionName, type);

            if (btn !== false) {
                stdBtns.objects[btnName] = btn;
                stdBtns.htmlStr += s.crudBtnsHTML.createBtnStr(btnName, stdBtns.objects[btnName]);
            }

            if (btns[index].meta === true) {
                var metaBtnName = 'sh_meta_' + sectionName + '_' + btnNum;
                var metaBtn = s.createMetaBtnObj(metaBtnName, btns[index], sectionName, type);

                if (metaBtn !== false) {
                    stdBtns.meta.objects[metaBtnName] = metaBtn;
                    stdBtns.meta.htmlStr += s.crudBtnsHTML.createBtnStr(metaBtnName, stdBtns.meta.objects[metaBtnName]);
                }
            }
        }

        if (Object.keys(stdBtns.meta.objects).length === 0) {
            delete stdBtns.meta;
        }

        return stdBtns;
    }

    createFormsBtnObj(targetClass, btnOptions, sectionName, type)
    {
        sectionName = (sectionName === 'update') ? 'fetch' : sectionName;

        var s = this;

        btnOptions = s.validateBtnOptions(btnOptions, sectionName);

        var btn = {
            placement: {
                meta: false,
                forms: true,
            },
            collapseContainer: {
                selector: false,
                collapsed: true,
                parent: false,
                sectionName: false,
            },
            input: {
                show: true,
                editable: true,
                type: 'button',
                dataAttributes: {toggle: 'collapse'},
                className: 'btn btn-default btn-sm collapse_flag col_btns_00',
                icon: 'chevron-down',
                title: targetClass
            }
        };

        this.setBtnOptions(btn, btnOptions);

        if (btn.placement[type] === false) {
            return false;
        }

        if (btn.collapseContainer.selector === false) {
            btn.collapseContainer.selector = s.sM.valClassSelector(targetClass);
        }

        btn.collapseContainer.parent = s.findContainer(btn.collapseContainer.parent, {sectionName: sectionName});

        return btn;
    }

    createContainersBtnObj(targetClass, btnOptions, sectionName)
    {
        return this.createMetaBtnObj(targetClass, btnOptions, sectionName);
    }

    createMetaBtnObj(targetClass, btnOptions, sectionName, type)
    {
        var s = this;
            btnOptions = s.validateBtnOptions(btnOptions, sectionName);
        var btn = {
                placement: {
                    meta: false,
                    /*form: true,*/
                },
                collapseContainer: {
                    selector: false,
                    collapsed: true,
                    parent: false,
                    sectionName: false
                },
                input: {
                    show: true,
                    editable: true,
                    type: 'button',
                    dataAttributes: {toggle: 'collapse', target: s.sM.valClassSelector(targetClass)},
                    className: 'btn btn-default btn-sm',
                    /*className: 'btn btn-default btn-sm collapse_flag',*/
                    icon: 'chevron-down',
                    title: targetClass
                }
            };

        this.setBtnOptions(btn, btnOptions);
        btn.collapseContainer.selector = s.findContainer(btn.collapseContainer.selector, {sectionName: btn.collapseContainer.sectionName});

        if (btn.collapseContainer.parent !== false) {
            btn.collapseContainer.parent = s.findContainer(btn.collapseContainer.parent);
        }

        if (type === 'forms') {
            btn.collapseContainer.parent = s.findContainer(btn.collapseContainer.parent, {sectionName: sectionName});
        }

        return btn;
    }

    findContainer(container, options)
    {
        var s = this;
        var defaults = {sectionName: false};
        var settings = $.extend(defaults, options);
        var metaBtn = s.metaBtns.objects[container];
        var sectionName = settings.sectionName;

        //for containerBtns, lets you override the default of page.containrs by specficing collapseContainer
        if (container !== false && s.page.containers[sectionName] && container !== sectionName) {
            return container;
        } else if ((container === false && typeof s.page.containers[sectionName] === 'object') || (container && container === sectionName)) {
            //for containerObjects, if a collapseContainer isn't specified, it defaults to the container specified in page.containers for the section
            return s.page.containers[sectionName].attributes.id;
        } else if (typeof s.page.containers[sectionName] === 'object') {
            return s.page.containers[container].attributes.id;
        } else if (typeof metaBtn !== 'undefined' && typeof metaBtn.input.collapseContainer !== 'undefined') {
            //you can specify a meta container button and make the parent container its collapse container
            return s.metaBtns.objects[container].input.collapseContainer;
        } else if (typeof s.page.containers[container] === 'object' && typeof s.page.containers[sectionName] === 'undefined') {
            //for form buttons in the case that the section name isn't in the page.containers object but the parentContainer defines an element in the page.containers object
            return s.page.containers[container].attributes.id;
        }

        return container;
    }

    getContainer(container)
    {
        var finalContainer = $(container);

        if (finalContainer.length > 0) {
            return finalContainer;
        }

        finalContainer = $(this.sM.valClassSelector(container));

        if (finalContainer.length > 0) {
            return finalContainer;
        }

        finalContainer = getByID(container);
        if (finalContainer.length > 0) {
            return finalContainer;
        }

        return finalContainer;
    }

    getMetaBtnsObjects()
    {
        return this.metaBtns.objects;
    }

    applyToggleClassesToCollapseContainers(initialized, formBtns, btns, options)
    {
        if (initialized || !formBtns) return false;

        let s = this;

        let defaults = {formIDs: false};
        let settings = $.extend(defaults, options);

        let formIDs = (Array.isArray(settings.formIDs)) ? settings.formIDs.join() : settings.formIDs;

        btns = Object.entries(btns.objects);

        new Map(btns).forEach(function(btn, btnName/*, btns*/) {
            var classes  = 'collapse ';
                classes += (btn.collapseContainer.collapsed === false) ? 'in on ' : ' ';
            var collapseContainer = btn.collapseContainer.selector;
            var collapseContainers;
            var parentContainer;

            //if collapseContainer is empty, we know the user has added the btnName to the collapseContainer already
            if (typeof collapseContainer !== 'string') {
                collapseContainer = btnName;
            } else {
                classes += btnName + ' ';
            }

            if (formIDs) {
                parentContainer = getByID(formIDs);
                collapseContainers = $(parentContainer).find(collapseContainer);
            } else if (btn.collapseContainer.parent) {
                parentContainer = s.getContainer(btn.collapseContainer.parent);

                if (parentContainer.length > 0) {
                    collapseContainers = $(parentContainer).find(collapseContainer);
                } else {
                    collapseContainers = s.getContainer(btn.collapseContainer.selector);
                }
            } else if (btn.collapseContainer.selector) {
                collapseContainers = s.getContainer(btn.collapseContainer.selector);
            }

            collapseContainers.addClass(classes);
        });
    }

    getMetaBtnsStr()
    {
        if (this.metaBtns && this.metaBtns.htmlStr) {
            return this.metaBtns.htmlStr;
        }

        return false;
    }

    getFormBtnsStr(formType)
    {
        if (this.formBtns !== false && this.formBtns[formType] && this.formBtns[formType].htmlStr) {
            return this.formBtns[formType].htmlStr;
        }

        return false;
    }

    setFormBtnsEventListeners()
    {
    }

    addLeadingZeroToDigit(num)
    {
        return (String(num).length == 1) ? '0' + String(num) : num;
    }

    createFillNumericalArray(size)
    {
        var arr = [];

        for (var i=0; i<size; i++) {
            arr[i] = i+1;
        }

        return arr;
    }

    validateBtnOptions(btnOptions, sectionName)
    {
        if (typeof btnOptions === 'object') {
            btnOptions.sectionName = sectionName;
        } else {
            btnOptions = {sectionName: sectionName};
        }

        return btnOptions;
    }

    setBtnOptions(btnDefaults, btnOptions)
    {
        var s = this;
        var propNames = new Map([['selector', 'collapseContainer'], ['collapsed', 'containerCollapsed'], ['parent', 'parentContainer']]);

        $.each(btnDefaults, function(part, partAttributes) {

            var propName = propNames.get(part);
            var configFilePropName = propName || part;

            if (typeof partAttributes === 'object') {
                s.setBtnOptions(partAttributes, btnOptions);
            } else if (typeof btnOptions[configFilePropName] !== 'undefined') {
                btnDefaults[part] = btnOptions[configFilePropName];
            }
        });
    }

    getInitialBtns(options, container)
    {
        return Object.assign({objects: {}, htmlStr: '', container: ''}, options, {container});
    }
};
