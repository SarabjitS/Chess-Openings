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

// let moves = 0;

const toiletVariation = [
  ["squareE2", "squareE4"],
  ["squarec2", "squarec5"],
  ["squaref2", "sqauref4"],
  ["squareg7", "squaref6"],
  ["b2", "c3"],
  ["d2", "d5"],
];

item1.addEventListener("click", playButton);

function playButton() {
  // prevBtn.addEventListener("click", prevHandler);
  nextBtn.addEventListener("click", function () {
    nextHandler(toiletVariation[0][0], toiletVariation[0][1]);
    console.log(toiletVariation[0][0]);
  });
}

function nextHandler(sourceMove, destinationMove) {
  // sourceMove.append(destinationMove.childNodes[1]);
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
