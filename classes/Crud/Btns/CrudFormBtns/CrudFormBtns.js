class CrudFormBtns
{
    constructor(options)
    {
        Object.assign(this, {
            btnColClass: 'col_btns_00',
            btnsContainerObj: {className: 'form-group buttonCol'},
            crudBtnsClass: 'crud_btn',
            crudBtnsContainerID: options.page.containers.fetch.attributes.id,
            icons: {delete: 'trash-o', cut: 'trash-o', update: 'arrow-down'},
            defaultUpdateFormBtns: this.getDefaultUpdateFormBtns(),
            defaultAddFormBtns: this.getDefaultAddFormBtns(options.p.module.singular)
        }, options);
    }

    initFormBtns()
    {
        let s = this;
        let objects = s.page.objects;
        let classes = s.page.classes;
        let forms = s.page.forms.standardForms;

        $.each(forms, function(formType, formAttrObj) {
            var currFormTypeBtnsStr = '';

            if (formAttrObj.btns) {

                if (Array.isArray(formAttrObj.btns.names)) {
                    formAttrObj.btns.names = {crud: formAttrObj.btns.names};
                }

                var formBtnsAttributesObj = formAttrObj.btns.attributes;

                $.each(formAttrObj.btns.names, function(className, btnNames) {
                    var currObjFormBtnsObj = '';
                    var currObjFormBtnsStr = '';

                    if (className === 'crud') {
                        currObjFormBtnsObj = s.createFormBtnsObj(formType, btnNames);
                        formBtnsAttributesObj = $.extend(true, formBtnsAttributesObj, currObjFormBtnsObj);
                        currObjFormBtnsStr = s.createBtnsStr(formBtnsAttributesObj);
                        s.setFormBtnsEventListeners(s.page.containers[formType].attributes.id);
                    } else {
                        var instance = objects[classes[btnNames.iName].name].o;

                        instance = (typeof instance === 'undefined') ? objects[btnNames.iNames] : instance;
                        currObjFormBtnsStr = instance.getFormBtnsStr(formType, true);
                        instance.setFormBtnsEventListeners();
                    }

                    currFormTypeBtnsStr += (currObjFormBtnsStr === false) ? '' : currObjFormBtnsStr;
                });

                forms[formType].btns.htmlStr = currFormTypeBtnsStr;
            }
        });
    }

    createFormBtnsObj(formType, btnNames)
    {
        var s = this;
        var createBtnsObjFuncName = 'create' + s.sM.ucWords(formType) + 'FormBtnsObj';

        return s[createBtnsObjFuncName](btnNames);
    }

    createBtnsStr(btns)
    {
        btns = (btns === 'add') ? this.addFormBtnsObj : (btns === 'update') ? this.updateFormBtnsObj : btns;

        return this.crudBtnsHTML.createBtnStr(btns);
    }

    createBtnsStrInCol(btns, btnsContainerObj)
    {
        btns = (btns === 'add') ? this.addFormBtnsObj : (btns === 'update') ? this.updateFormBtnsObj : btns;

        btnsContainerObj = btnsContainerObj ? btnsContainerObj : this.btnsContainerObj;

        return this.crudBtnsHTML.createBtnsStrInCol(btns, btnsContainerObj);
    }

    setFormBtnsEventListeners(container, btnsClass, pageObject)
    {
        let s = this;

        container = container ? s.sM.getByID(container) : s.sM.getByID(this.crudBtnsContainerID);
        btnsClass = btnsClass ? s.sM.valClassSelector(btnsClass) : s.sM.valClassSelector(this.crudBtnsClass);
        pageObject = pageObject ? pageObject : this.pageObject;

        s.eLM.setEventListeners(pageObject, container, {
            selector: btnsClass,
            callbacks: [s.setProcFromBtn]
        });
    }

    setProcFromBtn(event)
    {
        if (typeof event.data.form === 'object') {
            event.data.form.dataset.crudProc = event.data.btn.dataset.crudProc;
        } else {
            event.data.btn.parentElement.dataset.crudProc = event.data.btn.dataset.crudProc;
        }
    }

    getFormsBtnNames(btnNames)
    {
        var finalBtnNames = {};

        if (typeof btnNames === 'object') {
            return btnNames;
        } else if (typeof btnNames === 'string') {
            finalBtnNames.addFormBtnNames = [btnNames];
            finalBtnNames.updateFormBtnNames = [btnNames];
        } else if (Array.isArray(btnNames)) {
            finalBtnNames.addFormBtnNames = btnNames;
            finalBtnNames.updateFormBtnNames = btnNames;
        }

        return finalBtnNames;
    }

    createAddFormBtnsObj(btnNames)
    {
        let s = this;

        btnNames.forEach(function(val){
            if (typeof s.defaultAddFormBtns[val] === 'undefined')
            {
                s.defaultAddFormBtns[val] = s.createBtn(val, val);
            }
        });

        return s.defaultAddFormBtns;
    }

    createUpdateFormBtnsObj(btnNames)
    {
        var s = this;
        var finalBtns = {};

        for (var index=0; index<btnNames.length; index++) {
            if (typeof btnNames[index] === 'string') {
                finalBtns[btnNames[index]] = s.defaultUpdateFormBtns[btnNames[index]];
            } else if (typeof btnNames[index] === 'object') {
                //s.createBtn(s.btns[index]);
            }
        }

        return finalBtns;
    }

    //this functio is not completed or tested and currently does not work :: 20170824-1259-JSG ::
    createBtn(btnName, icon, options)
    {
        let s = this;

        let defaults = {
                    show: true,
                    editable: true,
                    type: 'button', /*submit*/
                    className: 'btn btn-default btn-sm ' + this.btnColClass, /*crud_btn*/
                    title: s.sM.ucWords(btnName + ' Field')
                };
        let settings = $.extend(defaults, options);

        let show = settings.show;
        let editable = settings.editable;
        let type = settings.type;
        let className = settings.className;
        let title = settings.title;
            icon = s.icons[icon];

        let btn =
        {
            input: {
                show: show,
                editable: editable,
                type: type,
                dataAttributes: {'crud-proc': btnName},
                className: className,
                icon: icon,
                title: title
            }
        };

        return btn;
    }

    getDefaultAddFormBtns(module)
    {
        var btns = {
            add: {
                input: {
                    show: true,
                    editable: true,
                    type:'submit',
                    dataAttributes: {'crud-proc': 'add'},
                    className: 'btn btn-default crud_btn btn-sm col_btns_00',
                    icon: 'plus',
                    title: 'Add ' + module

                }
            }
        };

        return btns;
    }

    getDefaultUpdateFormBtns()
    {
        var btns = {
            update: {
                input: {
                    show: true,
                    editable: true,
                    type: 'submit',
                    dataAttributes: {'crud-proc': 'update'},
                    className: 'btn btn-default crud_btn btn-sm col_btns_00',
                    icon: 'arrow-down',
                    title: 'Update Field'
                }
            },
            delete: {
                input: {
                    show: true,
                    editable: true,
                    type: 'submit',
                    dataAttributes: {'crud-proc': 'delete'},
                    className: 'btn btn-default crud_btn btn-sm col_btns_00',
                    icon: 'trash-o',
                    title: 'Delete Field'
                }
            },
            update_order: {
                input: {
                    show: true,
                    editable: true,
                    dataAttributes: {'crud-proc': 'update_order'},
                    type: 'button',
                    className: 'btn btn-default btn-sm col_btns_00',
                    icon: 'arrows',
                    title: 'Update Order of this List'
                }
            }
        };

        return btns;
    }

    removeButtons(rows, options)
    {
        //var defaults = {btnName: 'delete', btnPlaceholder: '<div class="btn_placeholder"></div>'};
        var defaults = {btnName: ['delete'], btnPlaceholder: '<div class="btn_placeholder delete_placeholder"></div>'};
        var settings = $.extend(true, defaults, options);

        var btnPlaceholder = settings.btnPlaceholder;
        var btnName = settings.btnName;

        if (typeof btnName === 'string') {
            btnName = [btnName];
        }

        $.each(btnName, function(index, name) {
            $.each(rows, function(pk, row) {
                if ($(row).prop('tagName') === 'FORM') {
                    $(row).find('[name="' + name + '"]').replaceWith(btnPlaceholder);
                } else if (typeof row.removable !== 'undefined' && row.removable === "0") {
                    $('#' + pk + ' [name="' + name + '"]').replaceWith(btnPlaceholder);
                }
            });
        });
    }

    addButtons(forms, btnObj, options)
    {
        var defaults = {btnName: 'delete', btnPlaceholderClass: 'delete_placeholder'};
        var settings = $.extend(defaults, options);

        var btnName = settings.btnName;
        var btnPlaceholderClass = s.sM.valClassSelector(settings.btnPlaceholderClass);
        var newBtn = createBtnStr(btnName, btnObj);

        $.each(forms, function(pk, form) {
            $(form).find(btnPlaceholderClass).replaceWith(newBtn);
        });

        //console.log('NEW BTN: ', newBtn, btnObj);
    }
};
