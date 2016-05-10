export default class Image
{
  constructor(path){
    this.path = path;
  }

  createElement(thumbWidth){
    const $img = $('<img />').attr("src", this.path);
    if(thumbWidth){
      $img.css("width", thumbWidth+"px");
    }

    return $img;
  }
}
