$.fn.extend({
  jumpMenu: function(){
    this.each(function(){
      var $selector = $(this);
      $selector.on("change", (e) => {
        var value = $selector.val();
        var name = $selector.attr('name');

        var exists = false;
        var queries = [];
        location.search.substr(1).split('&').forEach((keyValue) => {
          if(keyValue){
            var arr = keyValue.split('=');
            if(arr[0] == name){
              if(value) queries.push(name + '=' + value);
              exists = true;
            } else {
              queries.push(arr.join('='));
            }
          }
        });

        if(!exists && value){
          queries.push(name + '=' + value);
        }

        location.href =   location.pathname + (queries.length ? "?" + queries.join('&') : "") + location.hash;
      });
    });
  }
});