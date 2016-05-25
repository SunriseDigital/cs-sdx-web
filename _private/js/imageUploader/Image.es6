export default class Image
{
  constructor(path){
    this.path = path;
  }

  /**
   * 画像用LIエレメントの生成。リストにappendはされませんので注意。
   * @param  {[type]} imageList 各種データを取得。削除処理に使用。appendはしません。
   * @return {[type]}           [description]
   */
  createElement(imageList){
    const $img = $('<img />').attr("src", this.path);
    $img.css({
      display: "block",
      width: "auto",
      height: "auto",
      margin: "auto"
    });

    //画像のサイズをヘッダーに挿入
    $img.on('load', e => {
      var size = {width: e.currentTarget.naturalWidth, height: e.currentTarget.naturalHeight}
      var $wrapper = $(e.currentTarget).closest('.image');
      $wrapper.find('.header .title').text(`${size.width} x ${size.height}`);
    });

    //規定サイズより小さいとき真ん中に配置するためにラッパーで包みます。
    //imgをブロックにし、width/height/marginをautoに設定。サイズはmax系で指定する。
    //回りを規定サイズのラッパーで包むと真ん中に固定可能です。
    const $imgWrapper = $('<div class="body" />');
    $imgWrapper.append($img);

    if(imageList.thumbWidth){
      $img.css("max-width", imageList.thumbWidth+"px");
      $imgWrapper.css("width", imageList.thumbWidth+"px");
    }

    if(imageList.thumbHeight){
      $img.css("max-height", imageList.thumbHeight+"px");
      $imgWrapper.css("height", imageList.thumbHeight+"px");
    }

    //テンプレ（es6のヒアドキュメント便利）
    const $li = $(`
<li class="image thumbnail pull-left">
  <div class="header row">
    <div class="col-xs-3">&nbsp;</div>
    <div class="col-xs-6 title"></div>
    <div class="col-xs-3">
      <button class="delete btn btn-danger btn-xs">${imageList.deleteLabel}</button>
    </div>
  </div>
  <input type="hidden" value="${this.path}" name="${imageList.submitName}">
  <a href="${this.path}" class="holder"></a>
</li>
    `);

    //colorbox
    const $cbElem =   $li.find(".holder");
    $cbElem
      .append($imgWrapper)
      .colorbox({
        maxWidth: '95%',
        maxHeight: '95%',
        onOpen: setting => {
          $cbElem.colorbox({title: $cbElem.closest('.image').find('.header .title').text()});
        }
      });

    //削除ボタン
    $li.find('.delete').on('click', e => {
      e.preventDefault();
      const $li = $(e.currentTarget).closest('.image');
      $li.remove();
      imageList.removeCount();
      return false;
    });

    return $li;
  }
}
