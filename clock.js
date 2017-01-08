var gong = new Audio('audio/gong.mp3');

var startButton = document.getElementById("button")
var timerDisplay = document.getElementById("countdown");

var hourglassTop = document.getElementById("spaceUpper");
var hourglassBottom = document.getElementById("spaceLower");

const maxTime = 25*60

var counter = 0

var secondsLeft = resetClock();

function resetClock(){
	secondsLeft = maxTime;
	timerDisplay.innerHTML = clockDisplay(secondsLeft);
	startButton.disabled = false;
	startButton.style.backgroundColor = "#FFF7D8";
	hourglassTop.height = 0
	hourglassBottom.height = 150
	return secondsLeft
}

function clockDisplay(secondsLeft){
	// format timer to mm : ss
	prettyTime = (Math.floor(secondsLeft/60).toLocaleString(undefined, {minimumIntegerDigits: 2}) 
		+ ' : ' 
		+ (secondsLeft % 60).toLocaleString(undefined, {minimumIntegerDigits: 2}))
	return prettyTime
}

function startTimer(){
	counter += 1

	gong.play();
	startButton.disabled = true;
	startButton.style.backgroundColor = "#BA004C";

	var timerVar = setInterval(countDown,1000); // set to 1000 for use, 10 for testing

	function countDown(){
		// decrement timer
		secondsLeft -= 1;
		timerDisplay.innerHTML = clockDisplay(secondsLeft);

		// animate the hourglass every 10 s
		if(secondsLeft % 10 == 0){
			topHeight = parseInt(hourglassTop.height);
			hourglassTop.height = Math.round(150*(1-(secondsLeft/maxTime)));
			bottomHeight = parseInt(hourglassBottom.height);
			hourglassBottom.height = Math.round(150*(secondsLeft/maxTime));
		}

		// reset at 0
		if(secondsLeft == 0) {
			clearInterval(timerVar);
			gong.play();
			resetClock();
			checkMark();
		}
	}	
}

function checkMark(){
	if(counter <= 4){
		var notebookDisplay = document.getElementById("round " + counter)
		notebookDisplay.innerHTML += " ✓";
	}
}
