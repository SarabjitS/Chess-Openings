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
const orientationBtn = document.querySelector(".orientation-button");
const soundBtn = document.querySelector(".sound-button");
const speedBtn = document.querySelector(".speed-button");
const prevBtn = document.querySelector("#prev-button");
const playBtn = document.getElementById("play-button");
const nextBtn = document.querySelector("#next-button");
const testBtn = document.getElementById("test-yourself-button");
const hintBtn = document.getElementById("hint-button");
const chessBoard = document.getElementById("chess-board");
const chooseBtn = document.getElementById("choose-opening");
const dialog = document.querySelector("dialog");
const tutorialHeading = document.getElementById("h2-tutorial");
const hamburger = document.querySelector(".hamburger");
const bar1 = document.querySelector(".bar1");
const bar2 = document.querySelector(".bar2");
const bar3 = document.querySelector(".bar3");
const mobileNav = document.querySelector(".mobileNav");
const darkModeToggle = document.querySelectorAll(".dark-mode-toggle");

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
let id;
let isPlay = false;
let speed = 1250;
let isSpeed = false;

//Creating chess board
renderBoard();

//Prevent double click zoom
document.ondblclick = function (e) {
  e.preventDefault();
};
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
    isTestMode = false;
    renderBoard();
    //When opening is clicked again to close, Bootstrap adds .collapsed class
    if (!e.target.classList.contains("collapsed")) {
      playMove(e.target.innerText);
    } else {
      opening = [];
    }
  }
});

//Listen for click on orientation button
// orientationBtn.forEach((orientation) => {
orientationBtn.addEventListener("click", function () {
  isRotated = !isRotated;
  rotateBoard();
  console.log("clicked");
});
// });

//Listen for sound button clicked on/off
// soundBtn.forEach((soundBtn) => {
soundBtn.addEventListener("click", function () {
  isAudio = !isAudio;
  if (!isAudio) {
    soundBtn.textContent = "volume_off";
  } else {
    soundBtn.textContent = "volume_up";
  }
  console.log("clicked");
});
// });

// speedBtn.forEach((soundBtn) => {
speedBtn.addEventListener("click", function () {
  isSpeed = !isSpeed;
  if (isSpeed) {
    speed = 800;
    speedBtn.style = "transform: scaleX(1);";
  } else {
    speed = 1250;
    speedBtn.style = "transform: scaleX(-1);";
  }
  console.log("clicked");
});
// });

hamburger.addEventListener("click", () => {
  bar1.classList.toggle("animateBar1");
  bar2.classList.toggle("animateBar2");
  bar3.classList.toggle("animateBar3");
  mobileNav.classList.toggle("openDrawer");
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
  if (opening.length === 0) {
    showDialog("Please select an opening first");
  } else {
    if (isPlay) {
      stopPlayBtn();
    }
    // playSound();

    if (moveIndex <= opening.length - 1) {
      moveIndex++;
      enableButton(prevBtn);
      nextHandler(opening[moveIndex][0], opening[moveIndex][1]);
      generateTutorial(opening[moveIndex][2]);
      if (moveIndex === opening.length - 1) {
        disableButton(nextBtn);
        disableButton(playBtn);
      }
    }
  }
});

//Listen for previous button click
prevBtn.addEventListener("click", function () {
  if (isSucessful) {
    // isTestMode = !isTestMode;
    isSucessful = !isSucessful;
    makeTutorialHeading();
  }

  if (opening.length == 0) {
    showDialog("Please select an opening first");
  } else {
    if (isPlay) {
      stopPlayBtn();
    }
    // When opening has been selected
    if (moveIndex >= 0) {
      //When move has been played by nextBtn or playBtn
      playSound();
      prevHandler(opening[moveIndex][0], opening[moveIndex][1]);
      removeTutorial();
      if (moveIndex > 0) {
        // When test mode finishes and user clicks prevBtn
        enableButton(nextBtn);
        enableButton(playBtn);
      } else {
        // When no moves left
        disableButton(prevBtn);
      }
      moveIndex--;
    } else {
      // When opening selected but no move has been played
      showDialog(
        "Please make a move first by clicking on Next button or Play button"
      );
    }
  }
});

//Listen for play button click
playBtn.addEventListener("click", function () {
  isPlay = !isPlay;
  if (opening.length == 0) {
    showDialog("Please select an opening first");
  } else {
    if (isPlay) {
      id = setInterval(playBtnHandler, speed);
      replacePlaytoPause();
    } else {
      clearInterval(id);
      replacePauseToPlay();
    }
  }
});

//Listen for test yourself button click
testBtn.addEventListener("click", function () {
  //If no opening selected
  if (opening.length == 0) {
    showDialog("Please select an opening first");
  } else {
    renderBoard();
    isTestMode = !isTestMode;
    enableButton(hintBtn);
    if (isTestMode) {
      makeTutorialHeading();
      testStart();
      buttonsOnTestMode();
    } else {
      disableButton(hintBtn);
      isTestMode = false;
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
    showDialog("Please click on Go Back button to go back to test");
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
  console.log("started");

  if (!isHint && isTestMode) {
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
          tutorialHeading.textContent = "correct";
          if (i <= openingSourceMoves.length - 1) {
            makeSourceMoveHighlight(i);
          } else {
            isSucessful = true;
            isTestMode = false;
            makeTutorialHeading();
            buttonsOnTestMode();
            testBtn.classList.remove("btn-danger");
            disableButton(hintBtn);
          }
        } else {
          square.classList.add("highlight");
          tutorialHeading.textContent = "Incorrect";
        }
      }
    }
  }
});

function playBtnHandler() {
  moveIndex++;
  if (moveIndex <= opening.length - 1) {
    enableButton(prevBtn);
    nextHandler(opening[moveIndex][0], opening[moveIndex][1]);
    playSound();
    generateTutorial(opening[moveIndex][2]);
    if (moveIndex == opening.length - 1) {
      disableButton(nextBtn);
      clearInterval(id);
      replacePauseToPlay();
      disableButton(playBtn);
    }
  }
}

function replacePauseToPlay() {
  document
    .querySelector(".play-btn-icon")
    .classList.replace("bi-pause-circle-fill", "bi-play-circle-fill");
}

function replacePlaytoPause() {
  document
    .querySelector(".play-btn-icon")
    .classList.replace("bi-play-circle-fill", "bi-pause-circle-fill");
}

// Stops playBtnHandler() execution if next or prev button is clicked
function stopPlayBtn() {
  clearInterval(id);
  replacePauseToPlay();
  isPlay = !isPlay;
}
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
function showDialog(text) {
  dialog.textContent = text;
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
    .insertBefore(
      document.getElementById(sourceMove).children[0],
      document.getElementById(destinationMove).firstChild
    );
  console.log(document.getElementById(destinationMove).children[1]);
  if (document.getElementById(destinationMove).children[1]) {
    document.getElementById(destinationMove).children[1].style.display = "none";
  }
}

// For executing prevBtn moves
function prevHandler(destinationMove, sourceMove) {
  if (document.getElementById(sourceMove).children[1]) {
    document.getElementById(sourceMove).children[1].style.display = "block";
  }
  document
    .getElementById(destinationMove)
    .append(document.getElementById(sourceMove).children[0]);
}

// For generating tutorial text list item
function generateTutorial(text) {
  const listItem = document.createElement("li");
  listItem.textContent = text;
  document.getElementById("tutorial-text").appendChild(listItem);
}

// For removing tutorial text list item
function removeTutorial() {
  const list = document.querySelectorAll("ol li");
  const lastItem = list[list.length - 1];
  if (lastItem) {
    lastItem.parentNode.removeChild(lastItem);
  }
}

// For resetting the tutorial text completely
function resetTutorial() {
  document.getElementById("tutorial-text").textContent = "";
}

// For rotating the chess board
function rotateBoard() {
  if (isRotated) {
    // orientationBtn.forEach((orientation) => {
    orientationBtn.classList.add("material-symbols-outlined-fill");
    // });
    chessBoard.classList.add("rotate");
    // removeWhiteNotations();
  } else {
    // orientationBtn.forEach((orientation) => {
    orientationBtn.classList.remove("material-symbols-outlined-fill");
    // });
    // removeBlackNotations();
    chessBoard.classList.remove("rotate");
  }
  rotatePieces();
}

//For rotating the chess board pieces
function rotatePieces() {
  if (isRotated) {
    document.querySelectorAll(".sq-block").forEach((piece) => {
      piece.classList.add("rotate");
    });

    removeWhiteNotations();
  } else {
    document.querySelectorAll(".sq-block").forEach((piece) => {
      piece.classList.remove("rotate");
    });
    removeBlackNotations();
  }
}

function removeBlackNotations() {
  document.querySelectorAll(".sq-notation-black ").forEach((piece) => {
    piece.classList.add("hidden");
  });
  document.querySelectorAll(".sq-notation-white ").forEach((piece) => {
    piece.classList.remove("hidden");
  });
}

function removeWhiteNotations() {
  document.querySelectorAll(".sq-notation-white ").forEach((piece) => {
    piece.classList.add("hidden");
  });
  document.querySelectorAll(".sq-notation-black ").forEach((piece) => {
    piece.classList.remove("hidden");
  });
}

// check for saved 'darkMode' in localStorage
let darkMode = localStorage.getItem("darkMode");

const enableDarkMode = () => {
  // 1. Add the class to the body
  document.body.classList.add("darkmode");
  // 2. Update darkMode in localStorage
  localStorage.setItem("darkMode", "enabled");
};

const disableDarkMode = () => {
  // 1. Remove the class from the body
  document.body.classList.remove("darkmode");
  document.querySelector(".accordion-item").classList.remove("darkmode");

  // 2. Update darkMode in localStorage
  localStorage.removeItem("darkMode");
};

// If the user already visited and enabled darkMode
// start things off with it on
if (darkMode === "enabled") {
  enableDarkMode();
}

// When someone clicks the button
darkModeToggle.forEach((darkMode1) => {
  darkMode1.addEventListener("click", () => {
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
});

// For rendering the chess board at start, when an opening is selected
// and when  testBtn is turned on/off
function renderBoard() {
  // Change to default values
  moveIndex = -1;
  isSucessful = false;
  isHint = false;
  openingSourceMoves = [];
  openingDestinationMoves = [];
  i = 0;
  isPlay = false;
  hintBtn.textContent = "Hint";

  // To stop the playBtn execution if new opening or testBtn clicked
  clearInterval(id);

  //Bring to the original layout
  testBtn.classList.remove("btn-danger");
  disableButton(hintBtn);
  makeTutorialHeading();
  resetTutorial();
  buttonsOnTestMode();

  // Enable all buttons of btn-group class(playBtn, nextBtn and prevBtn) if disabled
  for (const child of document.querySelector(".btn-group").children) {
    // if (child.classList.contains("disabled")) enableButton(child);
    if (child.hasAttribute("disabled")) {
      enableButton(child);
    }
  }

  if (testBtn.hasAttribute("disabled")) {
    enableButton(testBtn);
  }

  if (
    document
      .querySelector(".play-btn-icon")
      .classList.contains("bi-pause-circle-fill")
  ) {
    replacePauseToPlay();
  }

  // Renders chess board
  chessBoard.innerHTML = chessBoardHTML;

  // Preserves the orientation of chess pieces
  if (isRotated) {
    rotatePieces();
  }
}

function makeTutorialHeading() {
  if (isTestMode) {
    tutorialHeading.textContent = "Where should the highlighted piece go?";
  } else if (isSucessful) {
    tutorialHeading.textContent = "Congratulations!!";
  } else {
    tutorialHeading.textContent = "Tutorial";
  }
}

// Target all buttons of btn-group; ie, playBtn, nextBtn and prevBtn
function buttonsOnTestMode() {
  if (isTestMode) {
    for (const child of document.querySelector(".btn-group").children) {
      disableButton(child);
    }
  } else {
    for (const child of document.querySelector(".btn-group").children) {
      // Not including next button and playBtn as there are no moves left
      if (child == nextBtn || child == playBtn) {
        continue;
      }
      enableButton(child);
    }
  }
}

function disableButton(btn) {
  // btn.classList.add("disabled");
  btn.setAttribute("disabled", "");
  btn.setAttribute("aria-disabled", true);
}

function enableButton(btn) {
  // btn.classList.remove("disabled");
  btn.removeAttribute("disabled");
  btn.setAttribute("aria-disabled", false);
}
