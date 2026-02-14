const startButton = document.querySelector('.start-button');
const counterDisplay = document.querySelector('#counter');
const buttonDiv = document.querySelector('.buttons');
const resetButton = document.querySelector('.reset-button');
const endButton = document.querySelector('.end-button');
const storage = document.querySelector('#storage');

startButton.addEventListener('click', startCounting); // start/pause/resume
resetButton.addEventListener('click', resetCounter);
endButton.addEventListener('click', endSession);

let seconds = 0;
let intervalID = null;

function startCounting() {
    console.log('start/pause button clicked');
    if (intervalID === null) {
            intervalID = setInterval(function() {
            seconds += 1;
            counterDisplay.textContent = seconds;
        }, 1000);
        startButton.textContent = 'PAUSE';
    } else if (typeof(intervalID) === 'number') {
        clearInterval(intervalID);
        intervalID = null;
        startButton.textContent = 'RESUME';
    }
}

function resetCounter() {
    console.log('reset button clicked');
    seconds = 0;
    counterDisplay.textContent = seconds;
    startButton.textContent = 'START';
    if (intervalID !== null) {
        clearInterval(intervalID);
        intervalID = null;
    }
}

function endSession() {
    console.log('endSession button clicked');

    if (seconds !== 0) {
        let session = document.createElement('li');
        storage.appendChild(session);
        session.textContent = seconds;
        resetCounter();
    }
}