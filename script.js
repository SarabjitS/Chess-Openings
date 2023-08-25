"use strict"; //enabling strict mode

// Declaring constants
const item1 = document.querySelector("#opening1");
const item2 = document.querySelector("#opening2");
const item3 = document.querySelector("#opening3");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const chessBoard = document.getElementById("chess-board");

const toiletVariation = [
  ["e2", "e4"],
  ["c7", "c5"],
  ["f2", "f4"],
  ["g8", "f6"],
  ["b1", "c3"],
  ["d7", "d5"],
];

const monkeysbumVariation = [
  ["e2", "e4"],
  ["g7", "g6"],
  ["f1", "c4"],
  ["f8", "g7"],
  ["d1", "f3"],
  ["e7", "e6"],
  ["d2", "d4"],
  ["g7", "d4"],
];

item1.addEventListener("click", playButton);
item2.addEventListener("click", playButton);

function playButton() {
  let title = arguments[0].target.innerText;
  let opening = [];
  let moveIndex = 0;

  switch (title) {
    case "The Toilet Variation":
      opening = toiletVariation;
      break;
    case "The Monkey's Bum":
      opening = monkeysbumVariation;
      break;
    default:
      alert(title + " is not ready yet");
  }

  nextBtn.addEventListener("click", function () {
    nextHandler(opening[moveIndex][0], opening[moveIndex][1]);
    console.log(opening[moveIndex][0], opening[moveIndex][1]);

    if (moveIndex < opening.length - 1) {
      moveIndex++;
    }
  });
}
// }

function nextHandler(sourceMove, destinationMove) {
  if (document.getElementById(destinationMove).children[0]) {
    document.getElementById(destinationMove).children[0].style.display = "None";
  }

  document
    .getElementById(destinationMove)
    .append(document.getElementById(sourceMove).children[0]);
}

function prevHandler(destinationMove,sourceMove)