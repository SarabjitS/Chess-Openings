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

item1.addEventListener("click", playButton);

function playButton() {
  let i = 0;
  nextBtn.addEventListener("click", function () {
    nextHandler(toiletVariation[i][0], toiletVariation[i][1]);

    console.log(toiletVariation[i][0], toiletVariation[i][1]);

    // prevBtn.addEventListener("click", function () {
    //   i--;
    //   Handler(toiletVariation[i][1], toiletVariation[i][0]);
    //   console.log(toiletVariation[i][1], toiletVariation[i][0]);
    // });
    i++;
  });
}
// }

function nextHandler(sourceMove, destinationMove) {
  document
    .getElementById(destinationMove)
    .append(document.getElementById(sourceMove).childNodes[1]);
}
