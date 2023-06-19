var correctWord = "";
var validWords = [];
var possibleAnswers =[];
var guessedWords = [];
var NUM_GUESSES = 6;
var WORD_LENGTH = 5;
var WINNER = false;
var keyboardWord = "";
var dateTime = "";

var messageDiv = document.querySelector("#feedback")
var startButton = document.querySelector("#startButton");
var startScreen = document.querySelector(".start-screen");
var keyboard = document.querySelector(".keyboard");

function pickRandomWord() {
    dateTime = moment().format("YYYYMMDDHHmm");
    var dateNumber = parseInt(dateTime, 10);
    var randomIndex = dateNumber % validWords.length;
    correctWord = validWords[randomIndex].toUpperCase();
    console.log(correctWord);
    checkData();
    //updateGuesses()
};

function getWordList() {
    fetch("https://raw.githubusercontent.com/chidiwilliams/wordle/main/src/data/words.json").then(function(response) {
        response.json().then(function(data) {
            possibleAnswers = data;
            validWords = data;
            //possibleAnswers = data.record.answers;
            //validWords = data.record.allowed.concat(possibleAnswers);
            pickRandomWord();
        })
    });
};

function updateGuesses() {
    var allGuessesTable = document.querySelector("#guessTable");

    allGuessesTable.innerHTML = "";

    for (var i=0; i < NUM_GUESSES; i++) {//create NUM_GUESSES number of guesses
        var newGuess = document.createElement("tr");

        for (var j=0; j < WORD_LENGTH; j++) { //Create WORD_LENGTH number letters
            var newLetter = document.createElement("td");
            newLetter.classList.add("tile");
            if (i < guessedWords.length) {
                newLetter.innerHTML = guessedWords[i][j];

                var checkedOutput = checkWord(guessedWords[i], correctWord);

                if (checkedOutput[j] == 1) {
                    newLetter.classList.add("correct-place")
                }
                else if (checkedOutput[j] == 2) {
                    newLetter.classList.add("misplaced");
                }
                else {
                    newLetter.classList.add("no-place");
                }
            }
            else if (i == guessedWords.length) {
                if (j < keyboardWord.length){
                newLetter.innerHTML = keyboardWord[j];
            }}
            newGuess.appendChild(newLetter);
            checkKeyboard(i,j,checkedOutput);
        }

        allGuessesTable.appendChild(newGuess);
    }
    //get value from input

    //validate the word: right length and in dictionary

    //check against right word -- creating a new element

    //add to our guesses and put on the screen
};


function checkKeyboard(i,j,checkedOutput) {
    if ((i+1) == guessedWords.length) {
        letter = document.querySelector("." + guessedWords[i][j]);
        if (checkedOutput[j] == 1) {
            letter.classList.remove("no-place");
            letter.classList.remove("misplaced");
            letter.classList.add("correct-place");
        }
        else if (checkedOutput[j] == 2) {
            if (!letter.classList.contains("correct_place")) {
            letter.classList.add("misplaced");
        }}
        else if (checkedOutput[j] == 0) {
            if (!letter.classList.contains("correct-place")) {
                if (!letter.classList.contains("misplaced")) {
            letter.classList.add("no-place");
        }}}
    }
}


function checkWord(guessedWord, rightWord) {
    var checkArray = [0, 0, 0, 0, 0];

    var splitRightWord = rightWord.split("");
    var splitGuessedWord = guessedWord.split("");

    for (var i=0; i < WORD_LENGTH; i++) {
        if (splitRightWord[i] == splitGuessedWord[i]) {
            checkArray[i] = 1;
            splitRightWord[i] = null;
            splitGuessedWord[i] = null;
        }
    }
    for (var i=0; i < WORD_LENGTH; i++) {
        if (splitRightWord.indexOf(splitGuessedWord[i]) > -1) {
            var index = splitRightWord.indexOf(splitGuessedWord[i])
            if (checkArray[i] == 0) {
                checkArray[i] = 2;
                splitRightWord[index] = null
            }
        }
    }


    // for loop (i=0; i < WORD_LENGTH; i++)...
    // check letter one at a time

    return checkArray;
};

function setupInputs() {
    var guessInput = document.querySelector("#userInput");
    var guessButton = document.querySelector("#guessButton");
    var messageDiv = document.querySelector("#feedback")

    guessButton.onclick = function() {
        if (WINNER) {
            return
        }
        else {
        if (keyboardWord.length != 5) {
            messageDiv.innerHTML = "5 Letters Please";
            keyboardWord = "";
        }
        else if (!validWords.includes(guessInput.value.toLowerCase())) {
            messageDiv.innerHTML = (keyboardWord + "is Not Contained in Library");
        }
        else {
            var lastGuess = guessInput.value;
            guessedWords.push(lastGuess.toUpperCase());
            guessInput.value = "";

            if (lastGuess.toUpperCase() == correctWord) {
                messageDiv.innerHTML = "Superb!";
                messageDiv.style.fontSize = "40px";
                WINNER = true;
                document.querySelector("#uiDiv").style.visibility = "hidden";
            }
            else {
                if (guessedWords.length != NUM_GUESSES) {
                    messageDiv.innerHTML = "";
                }
                else if (guessedWords.lenght = NUM_GUESSES) {
                    messageDiv.innerHTML = "You're Out of Guesses";
                    messageDiv.style.fontSize = "40px";
                    WINNER = true;
                    document.querySelector("#uiDiv").style.visibility = "hidden";
                }
            }
            updateGuesses();
        }
        }
    }
};



function makeGuess() {
    var guessInput = document.querySelector("#userInput");
    var guessButton = document.querySelector("#guessButton");

    if (keyboardWord.length != 5) {
        messageDiv.innerHTML = "5 Letters Please";
        keyboardWord = "";
    }
    else if (!validWords.includes(keyboardWord.toLowerCase())) {
        messageDiv.innerHTML = (keyboardWord + " IS NOT CONTAINED IN THE LIBRARY");
        keyboardWord = "";
    }
    else {
        var lastGuess = keyboardWord;
        guessedWords.push(lastGuess.toUpperCase());
        keyboardWord = "";

        if (lastGuess.toUpperCase() == correctWord) {
            messageDiv.innerHTML = "SUPERB!";
            messageDiv.style.fontSize = "40px";
            WINNER = true;
            document.querySelector("#uiDiv").style.visibility = "hidden";
        }
        else {
            if (guessedWords.length != NUM_GUESSES) {
                messageDiv.innerHTML = "";
            }
            else if (guessedWords.lenght = NUM_GUESSES) {
                messageDiv.innerHTML = "YOU'RE OUT OF TRIES!";
                messageDiv.style.fontSize = "40px";
                WINNER = true;
                document.querySelector("#uiDiv").style.visibility = "hidden";
            }
        }
    }
    localStorage.setItem("time", JSON.stringify(dateTime));
    localStorage.setItem("guesses", JSON.stringify(guessedWords));
    localStorage.setItem("winState", JSON.stringify(WINNER));
}


function setupKeys() {
    var currentWordDiv = document.querySelector("#current-word")
    document.onkeydown = function(event) {
        if (WINNER == true) {
            return
        }
        else if (event.key == "Enter") {
            makeGuess();
        }

        else if (event.key == "Backspace") {
            keyboardWord = keyboardWord.slice(0,-1);
        }

        else if (event.keyCode >= 65 && event.keyCode <= 90) {
            if (keyboardWord.length < 5){
            keyboardWord += event.key.toUpperCase();
            }}
    currentWordDiv.innerHTML = keyboardWord;
    updateGuesses();
    }
};

function checkData() {
    if (localStorage.length > 0) {
    var time = JSON.parse(localStorage.getItem("time"));
    if (dateTime == time) {
        guessedWords = JSON.parse(localStorage.getItem("guesses"));
        WINNER = JSON.parse(localStorage.getItem("winState"));
        if (WINNER) {
            messageDiv.innerHTML = "Come Back Later for Another Word!"
            messageDiv.style.fontSize = "40px";
        }
        else {
            messageDiv.innerHTML = "Keep Going!";
            messageDiv.style.fontSize = "40px";
        }
    }
}
    setupKeys();
    updateGuesses();
};

function mainStart() {
    keyboard.style.visibility = "hidden"
    var allGuessesTable = document.querySelector("#guessTable");
    allGuessesTable.innerHTML = ""
    startButton.onclick = function() {
        getWordList()
        startScreen.style.visibility = "hidden";
        keyboard.style.visibility = "visible"
    }
}


mainStart();

//getWordList();
