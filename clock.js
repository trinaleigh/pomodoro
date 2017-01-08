var gong = new Audio('audio/gong.mp3');

var startButton = document.getElementById("button")
var timerDisplay = document.getElementById("countdown");

var hourglassTop = document.getElementById("spaceUpper");
var hourglassBottom = document.getElementById("spaceLower");

var secondsLeft = resetClock();

function resetClock(){
	secondsLeft = 25*60;
	timerDisplay.innerHTML = clockDisplay(secondsLeft);
	startButton.disabled = false;
	startButton.style.backgroundColor = "#FFF7D8";
	hourglassTop.height = 0
	hourglassBottom.height = 150
	return secondsLeft
}

function clockDisplay(secondsLeft){
	prettyTime = (Math.floor(secondsLeft/60) + ' : ' + (secondsLeft % 60).toLocaleString(undefined, {minimumIntegerDigits: 2}))
	return prettyTime
}

function startTimer(){

	gong.play();
	startButton.disabled = true;
	startButton.style.backgroundColor = "#BA004C";

	var timerVar = setInterval(countDown,10);

	function countDown(){
		// decrement timer
		secondsLeft -= 1;
		timerDisplay.innerHTML = clockDisplay(secondsLeft);

		// animate the hourglass every 10 s
		if(secondsLeft % 10 == 0){
			topHeight = parseInt(hourglassTop.height);
			hourglassTop.height = topHeight + 1;
			bottomHeight = parseInt(hourglassBottom.height);
			hourglassBottom.height = bottomHeight - 1;
		}


		// reset at 0
		if(secondsLeft == 0) {
			clearInterval(timerVar);
			gong.play();
			resetClock();
		}
	}	
}
