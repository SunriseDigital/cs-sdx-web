export default class ImageList
{
  constructor($inputElem){
    this.$wrapper = $inputElem.closest(".sdx-image-uploader").find(".images");
    this.currentCount = this.$wrapper.find('.image').length;
    this.maxCount = $inputElem.attr('data-max-count');
    this.thumbWidth = $inputElem.attr('data-thumb-width');
    this.deleteLabel = $inputElem.attr('data-delete-label');
    this.submitName = $inputElem.attr('data-submit-name')
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
    const $li = image.createElement(this.thumbWidth, this.deleteLabel, this.submitName);
    $li.appendTo(this.$wrapper);
  }
}
