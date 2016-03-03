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
	play.addEventListener("click", playGame);

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
	clearBoard();
	var play = document.getElementById("play");
	var highScore = document.getElementById("highScores");
	play.removeEventListener("click", playGame);
	play.addEventListener("click", playGame);

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
	body.appendChild(table);
}
//starts game
function playGame(){
	var play = document.getElementById("play");
	play.removeEventListener("click", playGame);
	var topScore = document.getElementById("topScore");
	score = 0;
	var mole = document.getElementById("mole");
	if(mole){
		var ul = document.getElementById("navbar");
		var liScore = document.createElement("li");
		var hScore = document.createElement("h2");
		startTimer();
		hScore.setAttribute("id","score");
		hScore.innerHTML = score;
		liScore.appendChild(hScore);
		ul.appendChild(liScore);
		timeMoveMole();
		addMole(1);
		mole.addEventListener("click",function(){
			moveMole(mole);
			window.clearInterval(moleTimer);
			timeMoveMole();
		});
	}
	else{
		var topScore = document.getElementById("topScore");

		if(topScore){
			topScore.parentNode.removeChild(topScore);
		}
		clearBoard();
		startTimer();
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
		addMole(1);
		mole.addEventListener("click",function(){
			moveMole(mole);
			window.clearInterval(moleTimer);
			timeMoveMole();
		});
		
	}
	
}
//moves the mole
function moveMole(mole){
	var moleX = (Math.random() * (x - 225));
	var moleY = (Math.random() * (y - 375));
	if(mole == document.getElementById("mole1")){
		console.log("in if statement");
		mole.style.marginLeft = moleX + "px"; 
		mole.style.marginTop =  moleY  + "px"; 
	}
	else{
		if(document.getElementById("mole1")){
			mole.style.marginLeft = moleX + "px"; 
			mole.style.marginTop =  (Math.random() * (y - 550)) + "px"; 
		}
		else{
		mole.style.marginLeft = moleX + "px"; 
		mole.style.marginTop =  moleY  + "px"; 
		}
		console.log("in else statement");
	
	}
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
	var moleX = (Math.random() * (x - 225));
	var moleY = (Math.random() * (y - 500));
	if(moleX < x && moleY){
		mole.style.marginLeft =  moleX + "px"; 
		mole.style.marginTop =  (moleY) + "px"; 
	}
	}, 1000);
}

function addWinner(){
	window.clearInterval(timerId);
	timerId = undefined;
	var timer = document.getElementById("timer");
	timer.parentNode.removeChild(timer);
	var play = document.getElementById("play");
	play.addEventListener("click", playGame);
	var mole = document.getElementById("mole");
	var mole1 = document.getElementById("mole1");
	if(moleTimer){
		window.clearInterval(moleTimer);
	}
	
	if(mole){
		mole.parentNode.removeChild(mole);
	}
	if(mole1){
		mole1.parentNode.removeChild(mole1);
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
		getData("PUT", "rest/addWinner", displayWinners, winner);
	})
}

function addMole(num){
	console.log("in add mole");
	var moleNum = "mole" + num;
	moleTimeout = setTimeout(function(){
		var mole = document.createElement("div");
		mole.setAttribute("class", "mole");
		mole.setAttribute("id", moleNum);
		body.appendChild(mole);
		mole.addEventListener("click", function(){
			moveMole(mole);
		});
	}, 5000);
}

function clearBoard(){
	var timer = document.getElementById("timer");
		
	if(timer){
		window.clearInterval(timerId);
		timerId = undefined;
		timer.parentNode.removeChild(timer);
	}

	var form = document.getElementById("winnerForm");
	if(form){
		form.parentNode.removeChild(form);
	}

	var mole = document.getElementById("mole");
	var mole1 = document.getElementById("mole1");
	if(moleTimer){
		window.clearInterval(moleTimer);
	}
	
	if(mole){
		mole.parentNode.removeChild(mole);
	}
	if(mole1){
		mole1.parentNode.removeChild(mole1);
	}
	
	var hScore = document.getElementById("score");
	if(hScore){
		hScore.parentNode.removeChild(hScore);
	}
}