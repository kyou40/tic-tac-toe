const Players = (sign) => {
  this.sign = sign;

  const getSign = () => {
    return sign;
  };
  return { getSign };
};

const gameboardController = (() => {
  const gameboard = ["", "", "", "", "", "", "", "", ""];

  const getField = (fieldIndex) => {
    return gameboard[fieldIndex];
  };

  const setField = (fieldIndex, sign) => {
    if (fieldIndex >= gameboard.length) return;
    gameboard[fieldIndex] = sign;
  };

  const clearField = (fieldIndex) => {
    gameboard[fieldIndex] = "";
  };

  const reset = () => {
    for (let i = 0; i < gameboard.length; i++) {
      gameboard[i] = "";
    }
  };
  return { setField, getField, clearField, reset };
})();

const displayController = (() => {
  const fields = document.querySelectorAll(".field");
  const messageBar = document.getElementById("message-bar");
  const restartBtn = document.getElementById("restart-btn");
  const fieldset = document.getElementById("fieldset");

  fields.forEach((field) =>
    field.addEventListener("click", (e) => {
      if (gameController.getIsOver() || e.target.dataset.filled === "true")
        return;
      gameController.playRound(parseInt(e.target.dataset.index));
      updateGameboard();
    }),
  );

  restartBtn.addEventListener("click", () => {
    gameboardController.reset();
    gameController.reset();
    fieldset.classList.remove("win");
    updateGameboard();
    setMessage("Player X's turn");
  });

  const gemClassFor = (sign) => (sign === "X" ? "sign-x" : "sign-o");

  const updateGameboard = () => {
    for (let i = 0; i < fields.length; i++) {
      const field = fields[i];
      const value = gameboardController.getField(i);

      field.classList.remove("sign-x", "sign-o", "sign-warn");
      field.dataset.filled = value !== "" ? "true" : "false";

      if (value !== "") {
        field.classList.add(gemClassFor(value));
        field.dataset.mark = value;
      } else {
        delete field.dataset.mark;
      }
    }

    const oldestIndex = gameController.getOldestIndex();
    if (oldestIndex !== -1) {
      fields[oldestIndex].classList.add("sign-warn");
    }
  };

  const setResultMessage = (winner) => {
    if (winner === "Draw") {
      setMessage("It's a draw!");
    } else {
      setMessage(`Player ${winner} has won!`);
      fieldset.classList.add("win");
    }
  };

  const setMessage = (msg) => {
    messageBar.textContent = msg;
  };

  return { setResultMessage, setMessage, updateGameboard };
})();

const gameController = (() => {
  const playerX = Players("X");
  const playerO = Players("O");
  let round = 1;
  let isOver = false;
  const MAX_MOVE = 3;
  const placementHistory = { X: [], O: [] };

  const playRound = (fieldIndex) => {
    const sign = getCurrentPlayerSign();
    const othersign = sign === "X" ? "O" : "X";
    const signHistory = placementHistory[sign];
    const otherSignHistory = placementHistory[othersign];

    if (signHistory.length >= MAX_MOVE) {
      const oldestIndex = signHistory.shift();
      gameboardController.clearField(oldestIndex);
    }
    if (otherSignHistory.length >= MAX_MOVE) {
      const oldestIndex = otherSignHistory.shift();
      gameboardController.clearField(oldestIndex);
    }
    gameboardController.setField(fieldIndex, sign);

    signHistory.push(fieldIndex);
    console.log(signHistory);
    if (checkWinner(fieldIndex)) {
      displayController.setResultMessage(sign);
      isOver = true;
      return;
    }

    round++;
    displayController.setMessage(`Player ${getCurrentPlayerSign()}'s turn`);
  };

  const getCurrentPlayerSign = () => {
    return round % 2 === 1 ? playerX.getSign() : playerO.getSign();
  };

  const getOldestIndex = () => {
    const otherSignHistory =
      placementHistory[getCurrentPlayerSign() === "X" ? "O" : "X"];
    if (otherSignHistory.length < MAX_MOVE) return -1;
    return otherSignHistory[0];
  };

  const checkWinner = (fieldIndex) => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return winConditions
      .filter((condition) => condition.includes(fieldIndex))
      .some((possibleCond) =>
        possibleCond.every(
          (index) =>
            gameboardController.getField(index) === getCurrentPlayerSign(),
        ),
      );
  };

  const getIsOver = () => {
    return isOver;
  };

  const reset = () => {
    isOver = false;
    round = 1;
    placementHistory.X = [];
    placementHistory.O = [];
  };

  return {
    checkWinner,
    playRound,
    getCurrentPlayerSign,
    getOldestIndex,
    getIsOver,
    reset,
  };
})();
