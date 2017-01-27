# pomodoro

## summary

pomodoro timer runs in the browser and features an hourglass animation.

default pomodoro duration is 25 minutes. duration is adjustable (minimum 1 minute --> maximum 60 minutes, in 1 minute intervals).

start of each pomodoro:
* sound plays
* page header displays a random proverb pulled from Wikiquote
* hourglass turns over and countdown timer starts

during the pomodoro:
* countdown displays time remaining
* hourglass sand gradually flows down

end of the pomodoro:
* sound plays
* desktop notification displays
* page displays message to take either short break or long break
* round (#1-4) is checked off

## instructions 

npm install and run node index.js

compatibility: tested for Chrome v55

## files

* index.js: express app
* page folder
	- index.html
	- clockstyle.css
	- clock.js
	- image folder with svgs
	- audio folder with mp3 file
