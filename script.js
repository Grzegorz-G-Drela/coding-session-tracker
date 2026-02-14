const startButton = document.querySelector('.start-button');
const counterDisplay = document.querySelector('#counter');
const buttonDiv = document.querySelector('.buttons');

const resetButton = document.createElement('button');
resetButton.classList.add('button');
resetButton.textContent = "Reset";
buttonDiv.appendChild(resetButton);

startButton.addEventListener('click', startCounting); // start/pause/resume
resetButton.addEventListener('click', resetCounter);

let seconds = 0;
let intervalID = null;

function startCounting() {
    console.log('start/pause button clicked');
    if (intervalID === null) {
            intervalID = setInterval(function() {
            seconds += 1;
            counterDisplay.textContent = seconds;
        }, 1000);
        startButton.textContent = 'Pause';
    } else if (typeof(intervalID) === 'number') {
        clearInterval(intervalID);
        intervalID = null;
        startButton.textContent = 'Resume';
    }
}

function resetCounter() {
    console.log('reset button clicked');
    seconds = 0;
    counterDisplay.textContent = seconds;
    if (intervalID !== null) {
        clearInterval(intervalID);
        intervalID = null;
        startButton.textContent = 'Start';
    }
}