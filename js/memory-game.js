"use strict";
$(document).ready(function() {
	 // set initial game state
	$('#repeatSequence').hide();
	$('#watchSequence').hide();
	var playerPressCount = 0;
	var sequence = [];
	// listen for start button then call simonsTurn()
	$('#start').click(function() {
		playerPressCount = 0;
		sequence.length = 0;
		watchSequence();
		simonsTurn();
		countLevel();
	});
	// call picSquare() to add a box to sequence array
	// call animateSequence() to highlihgt a box in the sequens every second
	function simonsTurn(){
		picSquare();
		var i = 0;
		var intervalId = setInterval(function(){
			animateSequence(i);
		    i++;
		    if (i >= sequence.length) {
		        clearInterval(intervalId);
		        repeatSequence();
		    }
		},600);
	}
	// loop through sequence highlighing boxes
	function animateSequence(i) {
		if (sequence[i] == 'topLeft') {
			animateBox('#topLeft');
		} else if (sequence[i] == 'topRight') {
			animateBox('#topRight');
		} else if (sequence[i] == 'bottomLeft') {
			animateBox('#bottomLeft');
		} else if (sequence[i] == 'bottomRight') {
			animateBox('#bottomRight');
		};
	}
	// pic a random box and add it to sequence array
	function picSquare(){
		var number = Math.random();
		switch (true) {
			case (number < 0.25):
				sequence.push('topLeft');
				break;
			case (number >= 0.25 && number < 0.5):
				sequence.push('topRight');
				break;
			case (number >= 0.5 && number < 0.75):
				sequence.push('bottomLeft');
				break;
			case (number >= 0.75):
				sequence.push('bottomRight');
				break;
		};
	};
	// listen for user click on box, compare to corresponding sequence aray element 
	// if correct before end of sequens add 1 to player count
	// if corect at end of sequense call simonsTurn() 
	// if incorect call gameOver()
	$('.box').click(function() {
		animateBox('#' + $(this).attr('id'));
		if (sequence[playerPressCount] == $(this).attr('id')){
			playerPressCount++;
			if (sequence.length == playerPressCount){
				watchSequence();
				simonsTurn();
				playerPressCount = 0;
				countLevel();
			}
		} else {
			gameOver();
			$('h1').html('Simple Simon');
		}
	});
	// Tell user game is over and resets playerPressCount and sequence array
	function gameOver(){
		$('#pressStart').show();
		$('#pressStart').html('Game over<br>you reached level ' + sequence.length + '<br>press start to play again');
		$('#repeatSequence').hide();
		$('#watchSequence').hide();
		$('h1').html('Simple Simon');
		playerPressCount = 0;
		sequence.length = 0;
	}

	function animateBox(boxid){
		$(boxid).animate({opacity: 1}, 100);
		$(boxid).animate({borderWidth: 1}, 100);
		$(boxid).animate({opacity: .5}, 100);
		$(boxid).animate({borderWidth: 0}, 100);
	}

	function repeatSequence() {
		setTimeout(function(){
			$('#repeatSequence').show();
			$('#watchSequence').hide();
			$('#pressStart').hide();
		},500);
	}

	function watchSequence() {
		setTimeout(function(){
			$('#watchSequence').show();
			$('#repeatSequence').hide();
			$('#pressStart').hide();
		},500);
	}

	function countLevel(){
		setTimeout(function(){
			$('h1').html('Level '+ sequence.length);
		},300);
	}
});