var gong = new Audio('audio/gong.mp3');

var startButton = document.getElementById("button")

function startTimer(){
	setInterval(countDown,1000);
	gong.play()
	startButton.disabled = true;
	startButton.style.backgroundColor = "#BA004C";

}

var secondsLeft = 25*60;
var timerDisplay = document.getElementById("countdown");
timerDisplay.innerHTML = secondsLeft;

function countDown(){
	secondsLeft -= 1;
	timerDisplay.innerHTML = secondsLeft;
}