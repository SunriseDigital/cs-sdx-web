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
    }).bind("fileuploadsubmit", function (e, data) {
      //多すぎる分を取り除く
      var removed = images.removeExtraFile(data.files);
      images.reserveCount(data.files.length);

      uploader.displayImageCountError(removed.map(file => file.name))

      if(data.files.length == 0){
        return false;
      }
    }).bind("fileuploaddone", function (e, data) {
      $.each(data.result.files, function (index, file) {
        const image = new Image(file.name);
        images.addImage(image);
      });
    }).bind("fileuploadfail", function (e, data) {
      try {
        var error = JSON.parse(data.jqXHR.responseText);
        if (error.type == "MaxRequestLength") {
          alert(error.maxLength + "KB以上はアップロードできません。");
        } else {
          throw "";
        }
      } catch (e) {
        alert("サーバーエラーです。")
      }
    }).bind('fileuploadprogressall', function (e, data) {
      uploader.updateProgress(data.loaded / data.total * 100);
    })
  });
});
