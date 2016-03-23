(($) => {
  $.extend({
    sdxMoveTo: function(elem, target, options)
    {
      var dummy = elem.clone().appendTo(elem.parent());
      dummy
        .outerWidth(elem.outerWidth())
        .css({
          position: 'absolute'
        })
        .offset(elem.offset())
        ;

      //trをabsolueにすると子要素の幅を失うので
      if(elem.is('tr')){
        var children = elem.children();
        dummy.children().each(function(key, child){
          $(child).outerWidth(children.eq(key).outerWidth());
        });
      }
      
      // elem.data('swapDummy', dummy);
      
      (options.onCreateDummy||$.noop)(elem, dummy);
      
      elem.css({visibility: 'hidden'});
      dummy.animate( {top: target.position().top}, {
        duration: options.duration,
        complete: function(){
          dummy.remove();
          elem.css({visibility: 'visible'});
          options.onComplete(elem);
        }
      });
    }
  });
  $.extend({
    sdxSwapAnimation: function(elem1, elem2, options){

      if(elem1.length < 1 || elem2.length < 1)
      {
        return;
      }
      
      var end = [];
      var _allComplete = function()
      {
        end.push(true);
        if(end.length == 2)
        {         
          (options.onComplete||$.noop)();
        }
      }
      
      $.sdxMoveTo(elem1, elem2, {
        onComplete: function(){
          _allComplete();
        },
        onCreateDummy: (options.onCreateDummy||$.noop),
        duration: (options.duration||300)
      });
      $.sdxMoveTo(elem2, elem1, {
        onComplete: function(){ 
          _allComplete();
        },
        onCreateDummy: (options.onCreateDummy||$.noop),
        duration: (options.duration||300)
      });
      
      (options.onStarted||$.noop)();
    }
  });
})(jQuery);