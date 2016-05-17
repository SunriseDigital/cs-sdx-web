export default class Image
{
  constructor(path){
    this.path = path;
  }

  createElement(imageList){
    const $img = $('<img />').attr("src", this.path);
    $img.css({
      display: "block",
      width: "auto",
      height: "auto",
      margin: "auto"
    });

    const $imgWrapper = $('<div />');
    $imgWrapper.append($img);

    if(imageList.thumbWidth){
      $img.css("max-width", imageList.thumbWidth+"px");
      $imgWrapper.css("width", imageList.thumbWidth+"px");
    }

    if(imageList.thumbHeight){
      $img.css("max-height", imageList.thumbHeight+"px");
      $imgWrapper.css("height", imageList.thumbHeight+"px");
    }

    const $li = $(`
<li class="image thumbnail pull-left">
  <div class="header clearfix">
    <button class="delete btn btn-danger btn-xs pull-right">${imageList.deleteLabel}</button>
  </div>
  <input type="hidden" value="${this.path}" name="${imageList.submitName}">
</li>
    `).append($imgWrapper);

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
