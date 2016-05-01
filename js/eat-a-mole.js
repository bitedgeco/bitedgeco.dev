"use strict"
$(document).ready(function() {
// set initial game state
	var score = 0;
	var highScore = 0;
	var countdownVar = 20;
	var intId1 = null;
	var intId2 = null;

	// Listen for start click, play sound, start countdown and serve plates
	$('#start').click(function() {
		score = 0;
		var i = 0;	
		clearInterval(intId1);
		clearInterval(intId2);
		$('#score').html('Score:</br><span class="blue">' + score + '</span>')
		$('#highScore').html('High score:</br><span class="blue">' + highScore + '</span>')
		$('#newHighScore').html('')
		countdownVar = 20;
		var startAudio = new Audio('/audio/start.mp3');
		startAudio.play();
		countdownFun();
		intId1 = setInterval(function(){
			picplate()
			i++
			if (i == 23) {
			    clearInterval(intId1);
			}
		}, 900);
	});
	// Countdown from 20, check score for high score
	function countdownFun(){
		intId2 = setInterval(function(){
			$('#countdown').html(countdownVar);
			if (countdownVar == 0) {
				clearInterval(intId2);
				var endAudio = new Audio('/audio/end.mp3');
				endAudio.play();
				$("#start").focus();
					if (score < highScore) {
						$('#newHighScore').html('<img src="/img/try-again.png">');
						var tryAgainAudio = new Audio('/audio/try-again.mp3');
						tryAgainAudio.play();
						$('#countdown').html('');
					} else if (score == highScore){
						$('#newHighScore').html('<img src="/img/tie.jpg">');
						var tieAudio = new Audio('/audio/tie.mp3');
						tieAudio.play();
						$('#countdown').html('');
					} else {
					$('#newHighScore').html('<img src="/img/new-high-scrore-text.jpg">');
					var cheerAudio = new Audio('/audio/cheer.mp3');
					cheerAudio.play();
					$('#countdown').html('');
					highScore = score;
					$('#highScore').html('High Score:</br><span class="blue">' + highScore + '</span>');
				}
			} else {
				countdownVar--;
			}
		},1000);
	}
	// pic a random plate
	function picplate(){
		var number = Math.random();
		switch (true) {
			case (number < 0.2):
				animatePlate("#plate1");
				break;
			case (number >= 0.2 && number < 0.4):
				animatePlate("#plate2");
				break;
			case (number >= 0.4 && number < 0.6):
				animatePlate("#plate3");
				break;
			case (number >= 0.6 && number < 0.8):
				animatePlate("#plate4");
				break;
			case (number >= 0.8):
				animatePlate("#plate5");
				break;
			console.log(number)
		};
	}
	// serve a plate
	function animatePlate(plateid) {
		$(plateid).html('<img src="/img/mole-round-100px.png">');
		$(plateid).addClass('food');
		setTimeout(function(){
			$(plateid).html('<img src="/img/plate-empty-100.png".png>');
			$(plateid).removeClass('food');
		},1100);
	}
	//listen for user clicks on plates, if user clicks on food add a point, play sound, put food in spoon
	$('.plate').click(function() {
		if ($(this).hasClass('food')){
			$('*').css('cursor','url(/img/spoon-food.png),auto');
			score++;
			$('#score').html('Score:</br><span class="blue">' + score + '</span>')
			var munchAudio = new Audio('/audio/munch.mp3');
			munchAudio.play();
			$(this).removeClass('food');
			if (score > highScore && countdownVar > 0) {
				$('#newHighScore').html('New High Score!')
			}
			$('#highScore').html('High Score:</br><span class="blue">' + highScore + '</span>');
		} else {
			var missAudio = new Audio('/audio/miss.mp3');
			missAudio.play();
		}
	});
	// chang curser from with food to empty when mouse moves off of plate. 
	$('.plate').hover(function(){},
	function(){
		$('*').css('cursor','url(/img/spoon-empty.png),auto');
	});
});