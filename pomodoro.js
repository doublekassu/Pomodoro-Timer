//Queries
const startTimerButtonQuery = document.querySelector("#start-timer");
const resetTimerButtonQuery = document.getElementById("reset-timer");
const numberQuery = document.getElementById("number");
const pomodoroCycleQuery = document.getElementById("pomodoro-cycle");

const timeInputMinutes = document.getElementById("timeInputMinutes");
const timeInputSeconds = document.getElementById("timeInputSeconds");
const pauseInputMinutes = document.getElementById("pauseInputMinutes");
const pauseInputTimes = document.getElementById("pauseInputTimes");
let timerDiv = document.getElementById("display-number")

let timerOn;
let currentPomodoroCycle = 0;

const resetTimer = () => {
    
    //Changes timerOn to false so buttonStartTimer() stops running
    console.log("reset button pressed");
    timerOn = false;
    timeInputMinutes.value = "";
    timeInputSeconds.value = "";
    pauseInputMinutes.value = "";
    pauseInputTimes.value = "";
    numberQuery.innerHTML = "Timer has been resetted";
    pomodoroCycleQuery.innerHTML = "";
    currentPomodoroCycle = 0;
    timerDiv.style.backgroundColor = "#ff0077";
}

const buttonStartTimer = () => {

    //If the timer is already counting down (timerOn===true), return empty. This way clicking start during ongoing timer doesn't interrupt it.
    if (timerOn) {
        return;
    }
    timerOn = true;
    console.log("Starting working timer");
    
    if (checkForInvalidInputs()) {
        resetTimer();
        return;
    }
    //Transform the inputs into seconds. The + before values transforms the values from a String to an Integer.
    timeQuery = +timeInputMinutes.value * 60 + +timeInputSeconds.value;
    console.log(`Starting time: ${timeQuery}`);
    updatePomodoroCycle(currentPomodoroCycle);

    //To get the starting value appear instantly on the screen, not after interval value
    if (checkIfSecondsUnderTen(timeQuery)) {
        numberQuery.innerHTML = `Working: ${Math.floor(timeQuery/60)}:0${timeQuery%60}`;
    }

    const interval = setInterval(() => {
        if (timerOn === true) {
            if (timeQuery > 0) {
                updateCountdown("Working", timeQuery-1);
                console.log(`Working time: ${timeQuery-1}`);
                timeQuery--;
            }
            else {
                numberQuery.innerHTML = "Pause starting!";
                clearInterval(interval);
                pauseStartTimer(+pauseInputMinutes.value, pauseInputTimes.value);
            }
        }

        //Clears the timer. Without this the old timer value stays after resetting timer
        else {
            clearInterval(interval);
        }
    }, 1000)
}

const pauseStartTimer = (pauseLength, pauseAmount) => {
    currentPomodoroCycle++;
    updateCountdown("Having a pause", pauseLength);
    const interval = setInterval(() => {
        if (timerOn === true) {
            if (pauseLength > 0) {
                updateCountdown("Having a pause", pauseLength-1);
                console.log(`Pause ${currentPomodoroCycle}/${pauseAmount} Pause time: ${pauseLength-1}`)
                pauseLength--;
            }
            else if (currentPomodoroCycle >= pauseAmount) {
                clearInterval(interval);
                timerOn = false;
                numberQuery.innerHTML = "Congrats on completing your Pomodoro!";
                timerDiv.style.backgroundColor = "#00bbff";
            }
            else {
                clearInterval(interval);
                timerOn = false;
                buttonStartTimer();
            }
        }
        else {
            clearInterval(interval);
        }
    }, 1000)
}

//EventListeners
startTimerButtonQuery.addEventListener("click", buttonStartTimer);
resetTimerButtonQuery.addEventListener("click", resetTimer);


const updateCountdown = (timerConditionText, currentNumber) => {
    if (checkIfSecondsUnderTen(currentNumber)) {

        //If seconds part is <=9, display 0 in front of seconds
        numberQuery.innerHTML = `${timerConditionText}: ${Math.floor(currentNumber/60)}:0${currentNumber%60}`;
    }
    else {

        //Base minutes (drop the decimals) and seconds with remainder by %60
        numberQuery.innerHTML = `${timerConditionText}: ${Math.floor(currentNumber/60)}:${currentNumber%60}`
    }
}


const checkForInvalidInputs = () => {
    if (timeInputSeconds.value > 59) {
        alert("Please use the values between 0-59 as your seconds inputs!");
        return true;
    }
    else if (timeInputSeconds.value === "" || pauseInputMinutes.value === "" || pauseInputTimes.value === "") {
        alert("Only minutes can be left empty!")
        return true;
    }
    else {
        return false;
    }
}

const updatePomodoroCycle = (currentPomodoroCycle) => {
    currentPomodoroCycle++;
    pomodoroCycleQuery.innerHTML = `${currentPomodoroCycle}/${pauseInputTimes.value}`;
    console.log(`Current pomodoro cycle: ${currentPomodoroCycle}`);
}

const checkIfSecondsUnderTen = (timeValue) => {
    if (timeValue%60 <= 9) {
        return true;
    }
    else {
        return false;
    }
}