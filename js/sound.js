var isFree = true;
var queue = [];

var wrapFunction = function(fn, context, params) {
  return function() {
    fn.apply(context, params);
  };
}

function playon(parentId) {

  var parent = document.getElementById(parentId);
  var audio = new Audio('assets/audio/' + parentId + '.mp3');

  audio.play();
  console.log('Playing ' + parentId);
  isFree = false;

  //change clone while Playing
  const cloneOccupied = document.getElementById(parent.dataset.occupyId);
  cloneOccupied.style.width = '200px';
  cloneOccupied.style.height = '200px';
  cloneOccupied.style.background = 'green';

  audio.onended = function() {
    parent.style.fill = '';
    isFree = true;
    playNext();

    //free up parent
    parent.dataset.mode = 'unclicked';
    removeClone(parent.dataset.occupyId);
    parent.dataset.occupyId = '';
    console.log(parentId + ' is free');
  }
}

function addToPlay(parentId) {
  queue.push(wrapFunction(playon, this, [parentId]));
  console.log('Added ' + parentId + ' to queue');
  playNext();
}

function playNext() {
  if (isFree && queue.length > 0) {
    (queue.shift())();
  }
}