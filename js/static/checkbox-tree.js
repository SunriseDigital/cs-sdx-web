/**
 * 階層化されたチェックボックスで親子関係でチェックを入れたり外したりする
 * 親に`checkbox-tree`のクラスを付与し、data-checkbox-tree-groupで子供のセレクタをセットしておく。
 *
 * <input class="checkbox-tree" type="checkbox" name="pref" data-checkbox-tree-group=".pref_1"> 東京
 *   <input class="checkbox-tree pref_1" type="checkbox" name="pref" data-checkbox-tree-group=".ac_1"> 新宿
 *     <input type="checkbox" value="1" name="area" class="pref_1 ac_1">歌舞伎町
 */
$(function(){
  //子供の状態をチェックして自分の状態を変更する関数
  function changeSelfWithChildrenState($elem){
    //チェックが入る前に親のチェックが走ってしまうのでsetTimeout
    setTimeout(function(){
        $elem.prop("checked", $.makeArray($elem.data('$childCheckboxies')).every(child => $(child).prop("checked")));
    }, 0);
  }

  $(".checkbox-tree").each(function(){
    var $checkbox = $(this);
    var $children = $($checkbox.attr("data-checkbox-tree-group"));
    //子供が変更された時に、一つずつ順番に親を辿って子供をチェックし自分の状態を変えないと、チェックが入らない可能性があるので、
    //それぞれに親と子、そして子供の状態を見て自分の状態を変更する関数を保持しておく。
    $checkbox.data('$childCheckboxies', $children);
    $checkbox.data('checkChildren', function(){
      changeSelfWithChildrenState($checkbox);
    });
    $children.each(function(){
      var $elem = $(this);
      $elem.data('$parentCheckbox', $checkbox);
      //2度セットされる可能性があるけど上書きだからいいかな？
      $elem.data('checkChildren', function(){
        changeSelfWithChildrenState($elem);
      });
    })

    //親が変更された時は単純に子供の状態を合わせる
    $checkbox.on('change', function(){
      $children.prop("checked", $checkbox.prop("checked"));
    });

    //子供が変更されたときは一つずつ順番に親を辿って子供をチェックする
    $children.on('change', function(){
      var $target = $checkbox;
      while($target){
        $target.data('checkChildren')();
        $target = $target.data('$parentCheckbox');
      }
    });
  })
})
