var colorArray = [
  '#673AB7', '#F44336', '#4CAF50',
  '#FFC107', '#2196F3', '#607D8B',
  '#009688',
];

function clickHandler(parentId) {
  const component = document.querySelector('#component');
  const content = document.importNode(component.content, true);
  const parent = document.getElementById(parentId);
  const holder = document.querySelector('#holder');

  if (parent.dataset.mode == 'unclicked') {
    console.log(parentId + " is clicked first time");

    var num = holder.dataset.color;
    console.log(num);

    parent.style.fill = colorArray[num];

    if (num < 6) {
      num++;
      holder.dataset.color = num;
    } else {
      holder.dataset.color = '0';
    }

    parent.dataset.mode = 'oneclicked';
    addClone(num);
  } else if (parent.dataset.mode == 'oneclicked') {
    console.log(parentId + " is clicked second time");

    parent.dataset.mode = 'twoclicked';
    parent.style.fill = '#ff7900';
    twoClicker();
  }



  // fragment functions

  function addClone(num) {
    const clone = content.querySelector('.divr').cloneNode(true);
    clone.id = generateID();
    parent.dataset.occupyId = copy(clone.id);
    console.log(parent.dataset.occupyId + " is the ID");

    component.parentNode.appendChild(clone);
    console.log(clone.id + " is added");

    clone.querySelector('.imager').src = 'assets/image/' + parentId + '.jpg';
    clone.querySelector('.loader-circle').style.stroke = colorArray[num - 1];

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
    const imager = cloneOccupied.querySelector('.imager');

    cloneOccupied.style.backgroundImage = "url('assets/image/" + parentId + ".jpg')";
    loader.style.opacity = '0';
    imager.parentNode.removeChild(imager);

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