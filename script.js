"use strict"; //enabling strict mode

// Declaring constants
const item1 = document.querySelector("#opening1");
const item2 = document.querySelector("#opening2");
const item3 = document.querySelector("#opening3");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const chessBoard = document.getElementById("chess-board");
const squareE2 = document.getElementById("sq-e2");
const squareE4 = document.getElementById("sq-e4");
const squareC2 = document.getElementById("sq-c2");
const squareC5 = document.getElementById("sq-c5");
const squareG7 = document.getElementById("sq-g7");
const squareB2 = document.getElementById("sq-b2");
const squareD2 = document.getElementById("sq-d2");
const squareF2 = document.getElementById("sq-f2");
const squareF4 = document.getElementById("sq-f4");
const squareD5 = document.getElementById("sq-d5");
const squareF6 = document.getElementById("sq-f6");
const squareC3 = document.getElementById("sq-c3");

// let moves = 0;

const toiletVariation = [
  [squareE2, squareE4],
  [squareC2, squareC5],
  [squareF2, squareF4],
  [squareG7, squareF6],
  [squareB2, squareC3],
  [squareD2, squareD5],
];

item1.addEventListener("click", playButton);

function playButton() {
  // prevBtn.addEventListener("click", prevHandler);
  nextBtn.addEventListener("click", function () {
    nextHandler(toiletVariation[0][0], toiletVariation[0][1]);
  });
}

function nextHandler(sourceMove, destinationMove) {
  destinationMove.append(sourceMove.childNodes[1]);
}

// function nextHandler() {
//   if (moves < 4) {
//     countUp();
//     addActive(moves);
//     console.log(moves);
//   } else {
//     console.log("Already checkmate");
//   }
// }

// function prevHandler() {
//   if (moves > 0) {
//     removeActive(moves);
//     countDown();
//     console.log(moves);
//   } else {
//     console.log("Back to the start");
//   }
// }

// function addActive(moves) {
//   const activeMove = document.querySelector(".move" + moves);
//   activeMove.classList.add("active");
// }

// function removeActive(moves) {
//   const activeMove = document.querySelector(".move" + moves);
//   activeMove.classList.remove("active");
// }
