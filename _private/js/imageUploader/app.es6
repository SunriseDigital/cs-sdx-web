import Uploader from './Uploader';
import Image from './Image';
$(() => {
  $(".sdx-image-uploader input[type=file]").each((key, elem) => {

    const $elem = $(elem);
    const uploader = new Uploader($elem.closest(".sdx-image-uploader"));
    const images = uploader.getImageList();

    uploader.getServerImages().forEach(image => {
      images.addImage(image);
      images.reserveCount();
    });

    $elem.fileupload({
      dataType: 'json',
      singleFileUploads: false,
      sequentialUploads: true,
      limitMultiFileUploadSize: 4096 * 1024,
      formData: {name: $elem.attr("name")}
    }).bind("fileuploadchange", function (e, data) {
      uploader.showProgress();
      uploader.clearErrors();
    }).bind("fileuploadsubmit", function (e, data) {
      //一枚しかアップロードできないときは差し替え。
      if(images.maxCount == 1){
        images.clear();
      }
      //多すぎる分を取り除く
      var removed = images.removeExtraFile(data.files);
      images.reserveCount(data.files.length);

      //アップロードがキャンセルされた画像を画面に表示
      uploader.displayImageCountError(removed.map(file => file.name))

      //アップロードする画像が無かったら何もしない。
      if(data.files.length == 0){
        return false;
      }
    }).bind("fileuploaddone", function (e, data) {
      $.each(data.result.files, function (index, file) {
        if(file.error){
          images.removeCount();
          uploader.displayError(`${file.name}: ${file.error}`);
        } else {
          const image = new Image(file.path);
          images.addImage(image);
        }
      });
    }).bind("fileuploadfail", function (e, data) {
      images.cleanImageCount();
      try {
        var error = JSON.parse(data.jqXHR.responseText);
        if (error.type == "MaxRequestLength") {
          alert(error.maxLength + "KB以上はアップロードできません。");
        } else {
          throw new Error("Unknown error type " + error.type);
        }
      } catch (e) {
        alert("サーバーエラーです。")
      }
    }).bind('fileuploadprogressall', function (e, data) {
      uploader.updateProgress(data.loaded / data.total * 100);
    }).bind("fileuploadstop", function (e, data) {
      uploader.hideProgress();
    });
  });
});
