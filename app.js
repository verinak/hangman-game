var letters = "abcdefghijklmnopqrstuvwxyz";

var answerWord;
var category;

var mistakes = 0;
var lettersFound = 0;

var lettersDiv = document.querySelector('div.letters');
var answerDiv = document.querySelector('div#answer');
var categoryDiv = document.querySelector('div.category');
var hangmanImg = document.querySelector('.game-right img');

var roundPlayDiv = document.getElementById('roundPlay');
var roundOverDiv = document.getElementById('roundOver');

var playAgainBtn = document.querySelector('#roundOver button');

playAgainBtn.addEventListener('click', function (event) {

    // reset variables
    mistakes = 0;
    lettersFound = 0;

    // reset hangman img
    hangmanImg.src = './assets/hangman0.png';

    // get random word
    generateRandomWord();
    // create placeholder spans
    createAnswerPlaceholder();

    // hide round over div 
    roundOverDiv.style.display = 'none';
    roundPlayDiv.style.display = 'block';

    // enable all letters again
    lettersDiv.querySelectorAll('span').forEach(function (span) {
        span.classList.remove('disabled');
        span.addEventListener('click', onLetterClicked);
    })

});

document.addEventListener('DOMContentLoaded', function () {
    // add letter buttons
    for (var i = 0; i < letters.length; i++) {
        // console.log(letter);
        var span = document.createElement('span');
        span.textContent = letters[i];
        span.addEventListener('click', onLetterClicked)
        lettersDiv.insertAdjacentElement('beforeend', span)
    }

    // get random word
    generateRandomWord();
    // create placeholder spans
    createAnswerPlaceholder();
})

function generateRandomWord() {
    var categories = Object.keys(DATA);
    var categoryIdx = Math.floor(Math.random() * categories.length);

    var wordIdx = Math.floor(Math.random() * DATA[categories[categoryIdx]].data.length);
    // console.log(DATA[categories[categoryIdx]].data[wordIdx]);

    answerWord = DATA[categories[categoryIdx]].data[wordIdx];
    category = DATA[categories[categoryIdx]].description;
    console.log('answer word: ', answerWord);
    console.log('category: ', category);
}

function createAnswerPlaceholder() {
    // clear old spans
    answerDiv.textContent = '';

    for (var i = 0; i < answerWord.length; i++) {
        var span = document.createElement('span');
        // add _ for letter and empty span for whitespace
        if (answerWord[i] !== " ") {
            span.textContent = '_';
            span.id = 'char' + i;
        } else {
            lettersFound++;  // hane3teber en el whitespace found la2en el user m4 m7tag yda5alo
        }

        answerDiv.insertAdjacentElement('beforeend', span)
    }

    categoryDiv.textContent = 'Hint: ' + category;
}


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

    // disable button
    event.target.classList.add('disabled');
    event.target.removeEventListener('click', onLetterClicked);

    // check round result

    if (mistakes === 6) {
        // console.log('lost!');
        hangmanImg.src = './assets/hangman-lose.png';
        endRound(false);
    }

    if (lettersFound === answerWord.length) {
        // console.log('won!');
        hangmanImg.src = './assets/hangman-win.png';
        endRound(true)
    }

}

function endRound(win) {
    roundPlayDiv.style.display = 'none';
    roundOverDiv.style.display = 'flex';
    roundOverDiv.querySelector('p').textContent = (win) ? 'You won!' : 'You lost! The answer was \"' + answerWord + '\".';
}