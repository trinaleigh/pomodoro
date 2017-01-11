# pomodoro

## summary

pomodoro timer runs in the browser and features an hourglass animation.

default pomodoro duration is 25 minutes. duration is adjustable (minimum 5 minutes --> maximum 60 minutes, in 5 minute intervals).

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
* page displays message to take either short break or a long break
* round (#1-4) is checked off

## instructions 

download all files and open index.html in Chrome or run from a local server. note: desktop notifications require a server.

files:
* index.html
* clockstyle.css
* clock.js
* folder with svg image files
* folder with mp3 audio files

compatibility: tested for Chrome v55