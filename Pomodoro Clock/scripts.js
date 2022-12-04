var breakTime = 5;
var sessionTime = 25;
var timeLeft = 25 * 60;
var isRunning = false;
var countDown = null;

function reset(){
    breakTime = 5;
    sessionTime = 25;
    timeLeft = sessionTime*60;
    isRunning = false;
    document.getElementById("break-length").innerHTML = breakTime;
    document.getElementById("session-length").innerHTML = sessionTime;
    document.getElementById("start_stop").innerHTML = "Start";
    document.getElementById("timer-label").innerHTML = "Session";
    document.getElementById("beep").pause();
    document.getElementById("beep").currentTime = 0;
    clearInterval(countDown);
    updateTimeLeft();
    
}

function updateTimeLeft(){
    if(!isRunning){
        timeLeft = sessionTime * 60;
    }
    var minutesLeft = Math.floor(timeLeft / 60);
    var secondsLeft = timeLeft % 60;
    if(minutesLeft < 10){
        minutesLeft = "0" + minutesLeft;
    }
    if(secondsLeft < 10){
        secondsLeft = "0" + secondsLeft;
    }
    document.getElementById("time-left").innerHTML = minutesLeft + ":" + secondsLeft;
}

function startStop(){
    if(!isRunning){
        isRunning = true;
        document.getElementById("start_stop").innerHTML = "Stop";
        timer();
    }else{
        isRunning = false;
        document.getElementById("start_stop").innerHTML = "Start";
        clearInterval(countDown);
    }
}

// Se ejecuta cada segundo y actualiza el tiempo restante
function timer(){
    var sessionLabel = document.getElementById("timer-label");
    countDown = setInterval(function(){
        if(timeLeft > 0 && isRunning){
            timeLeft--;
            updateTimeLeft();
        }else if(timeLeft === 0){           
            if(sessionLabel.innerHTML == "Session"){
                clearInterval(countDown);
                sessionLabel.innerHTML = "Break";
                timeLeft = breakTime * 60 + 1;
                document.getElementById("beep").play();
                timer();             
            }else if(sessionLabel.innerHTML == "Break"){
                clearInterval(countDown);
                sessionLabel.innerHTML = "Session";
                timeLeft = sessionTime * 60 + 1;
                document.getElementById("beep").play();
                timer();
            }        
        }
    }, 1000);
}


function addBreak(){
    if(breakTime < 60 && !isRunning){
        breakTime++;
        document.getElementById("break-length").innerHTML = breakTime;
    }
}

function decrementBreak(){
    if(breakTime > 1 && !isRunning){
        breakTime--;
        document.getElementById("break-length").innerHTML = breakTime;
    }
}

function addSession(){
    if(sessionTime < 60 && !isRunning){
        sessionTime++;
        document.getElementById("session-length").innerHTML = sessionTime;
        updateTimeLeft();
    }
}

function decrementSession(){
    if(sessionTime > 1 && !isRunning){
        sessionTime--;
        document.getElementById("session-length").innerHTML = sessionTime;
        document.getElementById("time-left").innerHTML.split(":")[0] = sessionTime;
        updateTimeLeft();
    }    
}

	
