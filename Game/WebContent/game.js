var timerId;
var body = document.getElementById("body");
var score = 0;
var x = body.clientWidth;
var y = body.clientHeight;

window.onload = function(){
	init();
	console.log(x);
	console.log(y);
}

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

function getHighScore(){
	getData("GET", "rest/winners",displayWinners);
}

function getData(method, url, callback, object){
	var xhr = new XMLHttpRequest();
	xhr.open(method, url);
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

function displayWinners(winners){
	var mole = document.getElementById("mole");
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

function playGame(){
	var topScore = document.getElementById("topScore");
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
		mole.addEventListener("click",function(){
			moveMole(mole);
		});
	}
	else{
		mole = document.createElement("div");
		mole.setAttribute("id", "mole");
		var ul = document.getElementById("navbar");
		var liScore = document.createElement("li");
		var hScore = document.createElement("h2");
		hScore.setAttribute("id","score");
		hScore.innerHTML = score;
		liScore.appendChild(hScore);
		ul.appendChild(liScore);
		mole.addEventListener("click",function(){
			moveMole(mole);
		});
		body.appendChild(mole);
	}
	
}

function moveMole(mole){
	mole.style.marginLeft = (Math.random() * (x - 175)) + "px"; 
	mole.style.marginTop= (Math.random() * (y - 125)) + "px"; 
	score += 50;
	var hScore = document.getElementById("score");
	hScore.innerHTML = score;
}
