function playon(clickedId) {
  var x = document.getElementById('myAudio');
  var clicked = document.getElementById(clickedId);

  clicked.style.fill = 'red';

  x.play();
  x.onended = function() {
    clicked.style.fill = 'black';
  }
}