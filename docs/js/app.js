(function(D) {
  var $ = D, $1 = D1, page = 1, $body = $('body'), $left = $1('#left'), $right = $1('#right'), $btns = [$left, $right];

  var t = { city: 0, rest: 0, purpose: 0, achieve: 0, consume: 0 };

  var a_or_b = function(a, b) {
    return function(id) {
      if (id == 'left') ++t[a];
      else ++t[b];
    }
  };

  var actions = {
    1: function() {
      $.hide($left);
      $.css($right, { width : 308, bottom: 45, right: 32 });
    }, 
    2: function() {
      _.go($left, $.show, $.css({ left: 35 }));
      _.go($btns, $.css({ bottom: 77, height: 86, width: 145, borderRadius: 18 }))
    }, 
    3: a_or_b('city', 'rest'), 
    4: a_or_b('purpose', 'rest'),
    5: a_or_b('achieve', 'rest'),
    6: a_or_b('city', 'consume'),
    7: a_or_b('consume', 'rest'),
    8: a_or_b('purpose', 'achieve'),
    9: a_or_b('achieve', 'consume'),
    10: a_or_b('purpose', 'consume'),
    11: a_or_b('city', 'purpose'),
    12: a_or_b('rest', 'city'),
  };

  var click_event = function() {
    if (page < 13) {
      _.isFunction(actions[page]) && actions[page](this.id); 
      $.css($body, { backgroundImage : _.s('n', 'url(img/img_{{n}}.png)')(++page) });
    } 
    if (page == 13) {
      if (_.every(t, function(t) { return t == 2 })) alert("당신은 숨만 쉬어도 행복한 말미잘");
      else if (t.city == 4 && t.consume < 3 && t.achieve < 3 && t.rest < 3 && t.purpose < 3) alert("당신은 차가운 도시 여우");
      else if (t.achieve + t.rest >=5 && t.consume <= 2) alert("당신은 티타임매니아 다람쥐");
      else if (t.consume == 4 && t.consume + t.purpose >= 5) alert("당신은 클러버 올빼미");
      else if (t.rest + t.consume >= 5 && t.achieve <= 2) alert("당신은 반전매력 돌고래");
      else if (t.consume + t.city >= 5) alert("당신은 주머니 열린 캥거루");
      else if (t.purpose + t.city >= 5) alert("당신은 재벌 2세 공작새");
      else if (t.achieve + t.rest >=5 ) alert("당신은 뜨거운 심장의 사슴");
      else alert("당신은 ???");
    }
  };

  _.go(
    $body,
    $.css('background-image', _.s('n', 'url(img/img_{{n}}.png)')(page)),
    $.on('click', '.btn#left', click_event),
    $.on('click', '.btn#right', click_event)
  );
})(window.D)
