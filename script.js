
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

const todaysDate = Date();


sessions.forEach(function(sessionsElement) {
    let li = document.createElement('li');
    li.textContent = sessionsElement;
    sessionList.appendChild(li);
});

function startCounting() {
    console.log('start/pause/resume');
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
    console.log('reset');
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
        variable = relativeDate(todaysDate);
        
        sessions.push({duration: counter.textContent, startTime: todaysDate});
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

function leadingZero(num) {
    let text = num.toString();
    if (text.length === 1) {
        text = "0" + text;
    }
    return text;
}

let formatted = {};

function formatDate(unformattedDate) {
    year = unformattedDate.getYear();
    month = unformattedDate.getMonth();
    day = unformattedDate.getDate();

    formatted.year = year;
    formatted.month = month;
    formatted.day = day;
}

let wayToPresentDate = "";

function compareDates (sessionDate, actualDate) {
    if (sessionDate.year === actualDate.year &&
    sessionDate.month === actualDate.month &&
    sessionDate.day === actualDate.day) {
        dayPresented = "Today";
    } else if (sessionDate.year === actualDate.year &&
    sessionDate.month === actualDate.month &&
    sessionDate.day === (actualDate.day-1)) {
        dayPresented = "Yesterday";
    } else {
        dayPresented = sessionDate.getDay();
    }
}

function relativeDate (timestamp) {
    //format the date before, you spoiled it before, so i need to strip the time:
    formatedTimestamp = formatDate(timestamp);
    formattedNowDate = formatDate(nowDate);
    if (formatedTimestamp === formattedNowDate) {
        // today
    } else if (formatedTimestamp === formattedNowDate("-1 day") {
        // yesterday
    } else {
        // day of the week
    }
}