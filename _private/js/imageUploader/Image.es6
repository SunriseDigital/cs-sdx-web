export default class Image
{
  constructor(path){
    this.path = path;
  }

  createElement(imageList){
    const $img = $('<img />').attr("src", this.path);
    if(imageList.thumbWidth){
      $img.css("width", imageList.thumbWidth+"px");
    }

    const $li = $(`
<li class="image thumbnail pull-left">
  <div class="header clearfix">
    <button class="delete btn btn-danger btn-xs pull-right">${imageList.deleteLabel}</button>
  </div>
  <input type="hidden" value="${this.path}" name="${imageList.submitName}">
</li>
    `).append($img);

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
