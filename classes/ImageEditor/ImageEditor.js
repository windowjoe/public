module.exports = class ImageEditor
{
    constructor(page, imageFieldName, options)
    {
        page = page.p;

        let s = this;

        s.publishableWidth = page.fields[imageFieldName].element.publishableSize.standard.width;
        s.formClass = valClassSelector(page.module.plural) + '_form';

        Object.assign(s, {imageClass: 'process-new-images-image',
                        editableImageClass: 'img-editor-wrong-size pointer',
                        containerClass: 'process-new-images-image-container',
                        editorBtnsCont: 'image_edit_btns',
                        toggleBtnsClass: 'btn',
                        originalsPath: IPP_SERVER_PATH + IPP_ORIGINALS_FOLDER}, options);

        s.imageClass = valClassSelector(s.imageClass);
        s.contClass = valClassSelector(s.containerClass);
        s.toggleBtnsClass = valClassSelector(s.toggleBtnsClass);
        s.editorBtnsCont = getByID(s.editorBtnsCont);
    }

   /**
     * creates the cropper and shows the editing toolbox
     * @param  object event  The object passed on when the image is clicked to start the editor
     * @return void
     */
    createImageEditor(event)
    {
        var btn = event.data.btn;
        var form = btn.closest(this.formClass);
        var image = form.find(this.imageClass);
        var imageOrigWidth =  image.prop('naturalWidth');
        var imageOrigHeight = image.prop('naturalHeight');
        var imageCurrWidth = image.width();
        
        var editorBtns = this.editorBtnsCont.clone(true, true);

        if (imageOrigWidth > this.publishableWidth) {

            var sizeRatio = imageOrigWidth / imageCurrWidth;

            var cropBoxWidth = (this.publishableWidth / sizeRatio) * 2;
            var cropBoxHeight = cropBoxWidth;

            image.cropper({
              aspectRatio: 1/1,
              viewMode: 1,
              ready: function (){
                $(this).cropper('crop').cropper('setCropBoxData', {width: cropBoxWidth, height: cropBoxHeight}).cropper('setAspectRatio', 1);
              }
            });

            image.popover({
                html: true,
                trigger: 'manual',
                placement: 'top',
                content: function(){
                    return editorBtns;
                }
            });

            image.popover('show');
        }
    }

    editImage(event)
    {
        var page = event.data.page;
        var btn = event.data.btn;
        var editorMode = btn.data('editor-mode');
        var parent = btn.closest(this.contClass);
        var image = parent.find(this.imageClass);

        switch(editorMode) {
            case 'rotate-right':
                this.rotate(image, 15);
                break;
            case 'rotate-left':
                this.rotate(image, -15);
                break;
            case 'flip-horiz':
                this.scaleImage(image, 'h');
                break;
            case 'flip-vert':
                this.scaleImage(image, 'y');
                break;
            case 'zoom-in':
                this.zoom(image, '0.1');
                break;
            case 'zoom-out':
                this.zoom(image, '-0.1');
                break;
            case 'drag':
                this.drag(image, 'move');
                break;
            case 'crop':
                this.drag(image, 'crop');
                break;
            case 'reset':
                this.reset(image);
                break;
            case 'save':
                this.saveCroppedImage(image);
                break;
            case 'done':
                this.saveCroppedImage(image, true);
                break;
            case 'exit':
                this.destroyEditor(image);
                break;
        }
    }

    rotate(image, degrees)
    {
        image.cropper('rotate', degrees);
    }

    scaleImage(image, direction)
    {
        var data = image.cropper('getData');
        var scaleX = data.scaleX;
        var scaleY = data.scaleY;

        if (direction === 'h') {
            var newScale = (scaleX == 1) ? -1 : 1;
            image.cropper('scaleX', newScale);
        } else if (direction === 'y') {
            var newScale = (scaleY == 1) ? -1 : 1;
            image.cropper('scaleY', newScale); 
        }
    }

    zoom(image, scale)
    {
        image.cropper('zoom', scale);
    }

    drag(image, mode)
    {
        image.cropper('setDragMode', mode);
    }

    reset(image)
    {
        image.cropper('reset');
    }

    saveCroppedImage(image, destroyCropper)
    {

        if (image.data('saving-image') !== true) {
            destroyCropper = (typeof destroyCropper === 'undefined') ? false : destroyCropper;
            image.data('saving-image', true);

            enableDisable('disable', {selector: this.toggleBtnsClass});

            toggleLoadingElement(image, {transparentClass: 'cropper-container'});

            var cropBoxData = image.cropper('getCropBoxData');

            var self = this;

            image.cropper('getCroppedCanvas', {width: this.publishableWidth, height: this.publishableHeight}).toBlob(function (blob) { 

                var fD = new FormData(image.parent('form'));

                fD.append('file', blob, image.attr('alt'));

                var updateImageCrudResult = runCrud(processNewImages, {
                    namesVals: fD,
                    proc: 'update',
                    updateDOM: false,
                    setRowsTo: {funcName: self.updateEditedImage.bind(self), params: {destroyCropper: destroyCropper}, rowsAlias: 'images'},
                    ajaxOptions: {
                        processData: false,
                        contentType: false
                    }
                }) 
            });
        }
    };

    updateEditedImage(destroyCropper, rows)
    {
        var imageData = rows['images'][0];
        var image = $('#img-' + imageData.OGFileNameBase);
        var form = image.closest(this.formClass);

        var newImageFullFilePath = imageData.newFileFullFilePath;
        var newImageName = imageData.newFileName;

        image.data('new-src', newImageFullFilePath);
        image.attr('data-original', newImageFullFilePath);
        image.data('saving-image', false);
        image.attr('id', 'img-' + newImageName);
        form.find('input[name="name"]').val(newImageName);

        toggleLoadingElement(image, {transparentClass: 'cropper-container'});
        enableDisable('enable', {selector: this.toggleBtnsClass});

        if (destroyCropper === true) {
            this.destroyEditor(image, this.contClass);
        }
    }

    destroyEditor(image)
    {
        var cont = image.parent(this.contClass);

        image.popover('hide');
        image.cropper('destroy');
        
        var newSrc = (typeof image.data('new-src') === 'undefined') ? false : image.data('new-src');

        if (newSrc !== false) {
            image.attr('src', newSrc);
            image.attr('alt', newSrc.replace(this.originalsPath, ''));
            cont.removeClass(this.editableImageClass);
            image.css({'padding-bottom': '', 'padding-right': ''});
        }
    }
};
