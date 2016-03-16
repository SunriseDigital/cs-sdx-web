$(() => {
  var deleteMessage = $('input[type=hidden][name=DeleteMessage]').val();
  $(".sdx-scaffold-list .btn.delete").on('click', (e, elem) => {
    var item = $(e.target).closest('.list-item');

    if(confirm(deleteMessage)){
      var pkeyValues = item.attr("data-pkeys");
      var url = location.pathname;
      if(location.search){
        url += location.search + '&delete=' + pkeyValues;
      } else {
        url += '?delete=' + pkeyValues;
      }

      url += location.hash;

      location.href = url;
    }
  });
});