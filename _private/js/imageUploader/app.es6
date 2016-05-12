import ImageList from './ImageList';
import Image from './Image';
$(() => {
  $(".sdx-image-uploader input[type=file]").each((key, elem) => {

    const $elem = $(elem);
    const images = new ImageList($elem);

    $elem.fileupload({
      dataType: 'json',
      singleFileUploads: false,
      sequentialUploads: true,
      limitMultiFileUploadSize: 4096 * 1024,
      formData: {name: $elem.attr("name")}
    }).bind("fileuploadsubmit", function (e, data) {
      //多すぎる分を取り除く
      images.removeExtraFile(data.files);
      images.reserveCount(data.files);

      if(data.files.length == 0){
        return false;
      }
    }).bind("fileuploaddone", function (e, data) {
      $.each(data.result.files, function (index, file) {
        console.log(file);
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
    }).bind('fileuploadprogress', function (e, data) {
      var progress = parseInt(data.loaded / data.total * 100, 10);
      //console.log('fileuploadprogress', progress);
    }).bind('fileuploadprogressall', function (e, data) {
      var progress = parseInt(data.loaded / data.total * 100, 10);
      //console.log('fileuploadprogressall', progress);
    })
  });
});
