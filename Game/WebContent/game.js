var timerId;
var moleTimer;
var moleTimout;
var body = document.getElementById("body");
var score = 0;
var x = body.clientWidth;
var y = body.clientHeight;
//onload
window.onload = function(){
	init();
}
//initializes the app
function init(){
	var play = document.getElementById("play");
	var highScore = document.getElementById("highScores");
	play.addEventListener("click", function(){
		playGame();
	});

	highScore.addEventListener("click", function(){
		getHighScore();
	});
}
//gets all the scores
function getHighScore(){
	getData("GET", "rest/winners",displayWinners);
}
//can get, put, post, and delete winners
function getData(method, url, callback, object){
	var xhr = new XMLHttpRequest();
	xhr.open(method, url);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 && xhr.status < 400){
			if(callback){
				callback(JSON.parse(xhr.responseText));
			}
		}
	}
	if(object){
		xhr.send(JSON.stringify(object));
	}
	else{
		xhr.send(null);
	}
}
//gets the winners
function displayWinners(winners){
	if(timerId){
		window.clearInterval(timerId);
		var timer = document.getElementById("timer");
		timer.parentNode.removeChild(timer);
	}
	var form = document.getElementById("winnerForm");
	if(form){
		form.parentNode.removeChild(form);
	}
	var mole = document.getElementById("mole");
	if(moleTimer){
		window.clearInterval(moleTimer);
	}
	var bodyDiv = document.getElementById("body");
	var hScore = document.getElementById("score");
	if(mole){
		mole.parentNode.removeChild(mole);
	}
	if(hScore){
		hScore.parentNode.removeChild(hScore);
		score = 0;
	}
	var table = document.createElement("table");
	table.setAttribute("id", "topScore");
	var thr = document.createElement("tr");
	var th1 = document.createElement("th");
	th1.innerHTML = "Name";
	thr.appendChild(th1);
	var th2 = document.createElement("th");
	th2.innerHTML = "Score";
	thr.appendChild(th2);
	table.appendChild(thr);
	for(var i = 0; i<winners.length; i++){
		var tr = document.createElement("tr");
		var td1 = document.createElement("td");
		td1.innerHTML = winners[i].winnerName;
		tr.appendChild(td1);
		var td2 = document.createElement("td");
		td2.innerHTML = winners[i].score;
		tr.appendChild(td2);
		table.appendChild(tr);
	}
	bodyDiv.appendChild(table);
}
//starts game
function playGame(){
	var topScore = document.getElementById("topScore");
	startTimer();
	if(topScore){
		topScore.parentNode.removeChild(topScore);
	}
	var mole = document.getElementById("mole");
	if(mole){
		var ul = document.getElementById("navbar");
		var liScore = document.createElement("li");
		var hScore = document.createElement("h2");
		hScore.setAttribute("id","score");
		hScore.innerHTML = score;
		liScore.appendChild(hScore);
		ul.appendChild(liScore);
		timeMoveMole();
		mole.addEventListener("click",function(){
			moveMole(mole);
			addMole(1);
			window.clearInterval(moleTimer);
			timeMoveMole();
		});
	}
	else{
		mole = document.createElement("div");
		mole.setAttribute("id", "mole");
		mole.setAttribute("class", "mole");
		var ul = document.getElementById("navbar");
		var liScore = document.createElement("li");
		var hScore = document.createElement("h2");
		hScore.setAttribute("id","score");
		hScore.innerHTML = score;
		liScore.appendChild(hScore);
		ul.appendChild(liScore);
		body.appendChild(mole);
		timeMoveMole();
		mole.addEventListener("click",function(){
			moveMole(mole);
			window.clearInterval(moleTimer);
			timeMoveMole();
		});
		
	}
	
}
//moves the mole
function moveMole(mole){
	mole.style.marginLeft = (Math.random() * (x - 225)) + "px"; 
	mole.style.marginTop= (Math.random() * (y - 125)) + "px"; 
	score += 50;
	var hScore = document.getElementById("score");
	hScore.innerHTML = score;
}
//start the timer
function startTimer(){
	var ul = document.getElementById("navbar");
		var liTimer = document.createElement("li");
		var timer = document.createElement("h2");
		timer.setAttribute("id", "timer");
		timer.innerHTML=30;
	timerId = setInterval(function(){
			if(timer.innerHTML== 0){
				addWinner();

			} 
			else{
				timer.innerHTML--;
			}
		liTimer.appendChild(timer);
		ul.appendChild(liTimer);
		
	},1000);
}
//moves mole after a certain point
function timeMoveMole(){
	var mole = document.getElementById("mole");
	moleTimer = setInterval(function(){
		mole.style.marginLeft = (Math.random() * (x - 225)) + "px"; 
		mole.style.marginTop= (Math.random() * (y - 125)) + "px"; 
	}, 1000);
}

function addWinner(){
	if(timerId){
		window.clearInterval(timerId);
		var timer = document.getElementById("timer");
		timer.parentNode.removeChild(timer);
	}
	var mole = document.getElementById("mole");
	if(moleTimer){
		window.clearInterval(moleTimer);
	}
	var bodyDiv = document.getElementById("body");
	var hScore = document.getElementById("score");
	if(mole){
		mole.parentNode.removeChild(mole);
	}
	var winnerForm = document.createElement("form");
	winnerForm.setAttribute("id", "winnerForm");
	var winnerInput = document.createElement("input");
	winnerInput.type = "text";
	winnerInput.name = "winnerName";
	winnerInput.placeholder = "Enter your name";
	winnerForm.appendChild(winnerInput);
	var winnerSubmit = document.createElement("input");
	winnerSubmit.type = "submit";
	winnerSubmit.value = "Submit";
	winnerForm.appendChild(winnerSubmit);
	body.appendChild(winnerForm);

	winnerSubmit.addEventListener("click", function(event){
		event.preventDefault();
		var winner = {};
		winner.winnerName = winnerInput.value;
		winner.score = score;
		getData("PUT", "rest/addWinner", undefined, winner);
		getHighScore();
	})
}

function addMole(num){
	var moleNum = "mole" + num;
	moleTimeout = setTimout(function(){
		var mole = document.createElement("div");
		mole.setAttribute("class", "mole");
		mole.setAttribute("id", moleNum);
		body.appendChild(mole);
		mole.addEventListener("click", function(){
			moveMole();
		});
	}, 1000);
}