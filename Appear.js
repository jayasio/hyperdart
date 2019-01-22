var component = document.querySelector('#component');

function adder() {
  var temp = document.getElementById("component");
  var docfr = document.importNode(temp.content, true);
  var clon = docfr.querySelector('.divr').cloneNode(true);
  var d = new Date();
  clon.id = d.getTime();
  console.log(clon.id + "added");
  component.parentNode.appendChild(clon);
  setTimeout(function() {
    removeElement(clon.id);
  }, 5000);
}

function removeElement(elementId) {
  console.log(elementId + "removed");
  var element = document.getElementById(elementId);
  element.parentNode.removeChild(element);
}