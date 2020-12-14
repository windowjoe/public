class Sortables
{
    constructor(options)
    {
        Object.assign(this, options);
    }

    init()
    {
        let s = this;

        if (s.page.classes.sortables) {
            s.setSortables(s.p, s.containers.fetch.attributes.id, 'update_order');
        }
    }

    setSortables(page, container, selector)
    {
        this.setSortableContainer(container, selector);
        this.setSortableEventListeners(page, container, selector);
    }

    setSortableContainer(container, selector)
    {
        container = (typeof container === 'string') ? container : container.attr('id');

        $('#' + container).sortable({
            axis: 'y',
            cancel: 'input, select, .crud_btn',
            containment : '#' + container,
            handle: '[name="' + selector + '"]',
            items: 'form',
            tolerance: 'pointer',
            revert: true,
            stop: function(event, ui) {}
        });
    }

    setSortableEventListeners(page, container, selector)
    {
        let s = this;

        s.eLM.setEventListeners(page, container, {
            selector: null,
            eventTrigger: 'sortstop',
            uiHandle: selector,
            removeEventTrigger: true,
            callbacks: [s.sVF.processSuccess, {preventDefault: false}]
        });
    }
};
