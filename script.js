const item1 = document.querySelector("#opening1");
const item2 = document.querySelector("#opening2");
const item3 = document.querySelector("#opening3");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const chessBoard = document.getElementById("chess-board");
const squareE2 = document.getElementById("sq-e2");
const squareE4 = document.getElementById("sq-e4");

let moves = 0;

item1.addEventListener("click", playButton);

function playButton() {
  // prevBtn.addEventListener("click", prevHandler);
  nextBtn.addEventListener("click", nextHandler);
}

function nextHandler() {
  squareE4.append(squareE2.childNodes[1]);
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
