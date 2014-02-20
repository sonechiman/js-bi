$(function() {
  var isLoaded = false;

  var setText = function($el) {
    var $nameSpan = $el.parents('.dropdown').find('.name');
    $nameSpan.text($el.text());
  };

  var getNextOptions = function($el) {
    if ($el) {
      var $previous = $el.parents('.dropdown').prevAll();
      return $previous.map(function() {
        return $(this).find('.name').text();
      }).get().reverse().concat([$el.text()]);
    } else {
      return $('.name').map(function() {
        return $(this).text();
      }).get();
    }
  };

  var setNextOptions = function($el, options) {
    $el.empty();
    for (var i in options) {
      var option = options[i];
      var $optionEl = $('<li />').attr('role', 'presentation');
      var $link = $('<a />').attr({
        tabindex: -1,
        role: 'menuitem',
        href: '#'
      }).text(option);
      $optionEl.append($link);
      $el.append($optionEl);
    }
  };

  var drawGraph = function() {
    $('#sigma-container').empty();
    var path = getNextOptions().join('/');
    sigma.parsers.gexf(
     '/data/' + path, {
      container: 'sigma-container',
      settings: {
        defaultLabelColor: '#fff',
        sideMargin: 1
        }
    },
    function(s) {

      document.getElementById('toggle-layout').addEventListener('click', function() {
        if ((s.forceatlas2 || {}).isRunning) {
          s.stopForceAtlas2();
          document.getElementById('toggle-layout').innerHTML = 'Start layout';
        } else {
          s.startForceAtlas2();
          document.getElementById('toggle-layout').innerHTML = 'Stop layout';
        }
      });
      document.getElementById('restart-camera').addEventListener('click', function() {
        s.cameras[0].goTo({
          x: 0,
          y: 0,
          angle: 0,
          ratio: 1
        });
      });
    });
  };

  $('.nav').on('click', '.dropdown-menu > li > a', function(e) {
    var $el = $(this);
    setText($el);
    var options = getNextOptions($el);
    var $next = $el.parents('.dropdown').next().find('.dropdown-menu');
    $.get('/options', {'vals[]': options }, function(data) {
      setNextOptions($next, data);
    });
    if (isLoaded) {
      drawGraph();
    }
  });

  $('#page-dropdown').on('click', 'li > a', function(e) {
    isLoaded = true;
    $(this).off();
  });
});

