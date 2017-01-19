// get audio file to play at start / end of each round
const gong = new Audio('audio/gong.mp3');

// get page elements:

// header for placing random quotes
const header = document.getElementById("quote_goes_here");

// start and reset buttons
const startButton = document.getElementById("start_button")
const resetButton = document.getElementById("reset_button")

// countdown clock
const timerDisplay = document.getElementById("countdown");

// hourglass animation
const hourglassTop = document.getElementById("spaceUpper");
const hourglassBottom = document.getElementById("spaceLower");
const hourglassWhole = document.getElementById("hourglass_total");

// notification to take a break
const breakDisplay = document.getElementById("breakType");

// max time from user input
const timeInput = document.querySelector('.duration_change input');
timeInput.addEventListener("change", updateTimer)
timeInput.addEventListener("mouseup", updateTimer)

// start counter at 0 and initialize the countdown clock
var counter = 0

// request notification permission and set up the clock
notifyPerm();
resetClock();

function updateTimer(){
	// upon user input for max time, update the timer display
	maxTime = timeInput.value*60
	secondsLeft = maxTime;
	timerDisplay.innerHTML = clockDisplay(secondsLeft);
}

function resetClock(){
	// reset the timer
	updateTimer();

	// reset the start button
	startButton.disabled = false;

	// reset the hourglass display back to its original configuration
	// note: reset creates no visible change to graphic, but required for animation to continue working as calculated below
	hourglassTop.height = 0;
	hourglassBottom.height = 150;
	// hide the rotation
	hourglassWhole.style.transition = `none`;
	hourglassWhole.style.transform = `rotate(180deg)`;
	// force CSS reflow before resetting transition - prevents net zero change getting swallowed in cache
	hourglassWhole.offsetHeight; // (reflow)
	hourglassWhole.style.transition = `transform 5s`;
	// reset the header to no quote
	header.innerHTML = ""

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
	breakDisplay.innerHTML = ""
	// pick and random quote and put it in the header
	getQuote(function(quoteList){
		var x = quoteList[Math.floor(Math.random()*quoteList.length)];
		header.innerHTML =  x.toLowerCase();
	});

	// disable changing duration once started 
	timeInput.disabled = true;
	
	// sound the gong and flip over the hourglass
	gong.play();
	hourglassWhole.style.transform = `rotate(0deg)`
	startButton.disabled = true;

	// wait 3s for hourglass to flip, then start the timer
	setTimeout(startTimer, 3000);

}

function startTimer(){
	var timerVar = setInterval(countDown,1000); // run every second
	var startTime = new Date().getTime()

	function countDown(){
		// decrement timer
		// check against current time (rather than decrementing by 1 each interval) 
		// this prevents issues with setInterval going idle in inactive browser tab
		currentTime = new Date().getTime()
		secondsLeft = Math.round(maxTime - [(currentTime - startTime)/1000])
		// secondsLeft -= 1;
		timerDisplay.innerHTML = clockDisplay(secondsLeft);

		// animate the hourglass every 10 s
		if(secondsLeft % 10 == 0){
			topHeight = parseInt(hourglassTop.height);
			hourglassTop.height = Math.round(150*(1-(secondsLeft/maxTime)));
			bottomHeight = parseInt(hourglassBottom.height);
			hourglassBottom.height = Math.round(150*(secondsLeft/maxTime));
		}

		// reset at 0
		if(secondsLeft <= 0) {
			clearInterval(timerVar);
			notifyEnd();
			gong.play();
			checkMark();
			displayBreak();

			if(counter != 4){
				resetClock();
			}
			else {
				resetButton.disabled = false;
			}
		}
	}	
}


function notifyPerm(){
	// if notications are blocked, request permission
	if (Notification.permission !== "granted"){
		Notification.requestPermission();
	}
}

function notifyEnd(){
	// if notifications are supported and permitted, display notification
	if (!("Notification" in window)) {
		alert("this browser does not support desktop notifications.");
	}
	else if (Notification.permission === "granted") {
		var notification = new Notification("time's up!");
	}
};


function checkMark(){
	// check off the completed round #
	if(counter <= 4){
		var notebookDisplay = document.getElementById("round " + counter);
		notebookDisplay.innerHTML += " ✓";
	}
}

function displayBreak(){
	// short break for rounds 1-3; long break for round 4
	if(counter != 4){
		breakDisplay.innerHTML = "take a short break!";
	}
	else {
		breakDisplay.innerHTML = "all done. take a long break!";
	}
}

function resetSession(){
	// set counter back to 0 and reset the timer
	counter = 0;
	secondsLeft = resetClock();
	breakDisplay.innerHTML = ""
	resetButton.disabled = true;
	// remove the checkboxes
	for(let i =1; i <= 4; i++){
		console.log("hey" + i)
		var notebookDisplay = document.getElementById("round " + i);
		notebookDisplay.innerHTML = "round " + i;
	}
}

function getQuote(callback){
	// wikiquote api call to get and format a list of quotes
    $.ajax({
    	    url: 'https://en.wikiquote.org/w/api.php?action=parse&prop=text&page=English%20proverbs',
            data: { action: 'parse', format: 'json' },
            dataType: 'jsonp',
            success: function (data) {
                fullPage = data.parse.text['*'];
                var lines = fullPage.split("\n");
				var quoteList = []
				for (i in lines){
					if (lines[i].includes("<li>") && lines[i].slice(-1)==".") {
						quoteList.push(lines[i].replace('<li>', ''));
					}
				}
				callback(quoteList);
            }            
	})
};