// hit.js
var time = 1;
var initialOffset = '1';
var i = 10; /* how long the timer will run (seconds) */
var count = 0;

/* Need initial run as interval hasn't yet occured... */
$('.circle_animation').css('stroke-dashoffset', initialOffset - (1 * (initialOffset / time)));

$(document).ready(function() {
  $('#xxx').hide();
})

$('#circle').click(function() {
  count++;
  if (count % 2 != 0) {
    $('#circle').css('animation-iteration-count', 12);

    $('#xxx').show();
    var interval = setInterval(function() {
      $('h2').text(i);
      if (i == time) {
        $('.circle_animation').css('stroke-dashoffset', 440);
        clearInterval(interval);
        return;
      }
      var x = 440 - ((i - 1) / time * 44);
      $('.circle_animation').css('stroke-dashoffset', x);
      i--;
    }, 1000);
  }

  if (count % 2 == 0) {
    i = 10;
    $('#circle').css('animation-iteration-count', 0);
    $('#xxx').hide();

  }

});