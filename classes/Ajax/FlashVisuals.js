class FlashVisuals
{
    constructor(options)
    {
        Object.assign(this, options);
    }

    /**
     * show and hide the flash elements on process initiation
     * @param  {string} step start if the button is just clicked, any other string otherwise
     * @param  {string} submitBtnClass the class name of all buttons on the page
     * @param  {string} btn the id of the button clicked, if none, pass null
     */
    flashStatusVisuals(step, proc, options)
    {
        let s = this;
        let {
            doFlashStatusVisuals = true,
            defaultFlashContainer = $('#flash_container'),
            newFlashContainer = false,
            submitBtnClass = '.crud_btn',
            submittedForm = false,
            success = false,
            successMessage = false
        } = options;

        if (!doFlashStatusVisuals) return false;

        if (step === 'first') {
            s.switchFlashContainer(defaultFlashContainer, newFlashContainer);
            s.flashLoadingDiv();

            return true;
        }

        if (step === 'last') {
            s.enableDisable('enable'); //DO WE NEED A SUBMIT BTN CLASS?
            s.flashLoadingDiv({step: step});
            s.flashResultDiv(success, successMessage);
            s.flashResultStatusOnBtn(proc, getByID(submittedForm), success);
            s.switchFlashContainer(newFlashContainer, defaultFlashContainer);

            return true;
        }

        //logDebug.log('flashStatusVisuals - step: ' + step + ', submitBtnClass: ' + submitBtnClass);
    }

    switchFlashContainer(currContainer, newContainer, options)
    {
        if (currContainer !== false && newContainer !== false) {

            currContainer = getByID(currContainer);
            newContainer  = getByID(newContainer);

            let defaults = {resultMessageDiv: 'result_flash', flashDivsClass: 'flash'};
            let settings = $.extend(true, defaults, options);

            let resultMessageDiv = getByID(settings.resultMessageDiv);
            let flashDivsClass = valClassSelector(settings.flashDivsClass);

            resultMessageDiv.promise().done(function() {
                flashRows = currContainer.children(flashDivsClass).detach();
                newContainer.prepend(flashRows);
            });

            return true;
        } else {
            return false;
        }
    }

    flashLoadingDiv(options)
    {
        let defaults = {step: 'first', loadingDiv: $('#loading_div')};
        let settings = Object.assign(defaults, options);

        let loadingDiv = getByID(settings.loadingDiv);
        let step = settings.step;

        let currentOpacity = loadingDiv.css('opacity');

        if (currentOpacity == 0 && step === 'first') {
            loadingDiv.animate({opacity: 1});
        } else if (currentOpacity > 0) {
            loadingDiv.animate({opacity: 0});
        }
    }

    flashResultDiv(success, successMessage, options)
    {
        let defaults = {resultMessageDiv: $('#success_message_div'), successClass: 'btn-success', failureClass: 'btn-danger'};
        let settings = $.extend(true, defaults, options);

        let resultMessageDiv = getByID(settings.resultMessageDiv);
        let successClass = settings.successClass;
        let failureClass = settings.failureClass;

        let statusClass = (success === true) ? successClass : failureClass;

        resultMessageDiv
            .finish()
            .html('')
            .removeClass(successClass + ' ' + failureClass)
            .addClass(statusClass).html(successMessage).animate({opacity: 1}).animate({opacity: 0}, 4000);

        //console.log('flashResultDiv - message: ' + message + ', status: ' + status + ', statusClass: ' + statusClass + ', resultMessageDiv: ' + resultMessageDiv);
    }

    toggleLoadingElement(element, options)
    {
        element = getByID(element);

        var defaults = {containerClass: 'ajax-loading', transparentClass: false};
        var settings = $.extend(true, defaults, options);

        var containerClass = valClassSelector(settings.containerClass);
        var transparentClass = valClassSelector(settings.transparentClass);

        var parent = element.parent(containerClass);

        var transparentElement = (transparentClass === false) ? false : parent.find(transparentClass);

        if (parent.hasClass('loading-container')) {
            parent.removeClass('loading-container');
            if (transparentElement !== false) {
                transparentElement.removeClass('loading-cropper');
            }
        } else {
            parent.addClass('loading-container');
            if (transparentElement !== false) {
                transparentElement.addClass('loading-cropper');
            }
        }
    }

    flashResultStatusOnBtn(proc, submittedForm, success, options)
    {
        if (submittedForm !== false && submittedForm !== '') { //this condition prevents execution on a fetch all operation b/c a prefixID is not set b/c a form isn't submitted
            submittedForm = getByID(submittedForm);

            var defaults = {resultMessageDiv: $('#result_flash'), successClass: 'btn-success', failureClass: 'btn-danger'};
            var settings = $.extend(true, defaults, options);

            var resultMessageDiv = getByID(settings.resultMessageDiv);
            var successClass = settings.successClass;
            var failureClass = settings.failureClass;

            var statusBtn = submittedForm.find('button[name="' + proc + '"]');
            var statusClass = (success === true) ? successClass : failureClass;

            statusBtn.addClass(statusClass, 1000).blur();

            resultMessageDiv.promise().done(function() {
                statusBtn.removeClass(statusClass, 1000);
            });
        }

        //logDebug.log('flashResultStatusOnBtn - idPrefix: ' + idPrefix + ', status: ' + page.crud.status + ', statusClass: ' + statusClass + ', proc: ' + proc + ', statusBtnVal: ' + statusBtn.val());
    }

    /**
     * enable or disable a single button by id or a set of buttons based on class name
     * @param  {string} btnClass the name of the class to enable or disable OR the object to
     * disable or enable
     */
    enableDisable(eD, options)
    {
        var defaults = {selector: 'crud_btn'};
        var settings = $.extend(defaults, options);

        var selector = (settings.selector[0] === '#' || typeof selector === 'object') ? getByID(settings.selector) : $(valClassSelector(settings.selector));

        if (eD === 'disable') {
            selector.attr('disabled', true);
        } else if (eD === 'enable') {
            selector.removeAttr('disabled').removeClass('disabled');
        }

        //logDebug.log('eD - selector: ' + selector + ', eD: ' + eD);
    }

    fadeAndEmptyContainer(containers, options)
    {
        let defaults = Object.assign({fadeTime: 500}, options);
        let {fadeTime} = defaults;

            containers = Array.isArray(containers) ? containers : [containers];

/*        let data = typeof container.data;

        if (typeof container.data !== 'undefined' && typeof container.data.btn !== 'undefined') {
            container = getByID(container.data.page.containers.fetch);
        } else {
            container = getByID(container);
        }*/


        /*containers.forEach(function(container) {
            container = getByID(container);

            if (container.children().length) {
                getByID(container).children().fadeOut(fadeTime).promise().then(function() {
                    if (!containerID.indexOf('add_') === 0) {
                        container.empty();
                    }
                });
            }
        });*/
    }

    setObjectInstances(objects, instances)
    {
        let s = this;

        let objectInstances = new Map([
                        ['eLM', 'eventListeners'],
                        ['fV', 'fetchViews'],
                        ['labelsIconsMaker', 'labelsIconsHTML'],
                        ['userInputsMaker', 'userInputs'],
                        ['layouts', 'layouts'],
                        ['htmlElementsMaker', 'createHTMLElements'],
                        ['eO', 'elementObjects']
                        ]);

        if (!objectInstances) return false;

        objectInstances.forEach(function(instanceName, name) {
            s[name] = objects[instances[instanceName].name];
        });
    }
};