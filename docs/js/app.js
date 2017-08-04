(function(D) {
  var $ = D, $1 = D1, page = 0, $body = $('body'), $left = $1('#left'), $right = $1('#right'), $btns = [$left, $right];

  var actions = {
    2: function() {
      $.hide($left);
      $.css($right, { width : 308, bottom: 45, right: 32 });
    }, 
    3: function() {
      _.go($left, $.show, $.css({ left: 35 }));
      _.go($btns, $.css({ bottom: 77, height: 86, width: 145, borderRadius: 18 }))
    }
  };

  var click_event = function() {
    if (page < 12) {
      $.css($body, { backgroundImage : _.s('n', 'url(img/img_{{n}}.png)')(++page) });
      _.isFunction(actions[page]) && actions[page](); 
    }
  };

  _.go(
    $body,
    $.css('background-image', _.s('n', 'url(img/img_{{n}}.png)')(++page)),
    $.on('click', '.btn#left', __(click_event)),
    $.on('click', '.btn#right', __(click_event))
  );
})(window.D)
