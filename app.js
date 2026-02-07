// console.log(DATA.flowers);

var letters = "abcdefghijklmnopqrstuvwxyz";

var answerWord;
var category;

var lettersDiv = document.querySelector('div.letters');
var answerDiv = document.querySelector('div#answer');
var categoryDiv = document.querySelector('div.category');

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
            span.addEventListener('click', onLetterClicked)
        }

        answerDiv.insertAdjacentElement('beforeend', span)
    }

    categoryDiv.textContent = 'Hint: ' + category;
})


function onLetterClicked(event) {
    console.log(event.target.textContent);

    var found = false;
    for (var i = 0; i < answerWord.length; i++) {
        if (event.target.textContent === answerWord[i].toLowerCase()) {
            found = true;
            console.log('correct letter');
            document.getElementById('char' + i).textContent = answerWord[i];
        }
    }
    if (!found) {
        console.log('wrong letter');
    }

    event.target.classList.add('hidden');


}