var colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'
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

    if (num < 49) {
      num++;
      holder.dataset.color = num;
    } else {
      holder.dataset.color = '0';
    }

    parent.dataset.mode = 'oneclicked';
    parent.style.fill = colorArray[num];
    addClone(num);
  } else if (parent.dataset.mode == 'oneclicked') {
    console.log(parentId + " is clicked second time");

    parent.dataset.mode = 'twoclicked';
    parent.style.fill = 'green';
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
    clone.querySelector('.loader-circle').style.stroke = colorArray[num];

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