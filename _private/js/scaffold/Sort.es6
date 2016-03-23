import '../jquery/swapAnimation';

class Sorter
{
  constructor(listSelector){
    this.listSelector = listSelector;
  }

  //存在しなかった場合$listRowをそのまま返します。
  _findRow($list, $listRow, pos){
    var findIndex;
    $list.each((index, row) => {
      if(row === $listRow[0]){
        findIndex = index;
        return;
      }
    });

    var targetIndex = findIndex + pos;
    if(targetIndex >= 0 && targetIndex < $list.length){
      return $($list[targetIndex]);
    } else {
      return $listRow;
    }
  }

  _swap($elem1, $elem2){
    if($elem1[0] !== $elem2[0]){
      $.sdxSwapAnimation($elem1, $elem2, {
        onComplete: () => {
          var tmp = $('<li>').hide();
          $elem1.before(tmp);
          $elem2.before($elem1);
          tmp.replaceWith($elem2);
          this.changeButtonState();
        }
      });
    }
  }

  up($listRow){
    var $list = $(this.listSelector);
    var $targetRow = this._findRow($list, $listRow, -1);
    this._swap($listRow, $targetRow);
  }

  down($listRow){
    var $list = $(this.listSelector);
    var $targetRow = this._findRow($list, $listRow, 1);
    this._swap($listRow, $targetRow);
  }

  top($listRow){
    var $list = $(this.listSelector);
    var $targetRow = $list.first();
    this._swap($listRow, $targetRow);
  }

  bottom($listRow){
    var $list = $(this.listSelector);
    var $targetRow = $list.last();
    this._swap($listRow, $targetRow);
  }

  changeButtonState(){
    var $list = $(this.listSelector);
    $list.find('.btn.sort').removeClass('disabled');
    $list.first().find('.btn.sort.up').addClass('disabled');
    $list.last().find('.btn.sort.down').addClass('disabled');
  }
}

$(() => {
  var sorter = new Sorter(".list-row");
  sorter.changeButtonState();
  $('.btn.sort').on('click', function(e){
    var $btn = $(this);
    var $listRow = $btn.closest('.list-row');

    sorter[$btn.attr('data-sort-type')]($listRow);
  });
});