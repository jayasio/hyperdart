var isFree = true;
var queue = [];

var wrapFunction = function(fn, context, params) {
  return function() {
    fn.apply(context, params);
  };
}

function playon(clickedId) {

  var clicked = document.getElementById(clickedId);
  var audio = new Audio('assets/audio/' + clickedId + '.mp3');

  clicked.style.fill = 'red';

  audio.play();
  isFree = false;
  audio.onended = function() {
    clicked.style.fill = 'black';
    isFree = true;
    playNext();
  }
}

function addToPlay(clickedId) {
  queue.push(wrapFunction(playon, this, [clickedId]));
  console.log(queue.length);
  playNext();
}
}

function playNext() {
  if (isFree && queue.length > 0) {
    (queue.shift())();
  }
}