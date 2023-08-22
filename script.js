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
const squareC7 = document.getElementById("sq-c7");
const squareC5 = document.getElementById("sq-c5");
const squareG8 = document.getElementById("sq-g8");
const squareB1 = document.getElementById("sq-b1");
const squareD7 = document.getElementById("sq-d7");
const squareF2 = document.getElementById("sq-f2");
const squareF4 = document.getElementById("sq-f4");
const squareD5 = document.getElementById("sq-d5");
const squareF6 = document.getElementById("sq-f6");
const squareC3 = document.getElementById("sq-c3");

const toiletVariation = [
  [squareE2, squareE4],
  [squareC7, squareC5],
  [squareF2, squareF4],
  [squareG8, squareF6],
  [squareB1, squareC3],
  [squareD7, squareD5],
];

item1.addEventListener("click", playButton);

function playButton() {
  // for (let i = 0; i < toiletVariation.length; i++) {
  let i = 0;
  nextBtn.addEventListener("click", function () {
    nextHandler(toiletVariation[i][0], toiletVariation[i][1]);

    console.log(toiletVariation[i][0], toiletVariation[i][1]);
    i++;
  });
}
// }

function nextHandler(sourceMove, destinationMove) {
  destinationMove.append(sourceMove.childNodes[1]);
}
