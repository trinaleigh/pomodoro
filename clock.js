var gong = new Audio('audio/gong.mp3');

var startButton = document.getElementById("button")
var timerDisplay = document.getElementById("countdown");

var hourglassTop = document.getElementById("spaceUpper");
var hourglassBottom = document.getElementById("spaceLower");

var hourglassWhole = document.getElementById("hourglass_total");

const maxTime = 25*60

var counter = 0

var secondsLeft = resetClock();

function resetClock(){
	// reset the timer and start button
		secondsLeft = maxTime;
		timerDisplay.innerHTML = clockDisplay(secondsLeft);
		startButton.disabled = false;
		startButton.style.backgroundColor = "#FFF7D8";
		
		// reset the hourglass display back to its original configuration
		// note: reset creates no visible change to graphic, but required for animation to continue working as calculated below
		hourglassTop.height = 0;
		hourglassBottom.height = 150;
		// hide the rotation
		hourglassWhole.style.transition = `none`;
		hourglassWhole.style.transform = `rotate(180deg)`;
		// add Timeout before resetting transition - prevents net zero change getting swallowed in cache
		setTimeout(function(){
			hourglassWhole.style.transition = `transform 5s`;
		},1);

	return secondsLeft;
}

function clockDisplay(secondsLeft){
	// format timer to mm : ss
	prettyTime = (Math.floor(secondsLeft/60).toLocaleString(undefined, {minimumIntegerDigits: 2}) 
		+ ' : ' 
		+ (secondsLeft % 60).toLocaleString(undefined, {minimumIntegerDigits: 2}))
	return prettyTime
}

function newRound(){
	counter += 1

	gong.play();
	hourglassWhole.style.transform = `rotate(0deg)`
	startButton.disabled = true;
	startButton.style.backgroundColor = "#BA004C"

	setTimeout(startTimer, 2000);

}

function startTimer(){
	var timerVar = setInterval(countDown,5); // set to 1000 for use, 10 for testing

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
