const boxes = document.querySelectorAll('.box');
const statusTxt = document.querySelector('#status');
const btnRestart = document.querySelector('#restart');
const x = "<img src='images/heart.png'>";
const o = "<img src='images/star.png'>";

const win = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = x;
let player = "1";
let running = false;

init();

function init() {
  boxes.forEach(function(box) {
    box.addEventListener('click', boxClick);
  });
  btnRestart.addEventListener('click', restartGame);
  statusTxt.textContent = player + ' Your Turn';
  running = true;
}

function boxClick() {
  const index = this.dataset.index;
  if (!running) {
    return;
  }
  if (options[index] !== "") {
    alert('That cell is filled, select another one!');
    return;
  }
  updateBox(this, index);
  checkWinner();
  changePlayer();
}

function updateBox(box, index) {
  options[index] = player;
  box.innerHTML = currentPlayer;
}

function changePlayer() {
  player = player === '2' ? '1' : '2';
  currentPlayer = currentPlayer === x ? o : x;
  statusTxt.textContent = player + ' Your Turn';
}

function checkWinner() {
  let won = false;
  let winningPlayer = '';

  for (let i = 0; i < win.length; i++) {
    const condition = win[i];
    const box1 = options[condition[0]];
    const box2 = options[condition[1]];
    const box3 = options[condition[2]];

    if (box1 === "" || box2 === "" || box3 === "") {
      continue;
    }

    if (box1 === box2 && box2 === box3) {
      won = true;
      winningPlayer = currentPlayer;
      boxes[condition[0]].classList.add('win');
      boxes[condition[1]].classList.add('win');
      boxes[condition[2]].classList.add('win');
      break;
    }
  }

  if (won) {
    if (winningPlayer === x) {
      statusTxt.textContent = 'Player 1 Won'; !important
    } else if (winningPlayer === o) {
      statusTxt.textContent = 'Player 2 Won'; !important
    }
    running = false;
  } else if (!options.includes('')) {
    statusTxt.textContent = 'Game Draw..!'; !important
    running = false;
  }
}

function restartGame() {
  options = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = x;
  player = '1';
  running = true;
  statusTxt.textContent = player + ' Your Turn';

  boxes.forEach(function(box) {
    box.innerHTML = '';
    box.classList.remove('win');
  });
}
