/* JS Goes Here */
var imgArray = [['img/bacon.jpg', 'img/bananas.jpg', 'img/benedict.jpg', 'img/cigs.jpg', 'img/countchocula.jpg', 'img/doughnut.jpg', 'img/eggs.jpg', 'img/pancakes.jpg', 'img/parfait.jpg', 'img/pbr.jpg', 'img/toast.jpg', 'img/waffles.jpg'],['A pile of bacon', 'A few bananas', 'Eggs Benedict', 'Cigarettes & Redbull', 'Count Chocula', 'A delicious sprinkled doughnut', 'Scrambled eggs', 'Pancakes', 'A fruit parfait', 'A tasty Pabst', 'Bill Murray Toast', 'Waffles']];
var imgObjArray = [];

function Photo(path, name) {
  this.path = path;
  this.name = name;
  imgObjArray.push(this);
}

var populateArray = function() {
  for (i=0; i < imgArray[0].length - 1; i++) {
    new Photo(imgArray[0][i], imgArray[1][i]);
  }
}

populateArray();
console.log(imgObjArray);
