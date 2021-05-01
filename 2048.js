canvas = document.querySelector("canvas");
ctx = canvas.getContext('2d');

//Game settings
side = 4;
padding = 12;
blockSize = 90;
boardSize = padding * (side + 1) + blockSize * side; //420

var interval;
score = 0;
bestScore = 0;
board = new Array(side).fill(0).map(() => new Array(side).fill(0));
colors = ['#cdc1b4', '#eee4da', '#ede0c8', '#f2b179', '#f59563', '#f67c5f', '#f65e3b', '#edcf72', '#edcc61', '#edc850', '#edc53f', '#edc22e'];


function draw() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgb(150,150,150)";
  ctx.fillRect(0, 0, boardSize, boardSize);

  ctx.textAlign = "center";
  for (let i = 0; i < side; i++) {
    for (let j = 0; j < side; j++) {
      y = padding * (i + 1) + blockSize * i;
      x = padding * (j + 1) + blockSize * j;

      cell_level = Math.log2(board[i][j]);
      switch (cell_level) {
        case -Infinity:
          ctx.fillStyle = colors[0];
          ctx.fillRect(x, y, blockSize, blockSize);
          break;
        case 1:
        case 2:
        case 3:
          ctx.fillStyle = colors[cell_level];
          ctx.fillRect(x, y, blockSize, blockSize);
          ctx.fillStyle = 'black';
          ctx.font = "bold 60px Times New Roman";
          ctx.fillText(board[i][j], x + 45, y + 60);
          break;
        case 4:
        case 5:
        case 6:
          ctx.fillStyle = colors[cell_level];
          ctx.fillRect(x, y, blockSize, blockSize);
          ctx.fillStyle = 'white';
          ctx.font = "bold 60px Times New Roman";
          ctx.fillText(board[i][j], x + 45, y + 60);
          break;
        case 7:
        case 8:
        case 9:
          ctx.fillStyle = colors[cell_level];
          ctx.fillRect(x, y, blockSize, blockSize);
          ctx.fillStyle = 'white';
          ctx.font = "bold 50px Times New Roman";
          ctx.fillText(board[i][j], x + 45, y + 60);
          break;
        case 10:
          ctx.fillStyle = colors[cell_level];
          ctx.fillRect(x, y, blockSize, blockSize);
          ctx.fillStyle = 'white';
          ctx.font = "40px Times New Roman";
          ctx.fillText(board[i][j], x + 45, y + 60);
          break;
        default:
          ctx.fillStyle = colors[11];
          ctx.fillRect(x, y, blockSize, blockSize);
          ctx.fillStyle = 'white';
          ctx.font = "40px Times New Roman";
          ctx.fillText(board[i][j], x + 45, y + 60);


      }

    }
  }

  ctx.fillStyle = "#696980";
  ctx.font = "bold 90px Times New Roman";
  ctx.fillText("2048", 110, boardSize + 120);

  ctx.fillStyle = "#aaaabb";
  ctx.fillRect(280, boardSize + 10, 140, 70);

  ctx.fillStyle = "#dddddd";
  ctx.textAlign = "center";
  ctx.font = "30px Times New Roman";
  ctx.fillText("Score", 350, boardSize + 40);

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 30px Times New Roman";
  ctx.fillText(score, 350, boardSize + 70);

  ctx.fillStyle = "#aaaabb";
  ctx.fillRect(280, boardSize + 90, 140, 70);

  ctx.fillStyle = "#dddddd";
  ctx.font = "30px Times New Roman";
  ctx.fillText("Best", 350, boardSize + 120);

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 30px Times New Roman";
  ctx.fillText(bestScore, 350, boardSize + 150);

}


function updateGame() {
  emptyCells = [];
  for (let i = 0; i < side; i++) {
    for (let j = 0; j < side; j++) {
      if (board[i][j] == 0) {
        emptyCells.push([i, j]);
      }
    }
  }
  //Select random cell to add new number
  if (emptyCells.length > 0) {
    chosen = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    //New number is either 2 (with chance 75%) or 4 (25%)
    newNumber = (1 + Math.round(Math.random() - 0.25)) * 2;
    board[chosen[0]][chosen[1]] = newNumber;
  }

  if (bestScore < score) {
    bestScore = score;
  }

  draw();

  if (emptyCells.length <= 1 && !checkGame()) {
    ctx.fillStyle = 'rgba(200, 200, 200, 0.8)';
    ctx.fillRect(0, 0, boardSize, boardSize);
    ctx.fillStyle = "#606060";
    ctx.font = "bold 55px Times New Roman";
    ctx.fillText("Game over!", 210, 200)
  }
}

function left() {
  change = false;
  for (let i = 0; i < side; i++) {
    idx_last = -1;
    last_number = -1;

    for (let j = 0; j < side; j++) {
      if (board[i][j] == last_number) {
        board[i][j] = 0;
        last_number *= 2;
        board[i][idx_last] = last_number;
        score += last_number;
        last_number = -1;
        change = true;
      } else if (board[i][j] != 0 && board[i][idx_last + 1] == 0) {
        board[i][idx_last + 1] = board[i][j];
        last_number = board[i][j];
        idx_last = idx_last + 1;
        board[i][j] = 0;
        change = true;
      }
      if (board[i][j] != 0) {
        idx_last = j;
        last_number = board[i][j];
      }
    }

  }
  if (change) {
    updateGame();
  }
}

function right() {
  change = false;
  for (let i = 0; i < side; i++) {
    idx_last = side;
    last_number = -1;

    for (let j = side - 1; j >= 0; j--) {
      if (board[i][j] == last_number) {
        board[i][j] = 0;
        last_number *= 2;
        board[i][idx_last] = last_number;
        score += last_number;
        last_number = -1;
        change = true;
      } else if (board[i][j] != 0 && board[i][idx_last - 1] == 0) {
        board[i][idx_last - 1] = board[i][j];
        last_number = board[i][j];
        idx_last = idx_last - 1;
        board[i][j] = 0;
        change = true;
      }
      if (board[i][j] != 0) {
        idx_last = j;
        last_number = board[i][j];
      }
    }

  }
  if (change) {
    updateGame();
  }
}

function down() {
  change = false;
  for (let j = 0; j < side; j++) {
    idx_last = side;
    last_number = -1;

    for (let i = side - 1; i >= 0; i--) {
      if (board[i][j] == last_number) {
        board[i][j] = 0;
        last_number *= 2;
        board[idx_last][j] = last_number;
        score += last_number;
        last_number = -1;
        change = true;
      } else if (board[i][j] != 0 && board[idx_last - 1][j] == 0) {
        board[idx_last - 1][j] = board[i][j];
        last_number = board[i][j];
        idx_last = idx_last - 1;
        board[i][j] = 0;
        change = true;
      }
      if (board[i][j] != 0) {
        idx_last = i;
        last_number = board[i][j];
      }
    }

  }
  if (change) {
    updateGame();
  }
}

function up() {
  change = false;
  for (let j = 0; j < side; j++) {
    idx_last = -1;
    last_number = -1;

    for (let i = 0; i < side; i++) {
      if (board[i][j] == last_number) {
        board[i][j] = 0;
        last_number *= 2;
        board[idx_last][j] = last_number;
        score += last_number;
        last_number = -1;
        change = true;
      } else if (board[i][j] != 0 && board[idx_last + 1][j] == 0) {
        board[idx_last + 1][j] = board[i][j];
        last_number = board[i][j];
        idx_last = idx_last + 1;
        board[i][j] = 0;
        change = true;
      }
      if (board[i][j] != 0) {
        idx_last = i;
        last_number = board[i][j];
      }
    }

  }
  if (change) {
    updateGame();
  }

}

function checkGame() {
  for (let i = 0; i < side; i++) {
    for (let j = 0; j < side; j++) {
      if (board[i][j] == 0) {
        return true;
      }
      if (i + 1 < side && board[i][j] == board[i + 1][j] ||
        j + 1 < side && board[i][j] == board[i][j + 1]) {
        return true;
      }
    }
  }
  return false;
}

function startGame() {
  score = 0;
  board = new Array(side).fill(0).map(() => new Array(side).fill(0));
  updateGame();

}
document.addEventListener("DOMContentLoaded", () => {
  startGame();

});
window.addEventListener('keydown', (e) => {
  //Disable arrow keys scrolling in browser
  if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
    e.preventDefault();
  }
  switch (e.keyCode) {
    case 37:
      left();
      break;
    case 38:
      up();
      break;
    case 39:
      right();
      break;
    case 40:
      down();
      break;
  }

});