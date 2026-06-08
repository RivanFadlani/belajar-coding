const cells = document.querySelectorAll(".cell");
const titleHeader = document.querySelector("#title-header");
const xPlayerDisplay = document.querySelector("#x-player-display");
const oPlayerDisplay = document.querySelector("#o-player-display");
const restartBtn = document.querySelector("#restart-btn");

let player = "X";
let isPauseGame = false;
let isGameStart = false;

// Array untuk Win Condition
//                  0   1   2   3   4   5   6   7   8
const inputCells = ["", "", "", "", "", "", "", "", ""];

const winConditions = [
  [0, 1, 2], // row
  [3, 4, 5],
  [6, 7, 8],

  [0, 3, 6], // column
  [1, 4, 7],
  [2, 5, 8],

  [0, 4, 8], // diagonal
  [2, 4, 6],
];

// menambahkan event listener untuk setiap cell
cells.forEach((cell, index) => {
  cell.addEventListener("click", () => tapCell(cell, index));
});

function tapCell(cell, index) {
  // pastikan cell kosong dan game tidak di-pause
  if (cell.textContent === "" && !isPauseGame) {
    isGameStart = true;
    updateCell(cell, index);

    // lakukan pick acak kalau ga ada hasil
    if (!checkWinner()) {
      changePlayer();
      randomPick();
    }
  }
}

function updateCell(cell, index) {
  cell.textContent = player;
  console.info(inputCells);
  inputCells[index] = player;
  cell.style.color = player === "X" ? "#1892EA" : "#A737FF";
}

function changePlayer() {
  player = player == "X" ? "O" : "X";
}

function randomPick() {
  // pause game untuk mengizinkan computer untuk pick cell
  isPauseGame = true;

  setTimeout(() => {
    let randomIndex;

    do {
      // pick index secara acak (cell)
      randomIndex = Math.floor(Math.random() * inputCells.length);
    } while (
      // pastikan cell yang dipilih kosong
      inputCells[randomIndex] != ""
    );

    // update cell dengan giliran computer
    updateCell(cells[randomIndex], randomIndex, player);
    if (!checkWinner()) {
      changePlayer();
      // ganti giliran ke player manusia lagi
      isPauseGame = false;
      return;
    }
    player = player === "X" ? "O" : "X";
  }, 1000);
}

function checkWinner() {
  for (const [a, b, c] of winConditions) {
    // cek setiap win condition
    if (
      inputCells[a] === player &&
      inputCells[b] === player &&
      inputCells[c] === player
    ) {
      declareWinner([a, b, c]);
      return true;
    }
  }

  // cek kalau draw (ter-trigger kalau semua cell sudah terisi penuh)
  if (inputCells.every((cell) => cell != "")) {
    declareDraw();
    return true;
  }
}

function declareWinner(WinningIndices) {
  titleHeader.textContent = `${player} WIN!!!`;
  isPauseGame = true;

  // highlight winner cells (X / O)
  WinningIndices.forEach(
    (index) => (cells[index].style.backgroundColor = "#2A2343"),
  );

  restartBtn.style.visibility = "visible";
}

function declareDraw() {
  titleHeader.textContent = `Draw =_=`;
  isPauseGame = true;
  restartBtn.style.visibility = "visible";
}

xPlayerDisplay.addEventListener("click", function () {
  choosePlayer("X");
});

oPlayerDisplay.addEventListener("click", function () {
  choosePlayer("O");
});

function choosePlayer(selectedPlayer) {
  // pastikan game belum dimulai
  if (!isGameStart) {
    // timpa value yang dipilih player
    player = selectedPlayer;
    if (player === "X") {
      // highlight x display
      xPlayerDisplay.classList.add("player-active");
      oPlayerDisplay.classList.remove("player-active");
    } else {
      // hightlight o display
      xPlayerDisplay.classList.remove("player-active");
      oPlayerDisplay.classList.add("player-active");
    }
  }
}

restartBtn.addEventListener("click", function () {
  restartBtn.style.visibility = "hidden";
  inputCells.fill("");
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.style.backgroundColor = "";
  });
  isPauseGame = false;
  isGameStart = false;
  titleHeader.textContent = "Choose";
});
