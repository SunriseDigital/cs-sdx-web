export default class ImageList
{
  constructor($globalWrapper){
    this.currentCount = 0;
    this.$wrapper = $globalWrapper.find(".images");
    this.$wrapper
      .sortable({
			  opacity: 0.8
      })
      .disableSelection();
    this.maxCount = $globalWrapper.attr('data-max-count');
    this.thumbWidth = $globalWrapper.attr('data-thumb-width');
    this.thumbHeight = $globalWrapper.attr('data-thumb-height');
    this.deleteLabel = $globalWrapper.attr('data-delete-label');
    this.submitName = $globalWrapper.attr('data-submit-name')
  }

  removeExtraFile(files){
    var removed = [];
    while(files.length > this.maxCount - this.currentCount){
      removed.push(files.pop());
    }

    return removed;
  }

  /**
   * 画像アップロード枚数を予約する。アップロードする前に制限したいので事前に予約できるようになっています。
   * @param  {[type]} count =             1 [description]
   */
  reserveCount(count = 1){
    this.currentCount += count;
  }

  removeCount(count = 1){
    this.currentCount -= count;
  }

  addImage(image){
    const $li = image.createElement(this);
    $li.appendTo(this.$wrapper);
  }

  clear(){
    var $images = this.$wrapper.children();
    this.removeCount($images.length);
    $images.remove();
  }

  cleanImageCount(){
    this.currentCount = this.$wrapper.find('.image').length;
  }
}
