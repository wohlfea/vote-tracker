/* JS Goes Here */
var voting = true;
var imgArray = [['img/bacon.jpg', 'img/bananas.jpg', 'img/benedict.jpg', 'img/cigs.jpg', 'img/countchocula.jpg', 'img/doughnut.jpg', 'img/eggs.jpg', 'img/pancakes.jpg', 'img/parfait.jpg', 'img/pbr.jpg', 'img/toast.jpg', 'img/waffles.jpg'],['A pile of bacon', 'A few bananas', 'Eggs Benedict', 'Cigarettes & Redbull', 'Count Chocula', 'A delicious sprinkled doughnut', 'Scrambled eggs', 'Pancakes', 'A fruit parfait', 'A tasty Pabst', 'Bill Murray Toast', 'Waffles']];
var imgObjArray = [];
var picOne = document.getElementById('choiceOne');
var picOneCap = document.getElementById('choiceOneCap');
var picTwo = document.getElementById('choiceTwo');
var picTwoCap = document.getElementById('choiceTwoCap');

function Photo(path, name) {
  this.path = path;
  this.name = name;
  this.votes = 0;
  imgObjArray.push(this);
}

var populateArray = function() {
  for (i=0; i < imgArray[0].length; i++) {
     new Photo(imgArray[0][i], imgArray[1][i]);
  }
};

function randomizer() {
  if (voting = true) {
    var randomPicOne = imgObjArray[Math.floor(Math.random() * imgObjArray.length)];
    var randomPicTwo = imgObjArray[Math.floor(Math.random() * imgObjArray.length)];
    if (randomPicOne !== randomPicTwo) {
      picOneCap.textContent = randomPicOne.name;
      picOne.src = randomPicOne.path;
      picTwoCap.textContent = randomPicTwo.name;
      picTwo.src = randomPicTwo.path;
    } else {
      randomizer();
    }
  } else {
    console.log('Voting is currently set to false');
  }
}


populateArray();
randomizer();

