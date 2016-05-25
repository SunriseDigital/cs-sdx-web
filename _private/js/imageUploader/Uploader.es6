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
    this.unknownErrorMessage = this.$wrapper.attr('data-unknown-error-message');
    this.maxRequestLengthMessage = this.$wrapper.attr('data-max-request-length-message');
    this.maxRequestLength = this.$wrapper.attr('data-max-request-length');
    this.$errors = this.$wrapper.find('.errors');
    this.$countErrors = this.$wrapper.find('.count-errors');
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
    if(files.length > 0){
      if(this.$countErrors.children().length === 0){
        this.$countErrors.append(`<li>${this.maxCountMessage.split('%MaxCount%').join(this.imageList.maxCount)}</li>`);
      }

      files.forEach(fileName => this.$countErrors.append(`<li class="files">${fileName}</li>`));
    }
  }

  displayError(message){
    this.$errors.append(`<li>${message}</li>`);
  }

  clearErrors(){
    this.$errors.children().remove();
    this.$countErrors.children().remove();
  }

  showProgress(){
    clearTimeout(this.progressHideTimeout);
    this.$progressWrapper.fadeTo(200, 1);
  }

  hideProgress(){
    this.progressHideTimeout = setTimeout(() => this.$progressWrapper.fadeTo(300, 0), 800);
  }

  getUnknownErrorMessage(){
    return this.unknownErrorMessage;
  }

  getMaxRequestLengthMessage(){
    return this.maxRequestLengthMessage;
  }

  getMaxRequestLength(){
    return this.maxRequestLength;
  }
}
