/* JS Goes Here */
var randomPicOne;
var randomPicTwo;
var theChart;
var voting = true;
var imgArray = [['img/bacon.jpg', 'img/bananas.jpg', 'img/benedict.jpg', 'img/cigs.jpg', 'img/countchocula.jpg', 'img/doughnut.jpg', 'img/eggs.jpg', 'img/pancakes.jpg', 'img/parfait.jpg', 'img/pbr.jpg', 'img/toast.jpg', 'img/waffles.jpg'],['A Pile of Bacon', 'A Few Bananas', 'Eggs Benedict', 'Cigarettes & Redbull', 'Count Chocula', 'A Sprinkled Doughnut', 'Scrambled Eggs', 'Pancakes', 'A Fruit Parfait', 'A Tasty Pabst', 'Bill Murray Toast', 'Yummy Waffles'],['#222D3E', '#5E412F', '#F07818', '#F0A830', '#A8A701', '#FEEDB8', '#5E552F','#33223F', '#38300B','#78C0A8', '#200F02', '#1D4918']];
var imgObjArray = [];
var picOne = document.getElementById('choiceOne');
var picOneCap = document.getElementById('choiceOneCap');
var voteCountDisplayOne = document.getElementById('voteCountDisplayOne');
var picTwo = document.getElementById('choiceTwo');
var picTwoCap = document.getElementById('choiceTwoCap');
var voteCountDisplayTwo = document.getElementById('voteCountDisplayTwo');
var voteAgain = document.getElementById('voteAgain');
var canvas = document.getElementById('theCanvas').getContext('2d');

function Photo(path, name, color) {
  this.path = path;
  this.name = name;
  this.value = 0;
  this.label = this.name;
  this.color = color;
  this.highlight = '#D0FB32';
  imgObjArray.push(this);
}

var tracker = {
  populateArray: function() {
    for (i=0; i < imgArray[0].length; i++) {
       new Photo(imgArray[0][i], imgArray[1][i], imgArray[2][i]);
    }
  },
  hideResponse: function() {
    //Clearing classes and hiding responses to user
    voteAgain.style.visibility = 'hidden';
    voteCountDisplayOne.style.visibility = 'hidden';
    voteCountDisplayTwo.style.visibility = 'hidden';
    picOne.setAttribute('class', null);
    picTwo.setAttribute('class', null);
  },
  showResponse: function() {
    voteAgain.style.visibility = 'visible';
    voteCountDisplayOne.style.visibility = 'visible'
    voteCountDisplayTwo.style.visibility = 'visible'
  },
  displayRandom: function() {
    tracker.hideResponse();
    randomPicOne = imgObjArray[Math.floor(Math.random() * imgObjArray.length)];
    randomPicTwo = imgObjArray[Math.floor(Math.random() * imgObjArray.length)];
    if (randomPicOne === randomPicTwo) {
      console.log('Rolling Again');
      tracker.router();
    } else {
      picOneCap.textContent = randomPicOne.name;
      picOne.src = randomPicOne.path;
      picTwoCap.textContent = randomPicTwo.name;
      picTwo.src = randomPicTwo.path;
    }
  },
  router: function() {
    if (voting === true) {
      console.log('voting is currently set to True');
      tracker.displayRandom();
    } else {
      tracker.respondToUser();
    }
  },
  respondToUser: function() {
      console.log('Voting is currently set to false');
      tracker.showDiff();
      tracker.showResponse();
      voteCountDisplayOne.textContent = randomPicOne.value + ' vote(s). ';
      voteCountDisplayTwo.textContent = randomPicTwo.value + ' vote(s). ';
  },
  showDiff: function() {
    if(randomPicOne.value > randomPicTwo.value) {
      //Set class of random Pic one to winner
      picOne.setAttribute('class', 'winner');
    } else if (randomPicOne.value < randomPicTwo.value) {
      //Set class of random pic two to winner
      picTwo.setAttribute('class', 'winner');
    } else {
      //Set class of both to winner
      picOne.setAttribute('class', 'winner');
      picTwo.setAttribute('class', 'winner');
    }
  },
  castVote: function(event) {
    event.preventDefault();
    if (voting === true) {
      tracker.addVote();
    }
  },
  addVote: function() {
    if(event.target.src.indexOf(randomPicOne.path) > -1) {
        randomPicOne.value += 1;
        voting = false;
        tracker.displayChart();
        tracker.router();
      } else {
        randomPicTwo.value += 1;
        voting = false;
        tracker.displayChart();
        tracker.router();
      }
  },
  playAgainFunc: function() {
    event.preventDefault();
    voting = true;
    tracker.router();
  },
  displayChart: function() {
    if(theChart){
      theChart.destroy();
      theChart = new Chart(canvas).Doughnut(imgObjArray, {
      animationSteps : 25,
      animationEasing : '',
      percentageInnerCutout : 25,
      segmentStrokeWidth : 5,
      animateRotate : true,
      animateScale : false
    })} else {
      theChart = new Chart(canvas).Doughnut(imgObjArray, {
      animationSteps : 100,
      animationEasing : '',
      percentageInnerCutout : 25,
      segmentStrokeWidth : 5,
      animateRotate : true,
      animateScale : true
      });
    }
  }
}

picOne.addEventListener('click', tracker.castVote);
picTwo.addEventListener('click', tracker.castVote);
voteAgain.addEventListener('click', tracker.playAgainFunc);
tracker.populateArray();
tracker.router();
