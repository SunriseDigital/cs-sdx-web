export default class ImageList
{
  constructor($inputElem){
    this.$wrapper = $inputElem.closest(".sdx-image-uploader").find(".images");
    this.currentCount = this.$wrapper.find('.image').length;
    this.maxCount = $inputElem.attr('data-max-count');
    this.thumbWidth = $inputElem.attr('data-thumb-width');
  }

  removeExtraFile(files){
    while(files.length > this.maxCount - this.currentCount){
      files.pop();
    }
  }

  reserveCount(files){
    this.currentCount += files.length;
  }

  addImage(image){
    const $img = image.createElement(this.thumbWidth);
    $('<li />').addClass("image").append($img).appendTo(this.$wrapper);
  }
}
