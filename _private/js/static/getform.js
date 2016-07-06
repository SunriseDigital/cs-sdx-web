$(function () {
  $('.sdx-getform .sdx-getform-submit').on("click", function (e) {
    e.preventDefault();
    location.href = location.pathname + '?' + $(this).closest(".sdx-getform").find("input, textarea, select").serialize();
    return false;
  });

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
