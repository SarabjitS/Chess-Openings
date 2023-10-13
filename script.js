"use strict"; //enabling strict mode

const testBtn = document.getElementById("test-yourself");
const prevBtn = document.querySelector("#prev-button");
const nextBtn = document.querySelector("#next-button");
const chessBoard = document.getElementById("chess-board");
const playBtn = document.getElementById("play-button");
const orientationBtn = document.getElementById("orientation-button");
const soundBtn = document.getElementById("sound-button");
const chooseBtn = document.getElementById("choose-opening");
const dialog = document.querySelector("dialog");

let isPlayer = "white";
let opening = [];
let moveIndex = -1;
let isRotated = false;
let isAudio = true;
let isTraditional = true;
let isHighlighted = false;
let square;
let selectedMove;
let openingSourceMoves = [];
let openingDestinationMoves = [];
let isFlag = false;

renderBoard();

//Different Chess Variations
const toiletVariation = [
  ["e2", "e4", "White moves pawn from e2 to e4"],
  ["c7", "c5", "Black moves pawn from c7 to c5"],
  ["f2", "f4", "White moves pawn from f2 to f4"],
  ["g8", "f6", "Black moves knight from g8 to f6"],
  ["b1", "c3", "White moves knight from b1 to c3"],
  ["d7", "d5", "Black moves pawn from d7 to d5"],
];

const monkeysbumVariation = [
  ["e2", "e4", "White moves pawn from e2 to e4"],
  ["g7", "g6", "Black moves pawn from g7 to g6"],
  ["f1", "c4", "White moves bishop from f1 to c4"],
  ["f8", "g7", "Black moves bishop from f8 to g7"],
  ["d1", "f3", "White moves queen from d1 to f3"],
  ["e7", "e6", "Black moves pawn from e7 to e6"],
  ["d2", "d4", "White moves pawn from d2 to d4"],
  ["g7", "d4", "Black moves bishop from g7 to d4"],
];

const frankesteindraculaVariation = [
  ["e2", "e4", "White moves pawn from e2 to e4"],
  ["e7", "e5", "Black moves pawn from e7 to e5"],
  ["b1", "c3", "White moves knight from b1 to c3"],
  ["g8", "f6", "Black moves knight from g8 to f6"],
  ["f1", "c4", "White moves bishop from f1 to c4"],
  ["f6", "e4", "Black moves knight from f6 to e4"],
];

const italianGame = [
  ["e2", "e4", "White moves pawn from e2 to e4"],
  ["e7", "e5", "Black moves pawn from e7 to e5"],
  ["g1", "f3", "White moves knight from g1 to f3"],
  ["b8", "c6", "Black moves knight from b8 to c6"],
  ["f1", "c4", "White moves bishop from f1 to c4"],
];

const ruyLopezOpening = [
  ["e2", "e4", "White moves pawn from e2 to e4"],
  ["e7", "e5", "Black moves pawn from e7 to e5"],
  ["g1", "f3", "White moves knight from g1 to f3"],
  ["b8", "c6", "Black moves knight from b8 to c6"],
  ["f1", "b5", "White moves bishop from f1 to b5"],
];

const sicilianDefense = [
  ["e2", "e4", "White moves pawn from e2 to e4"],
  ["c7", "c5", "Black moves pawn from c7 to c5"],
];

// Adding Event Listeners

document.addEventListener("click", function (e) {
  if (
    e.target.dataset.name == "opening1" ||
    e.target.dataset.name == "opening2" ||
    e.target.dataset.name == "opening3" ||
    e.target.dataset.name == "opening4" ||
    e.target.dataset.name == "opening5" ||
    e.target.dataset.name == "opening6"
  ) {
    renderBoard();
    if (!e.target.classList.contains("collapsed")) {
      playMove(e.target.innerText);
    } else {
      opening = [];
    }
  }
});

soundBtn.addEventListener("click", function () {
  isAudio = !isAudio;
  if (!isAudio) {
    soundBtn.textContent = "volume_off";
  } else {
    soundBtn.textContent = "volume_up";
  }
});

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

nextBtn.addEventListener("click", function () {
  // console.log(event);
  if (opening.length == 0) {
    selectOpeningModal();
  } else {
    playSound();
    if (moveIndex < opening.length - 1) {
      moveIndex++;
      prevBtn.classList.remove("disabled");
      nextHandler(opening[moveIndex][0], opening[moveIndex][1]);
      generateTutorial(opening[moveIndex][2]);
    }
    if (moveIndex == opening.length - 1) {
      nextBtn.classList.add("disabled");
    }
  }
});

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
        nextBtn.classList.remove("disabled");
      } else if (moveIndex == 0) {
        prevBtn.classList.add("disabled");
        moveIndex--;
      }
    } else {
      console.log("Please make a move first by clicking on next button");
    }
  }
});

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

orientationBtn.addEventListener("click", function () {
  isRotated = !isRotated;
  rotateBoard();
});

playBtn.addEventListener("click", function () {
  if (opening.length == 0) {
    selectOpeningModal();
  } else {
    const id = setInterval(moveIndexChange, 2000);
    // nextHandler(opening[moveIndex][0], opening[moveIndex][1]);
    function moveIndexChange() {
      if (moveIndex < opening.length - 1) {
        moveIndex++;
        prevBtn.classList.remove("disabled");
        nextHandler(opening[moveIndex][0], opening[moveIndex][1]);
        playSound();
        generateTutorial(opening[moveIndex][2]);
        if (moveIndex == opening.length - 1) {
          nextBtn.classList.add("disabled");
          clearInterval(id);
        }
      }
    }
  }
});

testBtn.addEventListener("click", function () {
  renderBoard();

  if (opening.length == 0) {
    selectOpeningModal();
  } else {
    document.getElementById("h2-tutorial").textContent =
      "Where will this piece move to?";
    testStart();
  }
});

// function findSourceMove(moves) {
//   openingMove.push(moves.slice(0, 1));
// }

function testStart() {
  opening.forEach((moves) =>
    openingSourceMoves.push(moves.slice(0, 1).toString())
  );

  opening.forEach((moves) =>
    openingDestinationMoves.push(moves.slice(1, -1).toString())
  );

  console.log(openingDestinationMoves);

  for (let i = 0; i < openingSourceMoves.length; i++) {
    document.getElementById(openingSourceMoves[i]).classList.add("question");
    checkSolution(i);
  }
}

function checkSolution(i) {
  selectMove();
}

// Find the square clicked
function selectMove() {
  document.addEventListener("click", function (e) {
    if (square) {
      square.classList.remove("highlight");
    }
    if (e.target.closest(".sq")) {
      square = e.target.closest(".sq");
      square.classList.add("highlight");
      console.log(square.getAttribute("id"));
      isHighlighted = true;
      // square.getAttribute("id");
    } else {
      console.log("outside Board");
    }
  });
}

// Close the modal
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
  }
}

function selectOpeningModal() {
  dialog.showModal();
}

function playSound() {
  if (isAudio) {
    let audio = new Audio("move.mp3");
    audio.play();
  }
}

function nextHandler(sourceMove, destinationMove) {
  document
    .getElementById(destinationMove)
    .append(document.getElementById(sourceMove).children[0]);

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
  document.getElementById("tutorial-text").innerHTML += `<li>${text}</li>`;
}

function removeTutorial() {
  const list = document.querySelectorAll("ul li");
  const lastItem = list[list.length - 1];
  if (lastItem) {
    lastItem.parentNode.removeChild(lastItem);
    // console.log(list);
  }
}

function resetTutorial() {
  document.getElementById("tutorial-text").innerHTML = "";
}

function playSound() {
  if (isAudio) {
    let audio = new Audio("move.mp3");
    audio.play();
  }
}

function rotateBoard() {
  if (isRotated) {
    orientationBtn.classList.add("material-symbols-outlined-fill");
    chessBoard.classList.add("rotate");
  } else {
    orientationBtn.classList.remove("material-symbols-outlined-fill");

    chessBoard.classList.remove("rotate");
  }
  console.log(isRotated);
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
  // opening = [];
  resetTutorial();
  if (isRotated) {
    rotatePieces();
  }

  if (nextBtn.classList.contains("disabled")) {
    nextBtn.classList.remove("disabled");
  }

  if (prevBtn.classList.contains("disabled")) {
    prevBtn.classList.remove("disabled");
  }

  chessBoard.innerHTML = `<div class="sq" id="a8">
          <img src="./images/pieces/black/rook.png" alt="" />
        </div>
        <div class="sq" id="b8">
          <img src="./images/pieces/black/knight.png" alt="" />
        </div>
        <div class="sq" id="c8">
          <img src="./images/pieces/black/bishop.png" alt="" />
        </div>
        <div class="sq" id="d8">
          <img src="./images/pieces/black/queen.png" alt="" />
        </div>
        <div class="sq" id=" e8">
          <img src="./images/pieces/black/king.png" alt="" />
        </div>
        <div class="sq" id="f8">
          <img src="./images/pieces/black/bishop.png" alt="" />
        </div>
        <div class="sq" id="g8">
          <img src="./images/pieces/black/knight.png" alt="" />
        </div>
        <div class="sq" id="h8">
          <img src="./images/pieces/black/rook.png" alt="" />
        </div>

        <div class="sq" id="a7">
          <img src="./images/pieces/black/pawn.png" alt="" />
        </div>
        <div class="sq" id="b7">
          <img src="./images/pieces/black/pawn.png" alt="" />
        </div>
        <div class="sq" id="c7">
          <img src="./images/pieces/black/pawn.png" alt="" />
        </div>
        <div class="sq" id="d7">
          <img src="./images/pieces/black/pawn.png" alt="" />
        </div>
        <div class="sq" id="e7">
          <img src="./images/pieces/black/pawn.png" alt="" />
        </div>
        <div class="sq" id="f7">
          <img src="./images/pieces/black/pawn.png" alt="" />
        </div>
        <div class="sq" id="g7">
          <img src="./images/pieces/black/pawn.png" alt="" />
        </div>
        <div class="sq" id="h7">
          <img src="./images/pieces/black/pawn.png" alt="" />
        </div>

        <div class="sq" id="a6"></div>
        <div class="sq" id="b6"></div>
        <div class="sq" id="c6"></div>
        <div class="sq" id="d6"></div>
        <div class="sq" id="e6"></div>
        <div class="sq" id="f6"></div>
        <div class="sq" id="g6"></div>
        <div class="sq" id="h6"></div>

        <div class="sq" id="a5"></div>
        <div class="sq" id="b5"></div>
        <div class="sq" id="c5"></div>
        <div class="sq" id="d5"></div>
        <div class="sq" id="e5"></div>
        <div class="sq" id="f5"></div>
        <div class="sq" id="g5"></div>
        <div class="sq" id="h5"></div>

        <div class="sq" id="a4"></div>
        <div class="sq" id="b4"></div>
        <div class="sq" id="c4"></div>
        <div class="sq" id="d4"></div>
        <div class="sq" id="e4"></div>
        <div class="sq" id="f4"></div>
        <div class="sq" id="g4"></div>
        <div class="sq" id="h4"></div>

        <div class="sq" id="a3"></div>
        <div class="sq" id="b3"></div>
        <div class="sq" id="c3"></div>
        <div class="sq" id="d3"></div>
        <div class="sq" id="e3"></div>
        <div class="sq" id="f3"></div>
        <div class="sq" id="g3"></div>
        <div class="sq" id="h3"></div>

        <div class="sq" id="a2">
          <img src="./images/pieces/white/pawn.png" alt="" />
        </div>
        <div class="sq" id="b2">
          <img src="./images/pieces/white/pawn.png" alt="" />
        </div>
        <div class="sq" id="c2">
          <img src="./images/pieces/white/pawn.png" alt="" />
        </div>
        <div class="sq" id="d2">
          <img src="./images/pieces/white/pawn.png" alt="" />
        </div>
        <div class="sq" id="e2">
          <img src="./images/pieces/white/pawn.png" alt="" />
        </div>
        <div class="sq" id="f2">
          <img src="./images/pieces/white/pawn.png" alt="" />
        </div>
        <div class="sq" id="g2">
          <img src="./images/pieces/white/pawn.png" alt="" />
        </div>
        <div class="sq" id="h2">
          <img src="./images/pieces/white/pawn.png" alt="" />
        </div>

        <div class="sq " id="a1">
          <img src="./images/pieces/white/rook.png  " alt="" />
        </div>
        <div class="sq" id="b1">
          <img src="./images/pieces/white/knight.png" alt="" />
        </div>
        <div class="sq" id="c1">
          <img src="./images/pieces/white/bishop.png" alt="" />
        </div>
        <div class="sq" id="d1">
          <img src="./images/pieces/white/queen.png" alt="" />
        </div>
        <div class="sq" id="e1">
          <img src="./images/pieces/white/king.png" alt="" />
        </div>
        <div class="sq" id="f1">
          <img src="./images/pieces/white/bishop.png" alt="" />
        </div>
        <div class="sq" id="g1">
          <img src="./images/pieces/white/knight.png" alt="" />
        </div>
        <div class="sq" id="h1">
          <img src="./images/pieces/white/rook.png" alt="" />
        </div>`;
}
