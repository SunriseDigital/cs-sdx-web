$(function () {
  function submit(wrapper){
    var action = wrapper.attr('data-action');
    if(!action) action = location.pathname;
    action += action.indexOf("?") === -1 ? '?' : '&';
    location.href = action + wrapper.find("input, textarea, select").serialize();
  }

  //エンターキーで外側のフォームがサブミットされるのと止める。
  $('.sdx-getform').find("input, select").on('keypress', function(e){
    if(e.which == 13) {
        e.preventDefault();
        var wrapper = $(this).closest(".sdx-getform");
        submit(wrapper);
        return false;
    }
  });

  //サブミットボタンのクリック
  $('.sdx-getform .sdx-getform-submit').on("click", function (e) {
    e.preventDefault();
    var wrapper = $(this).closest(".sdx-getform");
    submit(wrapper);
    return false;
  });

  //全てのフォームのリセット
  $('.sdx-getform .sdx-getform-reset').on('click', function (e) {
    e.preventDefault();
    var $btn = $(this);

    var execute = true;
    var confirmMsg = $btn.attr('data-confirm');
    if (confirmMsg) {
      execute = confirm(confirmMsg);
    }

    if (execute) {
      $btn.closest(".sdx-getform")
        .find("input:not([type=submit], [type=button]), textarea, select")
        .val("");
    }

    return false;
  });
});
