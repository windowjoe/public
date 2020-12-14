function loadModalHTML(page, fetchContainer, url, options)
{
    page = page.p;

    fetchContainer = getByID(fetchContainer);

    var defaults = {dataType: 'html', doFlashStatusVisuals: false};
    var settings = $.extend(defaults, options);

    var dataType = settings.dataType;
    var doFlashStatusVisuals = settings.doFlashStatusVisuals;
    var selector = settings.selector;
    var eventTrigger = settings.eventTrigger;

    var pageHTML = runCrud(page, {
        doFlashStatusVisuals: doFlashStatusVisuals,
        dataType: dataType,
        fetchContainer: fetchContainer,
        ajaxOptions: {
            url: url
        }
    });

    return pageHTML;
}

function resetModal(modal, options)
{
    modal.find('.modal-title').html('');
    modal.find('.modal-body').html('');
}