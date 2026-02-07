var letters = "abcdefghijklmnopqrstuvwxyz";

var answerWord;
var category;

var mistakes = 0;
var lettersFound = 0;

var lettersDiv = document.querySelector('div.letters');
var answerDiv = document.querySelector('div#answer');
var categoryDiv = document.querySelector('div.category');
var hangmanImg = document.querySelector('.game-right img');

document.addEventListener('DOMContentLoaded', function () {

    // add letter buttons
    for (var i = 0; i < letters.length; i++) {
        // console.log(letter);
        var span = document.createElement('span');
        span.textContent = letters[i];
        // span.classList.add('letter-button');
        // console.log(letter);
        span.addEventListener('click', onLetterClicked)
        lettersDiv.insertAdjacentElement('beforeend', span)
    }

    answerWord = 'Hello World' // will be generated isa bs a5alas da el awel
    category = 'Example'

    for (var i = 0; i < answerWord.length; i++) {
        var span = document.createElement('span');
        // empty span for whitespace
        if (answerWord[i] !== " ") {
            span.textContent = '_';
            span.id = 'char' + i;
        } else {
            lettersFound++;  // balafa2 ?
        }

        answerDiv.insertAdjacentElement('beforeend', span)
    }

    categoryDiv.textContent = 'Hint: ' + category;
})


function onLetterClicked(event) {
    // console.log(event.target.textContent);
    var found = false;
    for (var i = 0; i < answerWord.length; i++) {
        if (event.target.textContent === answerWord[i].toLowerCase()) {
            found = true;
            lettersFound++;
            console.log('correct letter');
            document.getElementById('char' + i).textContent = answerWord[i];
        }
    }
    if (!found) {
        console.log('wrong letter');
        mistakes++;
        hangmanImg.src = './assets/hangman' + mistakes + '.png';
    }

    // event.target.classList.add('hidden');
    // disable button
    event.target.classList.add('disabled');
    event.target.removeEventListener('click', onLetterClicked);

    // check round result
    // console.log(mistakes);
    // console.log(lettersFound);

    if (mistakes === 6) {
        console.log('lost!');
        hangmanImg.src = './assets/hangman-lose.png';

        endRound(true);
    }

    if (lettersFound === answerWord.length) {
        // console.log(answerWord.length);
        console.log('won!');
        hangmanImg.src = './assets/hangman-win.png';

        endRound(false)
    }

}

function endRound(win) {

    // disable all buttons
    lettersDiv.querySelectorAll('span').forEach(function (span) {
        span.classList.add('disabled');
        span.removeEventListener('click', onLetterClicked);
    })

}