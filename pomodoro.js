//Queries
const startTimerButtonQuery = document.querySelector("#start-timer");
const resetTimerButtonQuery = document.getElementById("reset-timer");
let numberQuery = document.getElementById("number");
let timerOn;
let timeInputMinutes = document.getElementById("timeInputMinutes");
let timeInputSeconds = document.getElementById("timeInputSeconds");

//EventListeners
startTimerButtonQuery.addEventListener("click", buttonStartTimer);
resetTimerButtonQuery.addEventListener("click", resetTimer);

function buttonStartTimer() {

    //If the timer is already counting down (timerOn===true), return empty. This way clicking start during ongoing timer doesn't interrupt it.
    if (timerOn === true) {
        return;
    }
    timerOn = true;
    console.log("Start timer button pressed");
    
    if (checkForInvalidInputs()) {
        resetTimer();
        return;
    }
    //Transform the inputs into seconds. The + before values transforms the values from a String to an Integer.
    timeQuery = +timeInputMinutes.value * 60 + +timeInputSeconds.value;
    console.log(`Starting time: ${timeQuery}`);

    //To get the starting value appear instantly on the screen, not after interval value
    if (timeQuery%60 <= 9) {
        numberQuery.innerHTML = `${Math.floor(timeQuery/60)}:0${timeQuery%60}`;
    }
    const interval = setInterval(function() {
        if (timerOn === true) {
            if (timeQuery > 0) {
                updateCountdown(timeQuery-1);
                console.log(timeQuery-1);
                timeQuery--;
            }
            else {
                numberQuery.innerHTML = "Time completed";
            }
        }

        //Clears the timer. Without this the old timer value stays after resetting timer
        else {
            clearInterval(interval);
        }
    }, 1000)
}

function updateCountdown(currentNumber) {
    if (currentNumber%60 <= 9) {

        //If seconds part is <=9, display 0 in front of seconds
        numberQuery.innerHTML = `${Math.floor(currentNumber/60)}:0${currentNumber%60}`;
    }
    else {
        
        //Base minutes (drop the decimals) and seconds with remainder by %60
        numberQuery.innerHTML = `${Math.floor(currentNumber/60)}:${currentNumber%60}`
    }
}

function resetTimer () {
    
    //Changes timerOn to false so buttonStartTimer() stops running
    console.log("reset button pressed");
    timerOn = false;
    timeInputMinutes.value = "";
    timeInputSeconds.value = "";
    numberQuery.innerHTML = "Timer has been resetted";
}

const checkForInvalidInputs = () => {
    if (timeInputSeconds.value > 59) {
        alert("Please use the values between 0-59 as your seconds inputs!");
        return true;
    }
    else {
        return false;
    }
}
