(function(){
  $.fn.sdxAjaxForm = function(options){
    return this.each(function(){
      var $wrapper = $(this);
      var $submit = $wrapper.find('.sdx-ajax-form-submit');
      var $elements = $wrapper.find('.sdx-ajax-form-elem');
      var ajaxUrl =  $wrapper.attr("data-sdx-ajax-form-url");

      function sendRequest(url){
        var ajaxOption = {
          method: 'GET'
        }
        if(url){
          ajaxOption.url = url;
        } else {
          ajaxOption.url = ajaxUrl;
          ajaxOption.data = $elements.serializeArray();
        }

        options.jqXHR($.ajax(ajaxOption), $wrapper, sendRequest);
      }

      if(!options.preventInitalRequest){
        sendRequest();
      }

      $submit.on('click', function(e){
        e.preventDefault();
        sendRequest();
        return false;
      });
    });
  }
})()
