function clickHandler(parentId) {
  const component = document.querySelector('#component');
  const content = document.importNode(component.content, true);
  const parent = document.getElementById(parentId);

  if (parent.dataset.mode == 'unclicked') {
    console.log(parentId + " is clicked first time");
    parent.dataset.mode = 'oneclicked';
    parent.style.fill = 'red';
    addClone();
  } else if (parent.dataset.mode == 'oneclicked') {
    console.log(parentId + " is clicked second time");
    parent.dataset.mode = 'twoclicked';
    parent.style.fill = 'green';
    twoClicker();
  }



  // fragment functions

  function addClone() {
    const clone = content.querySelector('.divr').cloneNode(true);
    clone.id = generateID();
    parent.dataset.occupyId = copy(clone.id);
    console.log(parent.dataset.occupyId + " is the ID");

    component.parentNode.appendChild(clone);
    console.log(clone.id + " is added");

    clone.style.backgroundImage = "url('assets/image/" + parentId + ".jpg')";
    console.log(clone.style.backgroundImage);


    setTimeout(function() {
      if (parent.dataset.mode == 'oneclicked') {
        console.log(parentId + " " + clone.id + " Timeout ended");
        removeClone(clone.id);
        parent.style.fill = '';
        parent.dataset.mode = 'unclicked';
        console.log(parentId + ' is free');
      }
    }, 10000);
  }

  function twoClicker() {
    const cloneOccupied = document.getElementById(parent.dataset.occupyId);
    const loader = cloneOccupied.querySelector('.loader-circle-container');
    loader.parentNode.removeChild(loader);
    addToPlay(parentId);
  }
}

function removeClone(elementId) {
  const element = document.getElementById(elementId);
  element.parentNode.removeChild(element);
  console.log(elementId + " is removed");
}



// helper functions

function generateID() {
  const d = new Date();
  return d.getTime();
}

function copy(x) {
  return JSON.parse(JSON.stringify(x));
}