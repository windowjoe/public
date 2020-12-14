class BSPopovers
{
    constructor()
    {

    }

    getPopoverCustomTemplate(className, contentID) {
        let str  = '<div class="popover ' + className + '" role="tooltip">';
            str += '<div class="arrow"></div>';
            str += '<h3 class="popover-title"></h3>';
            str += '<div class="popover-content" ';
            str += (contentID !== false) ? 'id="' + contentID + '"></div>' : '></div>';
            str += '</div>';

            return str;
    }

    createPopOver(element, content, options)
    {
        var popover = element.data('bs.popover');

        if (popover) {
            popover.options.content = content;
        } else {
            var defaults = {html: true,
                            trigger: 'hover',
                            placement: 'bottom',
                            show: false,
                            popClass: 'ccPopover',
                            popContentID: false};

            var settings = $.extend(defaults, options);

            var html = settings.html;''
            var trigger = settings.trigger;
            var placement = settings.placement;
            var show = settings.show;
            var popClass = settings.popClass;
            var popContentID = settings.popContentID;
            var template = this.getPopoverCustomTemplate(popClass, popContentID);

            element.popover({
                html: html,
                trigger: trigger,
                placement: placement,
                content: function(){
                    return content;
                },
                template: template
            });

            element.popover(show);
        }
    }

    arrToSpans(arr, options) {

        var defaults = {spanClass: false};
        var settings = $.extend(defaults, options);

        var spanClass = settings.spanClass;

        var str =  '';

        $.each(arr, function(index, val) {
            str += '<span ';
            str += (spanClass !== false) ? 'class="' + spanClass + '">' : '>';
            str += val + '</span>';
        });

        return str;
    }

};