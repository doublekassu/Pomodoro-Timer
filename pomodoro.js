//Queries
const startTimerButtonQuery = document.querySelector("#start-timer");
const resetTimerButtonQuery = document.getElementById("reset-timer");
let numberQuery = document.getElementById("number");
let timerOn;
//EventListeners

startTimerButtonQuery.addEventListener("click", buttonStartTimer);
resetTimerButtonQuery.addEventListener("click", resetTimer);

function buttonStartTimer() {
    //If the timer is already counting down (timerOn===true), return empty. This way clicking start during timer doesn't interrupt
    if (timerOn === true) {
        return;
    }
    timerOn = true;
    console.log("Start timer button pressed");
    let timeQuery = document.getElementById("timeInput").value;
    console.log(`Starting time: ${timeQuery}`);
    //To get the starting value appear instantly on the screen, not after interval value
    numberQuery.innerHTML = timeQuery;
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

function updateCountdown(startNumber) {
    if (startNumber >= 0) {
        numberQuery.innerHTML = startNumber;
    }
}

function resetTimer () {
    //Changes timerOn to false so buttonStartTimer() stops running
    console.log("reset button pressed");
    timerOn = false;
    document.getElementById("timeInput").value = "";
    numberQuery.innerHTML = "Timer has been resetted";
}


