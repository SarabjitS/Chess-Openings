const chessBoardHTML = `
<div class="sq-block">
  <div class="sq" id="a8">
    <img src="./images/pieces/black/rook.png" alt="" />
  </div>
  <div class="sq-notation-white number">8</div>
  <div class="sq-notation-black hidden character">a</div>
</div>
<div class="sq-block">
  <div class="sq" id="b8">
    <img src="./images/pieces/black/knight.png" alt="" />
  </div>
  <div class="sq-notation-black hidden character">b</div>
</div>
<div class="sq-block">
  <div class="sq" id="c8">
    <img src="./images/pieces/black/bishop.png" alt="" />
  </div>
  <div class="sq-notation-black hidden character">c</div>
</div>
<div class="sq-block">
  <div class="sq" id="d8">
    <img src="./images/pieces/black/queen.png" alt="" />
  </div>
  <div class="sq-notation-black hidden character">d</div>
</div>
<div class="sq-block">
  <div class="sq" id=" e8">
    <img src="./images/pieces/black/king.png" alt="" />
  </div>
  <div class="sq-notation-black hidden character">e</div>
</div>
<div class="sq-block">
  <div class="sq" id="f8">
    <img src="./images/pieces/black/bishop.png" alt="" />
  </div>
  <div class="sq-notation-black hidden character">f</div>
</div>
<div class="sq-block">
  <div class="sq" id="g8">
    <img src="./images/pieces/black/knight.png" alt="" />
  </div>
  <div class="sq-notation-black hidden character">g</div>
</div>
<div class="sq-block">
  <div class="sq" id="h8">
    <img src="./images/pieces/black/rook.png" alt="" />
  </div>
  <div class="sq-notation-black hidden number">8</div>
  <div class="sq-notation-black hidden character">h</div>
</div>
<div class="sq-block">
  <div class="sq" id="a7">
    <img src="./images/pieces/black/pawn.png" alt="" />
  </div>
  <div class="sq-notation-white number">7</div>
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
<div class="sq-block">
  <div class="sq" id="h7">
    <img src="./images/pieces/black/pawn.png" alt="" />
  </div>
  <div class="sq-block">
    <div class="sq-notation-black hidden number">7</div>
  </div>
</div>
<div class="sq-block">
  <div class="sq" id="a6">
    <div class="sq-notation-white number">6</div>
  </div>
</div>
<div class="sq" id="b6"></div>
<div class="sq" id="c6"></div>
<div class="sq" id="d6"></div>
<div class="sq" id="e6"></div>
<div class="sq" id="f6"></div>
<div class="sq" id="g6"></div>
<div class="sq-block">
  <div class="sq" id="h6">
    <div class="sq-notation-black hidden number">6</div>
  </div>
</div>
<div class="sq-block">
  <div class="sq" id="a5">
    <div class="sq-notation-white number">5</div>
  </div>
</div>
<div class="sq" id="b5"></div>
<div class="sq" id="c5"></div>
<div class="sq" id="d5"></div>
<div class="sq" id="e5"></div>
<div class="sq" id="f5"></div>
<div class="sq" id="g5"></div>
<div class="sq" id="h5">
  <div class="sq-block">
    <div class="sq-notation-black hidden number">5</div>
  </div>
</div>
<div class="sq-block">
  <div class="sq" id="a4">
    <div class="sq-notation-white number">4</div>
  </div>
</div>
<div class="sq" id="b4"></div>
<div class="sq" id="c4"></div>
  <div class="sq" id="d4"></div>
<div class="sq" id="e4"></div>
<div class="sq" id="f4"></div>
<div class="sq" id="g4"></div>
<div class="sq-block">
  <div class="sq" id="h4">
    <div class="sq-notation-black hidden number">4</div>
  </div>
</div>
<div class="sq-block">
  <div class="sq" id="a3">
    <div class="sq-notation-white number">3</div>
  </div>
</div>
<div class="sq" id="b3"></div>
<div class="sq" id="c3"></div>
  <div class="sq" id="d3"></div>
<div class="sq" id="e3"></div>
<div class="sq" id="f3"></div>
<div class="sq" id="g3"></div>
<div class="sq-block">
  <div class="sq" id="h3">
    <div class="sq-notation-black hidden number">3</div>
  </div>
</div>
<div class="sq-block">
  <div class="sq" id="a2">
    <img src="./images/pieces/white/pawn.png" alt="" />
  </div>
  <div class="sq-notation-white number">2</div>
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
<div class="sq-block">
  <div class="sq" id="h2">
    <img src="./images/pieces/white/pawn.png" alt="" />
  </div>
  <div class="sq-notation-black hidden number">2</div>
</div>
<div class="sq-block">
  <div class="sq" id="a1">
    <img src="./images/pieces/white/rook.png " alt="picture of white rook" />
  </div>
  <div class="sq-notation-white number dark-square">1</div>
  <div class="sq-notation-white character">a</div>
</div>
<div class="sq-block">
  <div class="sq" id="b1">
    <img src="./images/pieces/white/knight.png" alt="" />
  </div>
  <div class="sq-notation-white character">b</div>
</div>
<div class="sq-block">
  <div class="sq" id="c1">
    <img src="./images/pieces/white/bishop.png" alt="" />
  </div>
  <div class="sq-notation-white character">c</div>
</div>
<div class="sq-block">
  <div class="sq" id="d1">
    <img src="./images/pieces/white/queen.png" alt="" />
  </div>
  <div class="sq-notation-white character">d</div>
</div>
<div class="sq-block">
  <div class="sq" id="e1">
    <img src="./images/pieces/white/king.png" alt="" />
  </div>
  <div class="sq-notation-white character">e</div>
</div>
<div class="sq-block">
  <div class="sq" id="f1">
    <img src="./images/pieces/white/bishop.png" alt="" />
  </div>
  <div class="sq-notation-white character">f</div>
</div>
<div class="sq-block">
  <div class="sq" id="g1">
    <img src="./images/pieces/white/knight.png" alt="" />
  </div>
  <div class="sq-notation-white character">g</div>
</div>
<div class="sq-block">
  <div class="sq" id="h1">
    <img src="./images/pieces/white/rook.png" alt="" />
  </div>
  <div class="sq-notation-white character">h</div>
  <div class="sq-notation-black hidden number">1</div>
</div>


`;

export { chessBoardHTML };
