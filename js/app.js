/* JS Goes Here */
var voting = true;
var imgArray = [['img/bacon.jpg', 'img/bananas.jpg', 'img/benedict.jpg', 'img/cigs.jpg', 'img/countchocula.jpg', 'img/doughnut.jpg', 'img/eggs.jpg', 'img/pancakes.jpg', 'img/parfait.jpg', 'img/pbr.jpg', 'img/toast.jpg', 'img/waffles.jpg'],['A Pile of Bacon', 'A Few Bananas', 'Eggs Benedict', 'Cigarettes & Redbull', 'Count Chocula', 'A Sprinkled Doughnut', 'Scrambled Eggs', 'Pancakes', 'A Fruit Parfait', 'A Tasty Pabst', 'Bill Murray Toast', 'Yummy Waffles'],['#222D3E', '#5E412F', '#F07818', '#F0A830', '#A8A701', '#FEEDB8', '#5E552F','#33223F', '#38300B','#78C0A8', '#200F02', '#1D4918']];
var imgObjArray = [];
var theChart;
var canvas = document.getElementById('theCanvas').getContext('2d');
var randomPicOne;
var randomPicTwo;
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
  picOne: document.getElementById('choiceOne'),
  picOneCap: document.getElementById('choiceOneCap'),
  voteCountDisplayOne: document.getElementById('voteCountDisplayOne'),
  picTwo: document.getElementById('choiceTwo'),
  picTwoCap: document.getElementById('choiceTwoCap'),
  voteCountDisplayTwo: document.getElementById('voteCountDisplayTwo'),
  voteAgain: document.getElementById('voteAgain'),
  clearData: document.getElementById('clearData'),
  lookForData: function() {
    if(localStorage.imgObjArray){
      tracker.updateImgArray();
      tracker.displayChart();
      tracker.router();
    } else {
      tracker.populateArray();
      tracker.router();
    }
  },
  populateArray: function() {
    for (var i=0; i < imgArray[0].length; i++) {
      new Photo(imgArray[0][i], imgArray[1][i], imgArray[2][i]);
    }
  },
  updateImgArray: function() {
    imgObjArray = JSON.parse(localStorage.getItem('imgObjArray'));
  },
  storeData: function() {
    localStorage.setItem('imgObjArray', JSON.stringify(imgObjArray));
  },
  clearAll: function() {
    localStorage.clear();
    imgObjArray = [];
    tracker.populateArray();
    tracker.playAgainFunc();
  },
  hideResponse: function() {
    //Clearing classes and hiding responses to user
    tracker.voteAgain.style.visibility = 'hidden';
    tracker.clearData.style.visibility = 'hidden';
    tracker.voteCountDisplayOne.style.visibility = 'hidden';
    tracker.voteCountDisplayTwo.style.visibility = 'hidden';
    tracker.picOne.setAttribute('class', 'standard');
    tracker.picTwo.setAttribute('class', 'standard');
  },
  showResponse: function() {
    tracker.voteAgain.style.visibility = 'visible';
    tracker.clearData.style.visibility = 'visible';
    tracker.voteCountDisplayOne.style.visibility = 'visible';
    tracker.voteCountDisplayTwo.style.visibility = 'visible';
  },
  displayRandom: function() {
    tracker.hideResponse();
    randomPicOne = imgObjArray[Math.floor(Math.random() * imgObjArray.length)];
    randomPicTwo = imgObjArray[Math.floor(Math.random() * imgObjArray.length)];
    if (randomPicOne === randomPicTwo) {
      tracker.router();
    } else {
      tracker.picOneCap.textContent = randomPicOne.name;
      tracker.picOne.src = randomPicOne.path;
      tracker.picTwoCap.textContent = randomPicTwo.name;
      tracker.picTwo.src = randomPicTwo.path;
    }
  },
  router: function() {
    if (voting) {
      tracker.displayRandom();
    } else {
      tracker.respondToUser();
    }
  },
  respondToUser: function() {
    tracker.showDiff();
    tracker.showResponse();
    tracker.voteCountDisplayOne.textContent = randomPicOne.value + ' vote(s). ';
    tracker.voteCountDisplayTwo.textContent = randomPicTwo.value + ' vote(s). ';
  },
  showDiff: function() {
    if(randomPicOne.value > randomPicTwo.value) {
      //Set class of random Pic one to winner
      tracker.picOne.setAttribute('class', 'winner');
      tracker.picTwo.setAttribute('class', 'inactive');
    } else if (randomPicOne.value < randomPicTwo.value) {
      //Set class of random pic two to winner
      tracker.picTwo.setAttribute('class', 'winner');
      tracker.picOne.setAttribute('class', 'inactive');
    } else {
      //Set class of both to winner
      tracker.picOne.setAttribute('class', 'winner');
      tracker.picTwo.setAttribute('class', 'winner');
    }
  },
  castVote: function(event) {
    event.preventDefault();
    if (voting) {
      tracker.addVote();
    }
  },
  addVote: function() {
    if(event.target.src.indexOf(randomPicOne.path) > -1) {
      randomPicOne.value += 1;
      voting = false;
      tracker.storeData();
      tracker.displayChart();
      tracker.router();
    } else {
      randomPicTwo.value += 1;
      voting = false;
      tracker.storeData();
      tracker.displayChart();
      tracker.router();
    }
  },
  playAgainFunc: function() {
    event.preventDefault();
    voting = true;
    tracker.router();
  },
  refreshSegments: function() {
    for (var i = 0; i < imgObjArray.length; i++) {
      theChart.segments[i].value = imgObjArray[i].value;
    }
  },
  displayChart: function() {
    if(theChart){
      tracker.refreshSegments();
      theChart.update();
    } else {
      theChart = new Chart(canvas).Doughnut(imgObjArray, {
        animationSteps : 100,
        animationEasing : 'easeOutBounce',
        percentageInnerCutout : 25,
        segmentStrokeWidth : 5,
        animateRotate : true,
        animateScale : true
      });
    }
  }
};
tracker.picOne.addEventListener('click', tracker.castVote);
tracker.picTwo.addEventListener('click', tracker.castVote);
tracker.voteAgain.addEventListener('click', tracker.playAgainFunc);
tracker.clearData.addEventListener('click', tracker.clearAll);
tracker.lookForData();
