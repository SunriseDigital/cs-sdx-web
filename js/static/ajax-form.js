(function(){
  $.fn.sdxAjaxForm = function(options){
    return this.each(function(){
      var $wrapper = $(this);
      var $submit = $wrapper.find('.sdx-ajax-form-submit');
      var $elements = $wrapper.find('.sdx-ajax-form-elem');
      var ajaxUrl =  $wrapper.attr("data-sdx-ajax-form-url");
      $submit.on('click', function(e){
        e.preventDefault();
        options.jqXHR($.ajax({
          url: ajaxUrl,
          data: $elements.serializeArray(),
          method: 'POST'
        }));
        return false;
      });
    });
  }
})()
