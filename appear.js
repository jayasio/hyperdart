var component = document.querySelector('#component');

function adder() {
  var component = document.getElementById("component");
  var content = document.importNode(component.content, true);
  var clone = content.querySelector('.divr').cloneNode(true);

  clone.id = generateID();

  component.parentNode.appendChild(clone);
  console.log(clone.id + "added");

  setTimeout(function() {
    removeElement(clone.id);
  }, 10000);
}

function removeElement(elementId) {
  var element = document.getElementById(elementId);
  element.parentNode.removeChild(element);
  console.log(elementId + "removed");
}

function generateID() {
  var d = new Date();
  return d.getTime();
}