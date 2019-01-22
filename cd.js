var countdown = 10;


setInterval(function() {
  countdown = --countdown <= 0 ? 10 : countdown;
}, 1000);

setTimeout(function() {

}, 10000);