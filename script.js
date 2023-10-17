//enabling strict mode
"use strict";

import {
  toiletVariation,
  monkeysbumVariation,
  frankesteindraculaVariation,
  italianGame,
  ruyLopezOpening,
  sicilianDefense,
  bongcloudAttackVariation,
} from "./variations.js";

import { chessBoardHTML } from "./chessBoard.js";

//const defined
const orientationBtn = document.getElementById("orientation-button");
const soundBtn = document.getElementById("sound-button");
const prevBtn = document.querySelector("#prev-button");
const playBtn = document.getElementById("play-button");
const nextBtn = document.querySelector("#next-button");
const testBtn = document.getElementById("test-yourself-button");
const hintBtn = document.getElementById("hint-button");

const chessBoard = document.getElementById("chess-board");

const chooseBtn = document.getElementById("choose-opening");
const dialog = document.querySelector("dialog");
const para = document.createElement("p");
const tutorialHeading = document.getElementById("h2-tutorial");

//variables defined
let opening = [];
let moveIndex = -1;
let isRotated = false;
let isAudio = true;
let isTraditional = true;
let square;
let openingSourceMoves = [];
let openingDestinationMoves = [];
let isSucessful = false;
let isTestMode = false;
let i = 0;
let isHint = false;

//Creating chess board
renderBoard();

// Adding Event Listeners

//Listen for click on extra-options button
document.addEventListener("click", (e) => {
  const isDropdownButton = e.target.matches("[data-dropdown-button]");
  if (!isDropdownButton && e.target.closest("[data-dropdown]") != null) return;

  let currentDropdown;
  if (isDropdownButton) {
    currentDropdown = e.target.closest("[data-dropdown]");
    currentDropdown.classList.toggle("active");
  }

  document.querySelectorAll("[data-dropdown].active").forEach((dropdown) => {
    if (dropdown === currentDropdown) return;
    dropdown.classList.remove("active");
  });
});

//Listen for click on orientation button
orientationBtn.addEventListener("click", function () {
  isRotated = !isRotated;
  rotateBoard();
});

//Listen for the opening selected
document.addEventListener("click", function (e) {
  if (
    e.target.dataset.name == "opening1" ||
    e.target.dataset.name == "opening2" ||
    e.target.dataset.name == "opening3" ||
    e.target.dataset.name == "opening4" ||
    e.target.dataset.name == "opening5" ||
    e.target.dataset.name == "opening6" ||
    e.target.dataset.name == "opening7"
  ) {
    renderBoard();
    isTestMode = false;
    if (!e.target.classList.contains("collapsed")) {
      playMove(e.target.innerText);
    } else {
      opening = [];
    }
  }
});

//Listen for sound button clicked on/off
soundBtn.addEventListener("click", function () {
  isAudio = !isAudio;
  if (!isAudio) {
    soundBtn.textContent = "volume_off";
  } else {
    soundBtn.textContent = "volume_up";
  }
});

//Choose between the traditional and funny openings
chooseBtn.addEventListener("click", function () {
  isTraditional = !isTraditional;
  if (!isTraditional) {
    chooseBtn.textContent = "Funny Openings";
    document.querySelectorAll(".traditional").forEach((opening) => {
      opening.classList.add("hidden");
    });
    document.querySelectorAll(".funny").forEach((opening) => {
      opening.classList.remove("hidden");
    });
  } else {
    chooseBtn.textContent = "Traditional Openings";

    document.querySelectorAll(".funny").forEach((opening) => {
      opening.classList.add("hidden");
    });
    document.querySelectorAll(".traditional").forEach((opening) => {
      opening.classList.remove("hidden");
    });
  }
});

//Listen for next button click
nextBtn.addEventListener("click", function () {
  if (opening.length == 0) {
    selectOpeningModal();
  } else {
    // playSound();
    if (moveIndex < opening.length - 1) {
      moveIndex++;
      enableButton(prevBtn);
      nextHandler(opening[moveIndex][0], opening[moveIndex][1]);
      generateTutorial(opening[moveIndex][2]);
    }
    if (moveIndex == opening.length - 1) {
      disableButton(nextBtn);
    }
  }
});

//Listen for previous button click
prevBtn.addEventListener("click", function () {
  if (opening.length == 0) {
    selectOpeningModal();
  } else {
    if (moveIndex >= 0) {
      playSound();
      prevHandler(opening[moveIndex][0], opening[moveIndex][1]);
      removeTutorial();
      if (moveIndex > 0) {
        moveIndex--;
        enableButton(nextBtn);
      } else if (moveIndex == 0) {
        disableButton(prevBtn);
        moveIndex--;
      }
    } else {
      console.log("Please make a move first by clicking on next button");
    }
  }
});

//Listen for play button click
playBtn.addEventListener("click", function () {
  if (opening.length == 0) {
    selectOpeningModal();
  } else {
    const id = setInterval(moveIndexChange, 2000);
    // nextHandler(opening[moveIndex][0], opening[moveIndex][1]);
    function moveIndexChange() {
      if (moveIndex < opening.length - 1) {
        moveIndex++;
        enableButton(prevBtn);
        nextHandler(opening[moveIndex][0], opening[moveIndex][1]);
        playSound();
        generateTutorial(opening[moveIndex][2]);
        if (moveIndex == opening.length - 1) {
          disableButton(nextBtn);
          clearInterval(id);
        }
      }
    }
  }
});

//Listen for test yourself button click
testBtn.addEventListener("click", function () {
  //If no opening selected
  if (opening.length == 0) {
    selectOpeningModal();
  } else {
    renderBoard();
    isTestMode = !isTestMode;
    enableButton(hintBtn);
    if (isTestMode) {
      testBtn.classList.add("btn-danger");

      makeTutorialHeading();
      testStart();
      buttonsOnTestMode();
    } else {
      // isTestMode = false;
      testBtn.classList.remove("btn-danger");
      renderBoard();
    }
  }
});

// Close the dialogue
dialog.addEventListener("click", (e) => {
  const dialogDimensions = dialog.getBoundingClientRect();
  if (
    e.clientX < dialogDimensions.left ||
    e.clientX > dialogDimensions.right ||
    e.clientY < dialogDimensions.top ||
    e.clientY > dialogDimensions.bottom
  ) {
    dialog.close();
  }
});

//Starts the test
function testStart() {
  //Makes an array of only the opening source moves
  opening.forEach((moves) =>
    openingSourceMoves.push(moves.slice(0, 1).toString())
  );

  //Makes an array of only the opening source moves
  opening.forEach((moves) =>
    openingDestinationMoves.push(moves.slice(1, -1).toString())
  );

  //Highlights the first source move piece
  makeSourceMoveHighlight(i);
}

//Listens to hintBtn
hintBtn.addEventListener("click", function () {
  //To toggle the hint button on/off
  isHint = !isHint;

  if (isHint) {
    para.textContent = "Hint";
    moveIndex++;
    resetTutorial();
    generateTutorial(opening[moveIndex][2]); //Provides the hint text
    tutorialHeading.textContent = "Hint";
    disableButton(testBtn);
    hintBtn.textContent = "Go Back";
  } else {
    removeTutorial(); //Clears the hint text
    enableButton(testBtn);
    makeTutorialHeading();
    moveIndex--;
    isHint = false;
    hintBtn.textContent = "Hint ";
    //Creates the tutorial section again (upto the moves already made)
    for (let i = 0; i <= moveIndex; i++) {
      generateTutorial(opening[i][2]);
    }
  }
});

//Listens for clicks on chess board after testStart() has started
chessBoard.addEventListener("click", function (e) {
  if (!isHint && isTestMode) {
    tutorialHeading.appendChild(para);
    if (i < openingSourceMoves.length) {
      if (square) {
        square.classList.remove("highlight");
      }
      if (e.target.closest(".sq")) {
        square = e.target.closest(".sq");
        if (square.getAttribute("id") == openingDestinationMoves[i]) {
          removeSourceMoveHighlight(i);
          moveIndex++;
          nextHandler(opening[moveIndex][0], opening[moveIndex][1]);
          generateTutorial(opening[moveIndex][2]);
          i++;
          para.textContent = "correct";
          if (i <= openingSourceMoves.length - 1) {
            makeSourceMoveHighlight(i);
          } else {
            para.textContent = "";
            isSucessful = true;
            isTestMode = false;
            makeTutorialHeading();
            buttonsOnTestMode();
            testBtn.classList.remove("btn-danger");
            disableButton(hintBtn);
          }
        } else {
          square.classList.add("highlight");
          para.textContent = "Incorrect";
        }
      }
    }
  }
});

function makeSourceMoveHighlight(i) {
  document.getElementById(openingSourceMoves[i]).classList.add("question");
}

function removeSourceMoveHighlight(i) {
  document.getElementById(openingSourceMoves[i]).classList.remove("question");
}

//Changes the value of opening based on accordian option selected
function playMove(title) {
  switch (title) {
    case "The Toilet Variation":
      opening = toiletVariation;
      break;
    case "The Monkey's Bum":
      opening = monkeysbumVariation;
      break;
    case "The Frankenstein-Dracula Variation":
      opening = frankesteindraculaVariation;
      break;
    case "The Italian Game":
      opening = italianGame;
      break;
    case "Ruy López Opening":
      opening = ruyLopezOpening;
      break;
    case "The Sicilian Defense":
      opening = sicilianDefense;
      break;
    case "The Bongcloud Attack":
      opening = bongcloudAttackVariation;
  }
}

// Shows the modal to select opening
function selectOpeningModal() {
  dialog.showModal();
}

// Plays sound if isAudio is true
function playSound() {
  if (isAudio) {
    let audio = new Audio("move.mp3");
    audio.play();
  }
}

// Makes the next move
function nextHandler(sourceMove, destinationMove) {
  playSound();
  document
    .getElementById(destinationMove)
    .append(document.getElementById(sourceMove).children[0]);
  // The most recent piece of square displays
  if (document.getElementById(destinationMove).children[1]) {
    let originalPiece = document
      .getElementById(destinationMove)
      .children[1].getAttribute("src");
    let nowPiece = document
      .getElementById(destinationMove)
      .children[0].getAttribute("src");
    document
      .getElementById(destinationMove)
      .children[0].setAttribute("src", originalPiece);
    document
      .getElementById(destinationMove)
      .children[1].setAttribute("src", nowPiece);
  }
}

function prevHandler(destinationMove, sourceMove) {
  document
    .getElementById(destinationMove)
    .append(document.getElementById(sourceMove).children[0]);
}

function generateTutorial(text) {
  const listItem = document.createElement("li");
  listItem.textContent = text;
  document.getElementById("tutorial-text").appendChild(listItem);
}

function removeTutorial() {
  const list = document.querySelectorAll("ul li");
  const lastItem = list[list.length - 1];
  if (lastItem) {
    lastItem.parentNode.removeChild(lastItem);
  }
}

function resetTutorial() {
  document.getElementById("tutorial-text").textContent = "";
}

function rotateBoard() {
  if (isRotated) {
    orientationBtn.classList.add("material-symbols-outlined-fill");
    chessBoard.classList.add("rotate");
  } else {
    orientationBtn.classList.remove("material-symbols-outlined-fill");

    chessBoard.classList.remove("rotate");
  }
  rotatePieces();
}

function rotatePieces() {
  if (isRotated) {
    document.querySelectorAll(".sq").forEach((piece) => {
      piece.classList.add("rotate");
      // piece.style.transform = `rotate(180deg)`;
    });
  } else {
    document.querySelectorAll(".sq").forEach((piece) => {
      piece.classList.remove("rotate");
    });
  }
}

// check for saved 'darkMode' in localStorage
let darkMode = localStorage.getItem("darkMode");

const darkModeToggle = document.querySelector("#dark-mode-toggle");

const enableDarkMode = () => {
  // 1. Add the class to the body
  document.body.classList.add("darkmode");
  document.querySelector(".accordion-item").classList.add("darkmode");
  // 2. Update darkMode in localStorage
  localStorage.setItem("darkMode", "enabled");
};

const disableDarkMode = () => {
  // 1. Remove the class from the body
  document.body.classList.remove("darkmode");
  document.querySelector(".accordion-item").classList.remove("darkmode");

  // 2. Update darkMode in localStorage
  localStorage.setItem("darkMode", null);
};

// If the user already visited and enabled darkMode
// start things off with it on
if (darkMode === "enabled") {
  enableDarkMode();
}

// When someone clicks the button
darkModeToggle.addEventListener("click", () => {
  // get their darkMode setting
  darkMode = localStorage.getItem("darkMode");

  // if it not current enabled, enable it
  if (darkMode !== "enabled") {
    enableDarkMode();
    // if it has been enabled, turn it off
  } else {
    disableDarkMode();
  }
});

function renderBoard() {
  moveIndex = -1;
  isSucessful = false;
  isHint = false;
  // isTestMode = false;
  makeTutorialHeading();
  resetTutorial();
  buttonsOnTestMode();
  testBtn.classList.remove("btn-danger");
  openingSourceMoves = [];
  openingDestinationMoves = [];
  disableButton(hintBtn);
  i = 0;
  if (nextBtn.classList.contains("disabled")) {
    enableButton(nextBtn);
  }
  disableButton(prevBtn);
  if (playBtn.classList.contains("disabled")) {
    enableButton(playBtn);
  }
  chessBoard.innerHTML = chessBoardHTML;
  if (isRotated) {
    rotatePieces();
  }
}

function makeTutorialHeading() {
  if (isTestMode) {
    tutorialHeading.textContent = "Where will this piece move to?";
  } else if (isSucessful) {
    tutorialHeading.textContent = "Congratulations!!";
  } else {
    tutorialHeading.textContent = "Tutorial";
  }
}

//Target all buttons of btn-group; ie, playBtn, nextBtn and prevBtn
function buttonsOnTestMode() {
  if (isTestMode) {
    for (const child of document.querySelector(".btn-group").children) {
      disableButton(child);
    }
  } else {
    for (const child of document.querySelector(".btn-group").children) {
      // Not including next button as there are no moves left
      if (child == nextBtn) {
        continue;
      }
      enableButton(child);
    }
  }
}

function disableButton(btn) {
  btn.classList.add("disabled");
  btn.setAttribute("aria-disabled", true);
}

function enableButton(btn) {
  btn.classList.remove("disabled");
  btn.setAttribute("aria-disabled", false);
}
