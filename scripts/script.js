let wordDisplay = document.querySelector(".word-display");
let guessesText = document.querySelector(".guesses-text b");
let keyboardDiv = document.querySelector(".keyboard");
let hangmanImage = document.querySelector(".hangman-box img");
let gameModal = document.querySelector(".game-modal");
let playAgainBtn = document.querySelector("button");

let currentWord, correctLetters, wrongGuessCount;
let maxGuesses = 6;

function resetGame() {
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = "images/hangman-0.svg";
    guessesText.innerHTML = `${wrongGuessCount} / ${maxGuesses}`;
    wordDisplay.innerHTML = currentWord
        .split("")
        .map(() => `<li class="letter"></li>`)
        .join("");
    keyboardDiv
        .querySelectorAll("button")
        .forEach((btn) => (btn.disabled = false));
    gameModal.classList.remove("show");
}

function getRandomWord() {
    let { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();
}

function gameOver(isVictory) {
    let modalText = isVictory ? `You got the word` : "The correct word was:";
    gameModal.querySelector("img").src = `images/${
        isVictory ? "victory" : "lost"
    }.gif`;
    gameModal.querySelector("h4").innerText = isVictory
        ? "Congrats"
        : "Game Over!";
    gameModal.querySelector(
        "p"
    ).innerHTML = `${modalText} <b>${currentWord}</b>`;
    gameModal.classList.add("show");
}

function initGame(button, clickedLetter) {
    if (currentWord.includes(clickedLetter)) {
        [...currentWord].forEach((letter, index) => {
            if (letter === clickedLetter) {
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay
                    .querySelectorAll("li")
                    [index].classList.add("guessed");
            }
        });
    } else {
        wrongGuessCount++;
        hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
    }
    button.disabled = true;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    if (wrongGuessCount === maxGuesses) return gameOver(false);
    if (correctLetters.length === currentWord.length) return gameOver(true);
}

for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", (e) =>
        initGame(e.target, String.fromCharCode(i))
    );
}

getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord);
