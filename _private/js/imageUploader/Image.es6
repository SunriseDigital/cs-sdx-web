export default class Image
{
  constructor(path){
    this.path = path;
  }

  createElement(thumbWidth, deleteLabel, submitName){
    const $img = $('<img />').attr("src", this.path);
    if(thumbWidth){
      $img.css("width", thumbWidth+"px");
    }

    const $li = $(`
<li class="image thumbnail pull-left">
  <div class="header clearfix">
    <button class="btn btn-danger btn-xs pull-right">${deleteLabel}</button>
  </div>
  <input type="hidden" value="${this.path}" name="${submitName}">
</li>
    `).append($img);

    return $li;
  }
}
