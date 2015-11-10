/* JS Goes Here */
var randomPicOne;
var randomPicTwo;
var voting = true;
var imgArray = [['img/bacon.jpg', 'img/bananas.jpg', 'img/benedict.jpg', 'img/cigs.jpg', 'img/countchocula.jpg', 'img/doughnut.jpg', 'img/eggs.jpg', 'img/pancakes.jpg', 'img/parfait.jpg', 'img/pbr.jpg', 'img/toast.jpg', 'img/waffles.jpg'],['A pile of bacon', 'A few bananas', 'Eggs Benedict', 'Cigarettes & Redbull', 'Count Chocula', 'A delicious sprinkled doughnut', 'Scrambled eggs', 'Pancakes', 'A fruit parfait', 'A tasty Pabst', 'Bill Murray Toast', 'Yummy waffles']];
var imgObjArray = [];
var picOne = document.getElementById('choiceOne');
var picOneCap = document.getElementById('choiceOneCap');
var picTwo = document.getElementById('choiceTwo');
var picTwoCap = document.getElementById('choiceTwoCap');
var response = document.getElementById('response');
var voteAgain = document.getElementById('voteAgain');

function Photo(path, name) {
  this.path = path;
  this.name = name;
  this.votes = 0;
  imgObjArray.push(this);
}

var tracker = {
  populateArray: function() {
    for (i=0; i < imgArray[0].length; i++) {
       new Photo(imgArray[0][i], imgArray[1][i]);
    }
  },
  randomizer: function() {
    if (voting === true) {
      voteAgain.style.visibility = 'hidden'
      response.style.visibility = 'hidden'
      randomPicOne = imgObjArray[Math.floor(Math.random() * imgObjArray.length)];
      randomPicTwo = imgObjArray[Math.floor(Math.random() * imgObjArray.length)];
      if (randomPicOne === randomPicTwo) {
        console.log('Rolling Again');
        tracker.randomizer();
      } else {
        picOneCap.textContent = randomPicOne.name;
        picOne.src = randomPicOne.path;
        picTwoCap.textContent = randomPicTwo.name;
        picTwo.src = randomPicTwo.path;
      }
    } else {
      console.log('Voting is currently set to false');
      voteAgain.style.visibility = 'visible';
      response.style.visibility = 'visible';
      response.textContent = randomPicOne.name + ' has ' + randomPicOne.votes + ' vote(s).  ' + randomPicTwo.name + ' has ' + randomPicTwo.votes + ' vote(s).';
    }
  },
  castVote: function(event) {
    event.preventDefault();
    console.log('User clicked on ' + event.target.src);
    console.log(randomPicOne.path); //This is temporary
    if (voting === true) {
      if(event.target.src.indexOf(randomPicOne.path) > -1) {
        randomPicOne.votes += 1;
        voting = false;
        tracker.randomizer();
      } else {
        randomPicTwo.votes += 1;
        voting = false;
        tracker.randomizer();
      }
    }
  },
  playAgainFunc: function() {
    event.preventDefault();
    voting = true;
    tracker.randomizer();
  }
}


picOne.addEventListener('click', tracker.castVote);
picTwo.addEventListener('click', tracker.castVote);
voteAgain.addEventListener('click', tracker.playAgainFunc);

tracker.populateArray();
tracker.randomizer();
