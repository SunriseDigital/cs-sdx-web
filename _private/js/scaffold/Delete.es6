$(() => {
  var deleteMessage = $('input[type=hidden][name=DeleteMessage]').val();
  $(".sdx-scaffold-list .btn.delete").on('click', (e, elem) => {
    var item = $(e.target).closest('.list-row');

    if(confirm(deleteMessage)){
      var pkeyValues = item.find("input[type=hidden][name=pkeys]").val();
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