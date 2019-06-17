
let cells = document.querySelectorAll('#game td');
let currentGamer = 'x';
fildGame (cells); // field game

let restart = document.getElementById('restart');
restart.addEventListener('click', restartGame);

function nextStep (){
	this.innerHTML = currentGamer;
		if(currentGamer =='x'){
			currentGamer ='o'
		}else {
			currentGamer ='x';	
		}

	this.removeEventListener('click', nextStep); // don't click twice one cell
	
	let winner = winnerCombination(cells);
	if(winner !== false) {
		finishGame(cells, winner); // o or x
	}else{
		let isField = checkField(cells); 
		if(isField){
			finishGame (cells, winner);// draw
		}
	}
}

// define the winner, if return false (draw) or x, o
function winnerCombination(cells){
	let win_lines = [
		[0,1,2],
		[3,4,5],
		[6,7,8],
		[0,3,6],
		[1,4,7],
		[2,5,8],
		[0,4,8],
		[2,4,6]
	];

	for(let i =0; i< win_lines.length; i++){
		let wl = win_lines[i];
		if(cells[wl[0]].innerHTML == cells[wl[1]].innerHTML && cells[wl[1]].innerHTML == cells[wl[2]].innerHTML && cells[wl[2]].innerHTML != '' ){
			return cells[wl[0]].innerHTML; // o or x
		} 
	}
	return false;
}

function checkField(cells){
	for(let i=0; i<cells.length; i++){
		if(cells[i].innerHTML == ''){
			return false; // check if we have empty cell 
		}
	}
	return true; // draw
}

// add to each item function 
function fildGame (cells){
	for(let i=0; i<cells.length; i++){
		cells[i].innerHTML = ''; // clear cell
		cells[i].addEventListener('click', nextStep);
	}
}

function stopGame(cells){
	for(let i=0; i<cells.length; i++){
		cells[i].removeEventListener('click', nextStep);
	}
}

function showWinner(winner){
	if(winner!==false){
		alert('Winner - '+ winner)
	}else{
		alert('Draw');	
	}
}

// game over
function finishGame (cells, winner){
	stopGame(cells); 
	showWinner(winner);
}

function restartGame(){
	fildGame(cells);
}
