$(document).ready(function() {

	let quiz;
	let currentQuestion = 0;
	let score = 0;
	let url = 'https://opentdb.com/api.php?amount=10';

	function playQuiz(){
		fetch(url)
			.then((data) => data.json())
			.then((data) => {
				quiz = data.results;
			})
			.then(() => {
				showNextQuestion();
			})
			.catch(error => console.log(error));
	}


	function showNextQuestion(){
		
		const question = quiz[currentQuestion].question;
		const correctAnswer = quiz[currentQuestion].correct_answer;
		const answers = (quiz[currentQuestion].incorrect_answers.concat(quiz[currentQuestion].correct_answer)).sort();

		// append question and answers to the relevant divs
		$('#question').html(question);
		$('#answers').html('');
		
		answers.forEach((answer) => {
			$('#answers').append('<div class="answer">'+answer+'</div>');
		})

		$('.answer').click(function() { 

			// if the user clicks on the correct answer, increase their score by 1
			if (correctAnswer === $(this).html()) {
				score++;
				$(this).addClass('correct');
			} else {
				$(this).addClass('incorrect');
			}

			$(this).css({'pointer-events': 'none'});
			$('.answer').off('click');

			// if there are more questions, show the next question; otherwise end the quiz
			if (quiz.length === currentQuestion+1){
				setTimeout(endQuiz, 2000);
			} else {
				currentQuestion++;
				setTimeout(showNextQuestion, 2000);
			}
			
		});

	}

	function endQuiz(){
		$('.question-box').css('display', 'none');
		$('#score').css('display', 'flex');
		$('#score').prepend(score + ' / ' + quiz.length);
	}

	$('.category').click(function(){
		
		if ($(this).attr('id') !== 'all'){
			url += '&category='+$(this).attr('id');	
		}

		$('#categories').css('display', 'none');
		$('.question-box').css('display', 'flex');

		playQuiz();
	});


	$('#restart').click(function() {
		location.reload();
	});

});
