
const startButton = document.querySelector('.start-button');
const counterDisplay = document.querySelector('#counter');
const buttonDiv = document.querySelector('.buttons');
const resetButton = document.querySelector('.reset-button');
const endButton = document.querySelector('.end-button');
const sessionList = document.querySelector('#sessionList');

startButton.addEventListener('click', startCounting); // start/pause/resume
resetButton.addEventListener('click', resetCounter);
endButton.addEventListener('click', endSession);

let seconds = 0;
let intervalID = null;
let sessions = JSON.parse(localStorage.getItem('sessions')) || [];

sessions.forEach(function(sessionsElement) {
    let li = document.createElement('li');
    li.textContent = sessionsElement;
    sessionList.appendChild(li);
});

function startCounting() {
    console.log('start/pause button clicked');
    if (intervalID === null) {
            intervalID = setInterval(function() {
            seconds += 1;
            secMinHou(seconds);
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
    secMinHou(seconds);
    startButton.textContent = 'START';
    if (intervalID !== null) {
        clearInterval(intervalID);
        intervalID = null;
    }
}

function endSession() {
    if (seconds !== 0) {
        let session = document.createElement('li');
        sessionList.appendChild(session);
        session.textContent = counter.textContent;
        resetCounter();
        let save = session.textContent;
        
        sessions.push(save);
        localStorage.setItem('sessions', JSON.stringify(sessions));
    }
}

function secMinHou(totalSeconds) {
    let hours = Math.floor(totalSeconds/3600);
    let hoursRest = totalSeconds%3600;
    let minutes = Math.floor(hoursRest/60);
    let seconds = hoursRest%60; // seconds

    let h = leadingZero(hours);
    let m = leadingZero(minutes);
    let s = leadingZero(seconds);

    counterDisplay.textContent = `${h}:${m}:${s}`;
}

function leadingZero (num) {
    let text = num.toString();
    if (text.length === 1) {
        text = "0" + text;
    }
    return text;
}