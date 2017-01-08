function startTimer(){
	setInterval(countDown,1000);
}

var secondsLeft = 25*60;
var timerDisplay = document.getElementById("countdown");
timerDisplay.innerHTML = secondsLeft;

function countDown(){
	secondsLeft -= 1;
	timerDisplay.innerHTML = secondsLeft;
}