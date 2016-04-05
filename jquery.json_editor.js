(function($){
  $.widget("ui.json_editor", {
    options: {
      search: false
    },
    _create: function(){
      var $$ = this,
          o = $$.options,
          v = $$.element.val(),
          trigger = true;
      $$.h = parseInt($$.element.css("height"));
      if ( !($$.h > 50) ){
        $$.h = 400;
      }
      $$.element.addClass($$.widgetFullName).wrap('<div></div>');
      $$.container = $$.element.parent();
      $$.editor_options = {
        mode: $$.element.is('[readonly]') || $$.element.is(':disabled') ? "view" : "tree",
        change: function(){
          trigger = false,
          $$.element.val(JSON.stringify($$.editor.get())).trigger("change");
        },
        name: "Objet de configuration"
      };
      if ( !$$.element.is('[readonly]') && !$$.element.is(':disabled') ){
        $$.editor_options.modes = ["tree", "text"];
      }
      $$._make();
      if ( v ){
        $$.editor.set(JSON.parse(v));
      }
      $$.element.on("change", function(){
        if ( trigger ){
          $$.editor.set(JSON.parse($$.element.val()));
        }
        else{
          trigger = true;
        }
      });
    },
    _make: function(){
      var $$ = this;
      $$.container.prepend('<div></div>');
      $$.editor_container = $$.container.children("div").height($$.h);
      $$.editor = new JSONEditor($$.editor_container.get(0), $$.editor_options);
    },
    enable: function(a){
      var $$ = this,
          v = $$.editor.get(),
          newMode = a ? "tree" : "view";
      if ( newMode !== $$.editor_options.mode ){
        $$.container.children("div:first").remove()
        $$.editor_options.mode = newMode;
        $$._make();
      }
      /*
      this.set('readOnly', a ? true : false);
      if ( a ){
        this.element.removeAttr("disabled");
      }
      else{
        this.element.prop("disabled", true);
      }
      */
    }
  });
  $.extend($.ui.json_editor, {
    version: "0.2"
  });
})(jQuery);
