import ImageList from './ImageList';
import Image from './Image';

export default class Uploader
{
  constructor($wrapper){
    this.$wrapper = $wrapper;
    this.$progressWrapper = $wrapper.find(".progress");
    this.$progressBar = this.$progressWrapper.find(".progress-bar")
    this.imageList = new ImageList(this.$wrapper);
    this.maxCountMessage = this.$wrapper.attr('data-max-count-message');
  }

  getImageList(){
    return this.imageList;
  }

  getServerImages(){
    const images = [];
    this.$wrapper.find('.server-images').each((key, elem) => {
      const image = new Image($(elem).val());
      images.push(image);
    });

    return images;
  }

  updateProgress(percentValue){
    this.$progressBar.css('width', percentValue + "%");
  }

  displayImageCountError(files){
    var $div = this.$wrapper.find('.image-error');
    if($div.length == 0){
      $div = $(`
<div class="image-error alert alert-danger" role="alert">
</div>
      `).appendTo(this.$wrapper);
    }

    if(files.length == 0){
      $div.remove();
    } else {
      $div.html(`
        ${this.maxCountMessage.split('%MaxCount%').join(this.imageList.maxCount)}
        <ul class="file-list"></ul>
      `);

      const $ul = $div.find('.file-list');
      files.forEach(name => {
        $ul.append(`<li>${name}</li>`);
      });
    }
  }

  showProgress(){
    clearTimeout(this.progressHideTimeout);
    this.$progressWrapper.fadeTo(200, 1);
  }

  hideProgress(){
    this.progressHideTimeout = setTimeout(() => this.$progressWrapper.fadeTo(300, 0), 800);
  }
}
