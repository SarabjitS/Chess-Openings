console.log(document.querySelector("#opening1"));
const item2 = document.querySelector("#opening2");
const item3 = document.querySelector("#opening3");

let moves = 0;

item1.addEventListener("click", playButton(), false);

function playButton() {
  const prevBtn = document.querySelector("#prev");
  const nextBtn = document.querySelector("#next");
  console.log("test");
}

prevBtn.addEventListener("click", prevHandler, false);
nextBtn.addEventListener("click", nextHandler, false);

function nextHandler() {
  if (moves < 4) {
    countUp();
    addActive(moves);
    console.log(moves);
  } else {
    console.log("Already checkmate");
  }
}

function prevHandler() {
  if (moves > 0) {
    removeActive(moves);
    countDown();
    console.log(moves);
  } else {
    console.log("Back to the start");
  }
}

function addActive(moves) {
  const activeMove = document.querySelector(".move" + moves);
  activeMove.classList.add("active");
}

function removeActive(moves) {
  const activeMove = document.querySelector(".move" + moves);
  activeMove.classList.remove("active");
}

function countUp() {
  return moves++;
}

function countDown() {
  return moves--;
}
