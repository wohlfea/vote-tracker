/* JS Goes Here */
var randomPicOne;
var randomPicTwo;
var theChart;
var voting = true;
var imgArray = [['img/bacon.jpg', 'img/bananas.jpg', 'img/benedict.jpg', 'img/cigs.jpg', 'img/countchocula.jpg', 'img/doughnut.jpg', 'img/eggs.jpg', 'img/pancakes.jpg', 'img/parfait.jpg', 'img/pbr.jpg', 'img/toast.jpg', 'img/waffles.jpg'],['A pile of bacon', 'A few bananas', 'Eggs Benedict', 'Cigarettes & Redbull', 'Count Chocula', 'A delicious sprinkled doughnut', 'Scrambled eggs', 'Pancakes', 'A fruit parfait', 'A tasty Pabst', 'Bill Murray Toast', 'Yummy waffles'],['#222D3E', '#5E412F', '#F07818', '#F0A830', '#A8A701', '#FEEDB8', '#5E552F','#33223F', '#38300B','#78C0A8', '#200F02', '#1D4918']];
var imgObjArray = [];
var picOne = document.getElementById('choiceOne');
var picOneCap = document.getElementById('choiceOneCap');
var picTwo = document.getElementById('choiceTwo');
var picTwoCap = document.getElementById('choiceTwoCap');
var response = document.getElementById('response');
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
    voteAgain.style.visibility = 'hidden'
    response.style.visibility = 'hidden'
  },
  showResponse: function() {
    voteAgain.style.visibility = 'visible';
    response.style.visibility = 'visible';
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
      tracker.showResponse();
      response.textContent = randomPicOne.name + ' has ' + randomPicOne.value + ' vote(s).  ' + randomPicTwo.name + ' has ' + randomPicTwo.value + ' vote(s).';
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
