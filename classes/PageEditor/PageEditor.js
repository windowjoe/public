class PageEditor
{
    constructor(options)
    {
        Object.assign(this, options);
    }

    HTMLPageEditorSetup()
    {
        this.createFullEditor('content');

        this.createCounter('page_title', {params: {maxCount:60}});
        this.createCounter('description', {params: {maxCount: 160}});
        this.createCounter('content', {params: {maxCount: 10000, countType: 'words', countDirection: 'up'}, insertAt: 'prepend', className: 'content-counter'});
    }

    createFullEditor(field, options)
    {
        field = getByID(field);

        var defaults = {editorOptions: {codeMirror: true,
                                        toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline',
                                                         'strikeThrough', 'subscript', 'superscript',
                                                         '|', 'fontFamily', 'fontSize', 'color', 'inlineStyle',
                                                         'paragraphStyle', '|', 'paragraphFormat', 'align',
                                                         'formatOL', 'formatUL', 'outdent', 'indent',
                                                         'quote', '-', 'insertLink', 'insertImage',
                                                         'insertVideo', 'insertFile', 'insertTable', '|',
                                                         'emoticons', 'specialCharacters', 'insertHR',
                                                         'selectAll', 'clearFormatting', '|', 'print',
                                                         'spellChecker', 'help', 'html', '|', 'undo', 'redo'],
                                        charCounterCount: false
                                       },
                        overwriteDefaultEditorOptions: false
                        };


        var settings = $.extend(true, defaults, options);

        var overwriteDefaultEditorOptions = settings.overwriteDefaultEditorOptions;
        var editorOptions = (overwriteDefaultEditorOptions === false) ? settings.editorOptions : options.editorOptions;

        var editor = new FroalaEditor('#content');

        //field.prev('.fr-box').find('.fr-command').removeClass('fr-hidden');
    }

    createCounter(field, options) {

            field = getByID(field);
        var fieldID = field.attr('id');

        var defaults = {params: {counter: '#counter',
                                 countType: 'characters',
                                 maxCount: 140,
                                 strictMax: false,
                                 countDirection: 'down',
                                 safeClass: 'simply_countable_safe',
                                 overClass: 'simply_countable_over',
                                 thousandSeparator: ',',
                                 onOverCount: function(count, countable, counter){},
                                 onSafeCount: function(count, countable, counter){},
                                 onMaxCount: function(count, countable, counter){}},
                        insertAt: 'append',
                        className: ''
                        };

        let settings = $.extend(true, defaults, options);

        let params = settings.params;
        let insertAt = settings.insertAt;
        let className = 'counter ' + settings.className;

        params.counter = fieldID + '_counter';

        $('#' + fieldID).parent()[insertAt]('<span class="' + className + '" id="' + params.counter + '"></span>')
        params.counter = '#' + params.counter;
        field.simplyCountable(params);
    }
};
