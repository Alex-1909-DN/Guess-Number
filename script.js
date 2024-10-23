'use strict';
/*
console.log(document.querySelector('.message').textContent);
document.querySelector('.message').textContent = ' 🐓Correct Number!';
console.log(document.querySelector('.message').textContent);

document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 10;

console.log(document.querySelector('.guess').value);
*/

let maxNumber = 20;

let score = 20;
let highscore = 0;

//function to adjust difficulty
document.querySelector('.difficulty').addEventListener('change', function () {
  const level = this.value;
  if (level === 'easy') {
    maxNumber = 10;
    score = 10;
  } else if (level === 'medium') {
    maxNumber = 20;
    score = 20;
  } else if (level === 'hard') {
    maxNumber = 50;
    score = 50;
  }
  resetGame(); // Reset the game with the new difficulty
});

let secretNumber = Math.trunc(Math.random() * maxNumber) + 1;

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};
document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, typeof guess);
  if (!guess) {
    // document.querySelector('.message').textContent = '😒 No number';
    displayMessage('😒 No number');
  } else if (guess < 1 || guess > maxNumber) {
    displayMessage(`⚠️ Number must be between 1 and ${maxNumber}!`);
  } else if (guess === secretNumber) {
    // document.querySelector('.message').textContent = '🎉 Correct number';
    displayMessage('🎉 Correct number');
    document.querySelector('.number').textContent = secretNumber;
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';

    //stop the timer when the palyer wins
    clearInterval(timer);

    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }
  } else if (guess !== secretNumber) {
    if (score > 1) {
      // document.querySelector('.message').textContent =
      //   guess > secretNumber ? '😒 Too high' : '😒 Too low';
      if (Math.abs(secretNumber - guess) <= 2) {
        displayMessage("🧸You're very close!");
      } else {
        displayMessage(guess > secretNumber ? '😒 Too high' : '😒 Too low');
      }
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      // document.querySelector('.message').textContent = '😢 You lost the game';
      displayMessage('😢 You lost the game');
      document.querySelector('.score').textContent = 0;
    }
  }
});

document.querySelector('.guess').addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    document.querySelector('.check').click();
  }
});

document.querySelector('.again').addEventListener('click', function () {
  //   score = 20;
  secretNumber = Math.trunc(Math.random() * maxNumber) + 1;
  score = maxNumber;
  // document.querySelector('.message').textContent = 'Start guessing...';
  displayMessage('Start guessing...');
  startTimer();
  document.querySelector('.score').textContent = score;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
});

let timeLeft = 30;
let timer;
const startTimer = function () {
  clearInterval(timer);
  timeLeft = 30;
  document.querySelector('.time-left').textContent = timeLeft;

  document.querySelector('.guess').disabled = false;
  document.querySelector('.check').disabled = false;

  timer = setInterval(function () {
    timeLeft--;
    document.querySelector('.time-left').textContent = timeLeft;
    if (timeLeft === 0) {
      clearInterval(timer);
      displayMessage("Time's up! You lost!");
      document.querySelector('.score').textContent = 0;

      document.querySelector('.guess').disabled = true;
      document.querySelector('.check').disabled = true;
    }
  }, 1000);
};
document.querySelector('.check').addEventListener('click', function () {
  if (!timer) {
    // Only start the timer if it isn't already running
    startTimer();
  }
});
