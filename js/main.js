// function generateGrid() {
//   const gridContainer = document.getElementById("gameboard");
//   const difficultySelect = document.getElementById("difficultySelect");
//   const difficulty = parseInt(difficultySelect.value, 10);

//   // Calcolare il numero di caselle e le righe in base alla difficoltà
//   const gridSize = difficulty === 1 ? 100 : difficulty === 2 ? 81 : 49;
//   const rows = difficulty === 1 ? 10 : difficulty === 2 ? 9 : 7;

//   gridContainer.innerHTML = "";

//   for (let i = 1; i <= gridSize; i++) {
//     const gridItem = document.createElement("div");
//     gridItem.textContent = i;
//     gridItem.className = "box";
//     gridItem.addEventListener("click", () => handleCellClick(i));
//     gridContainer.appendChild(gridItem);
//   }

//   // Impostare la griglia con il numero corretto di righe
//   gridContainer.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
// }

// function handleCellClick(cellNumber) {
//   console.log(`Cella cliccata: ${cellNumber}`);
//   const clickedCell = document.querySelector(
//     `.grid-item:nth-child(${cellNumber})`
//   );
//   clickedCell.classList.add("clicked");
// }

function generateGrid() {
  const gridContainer = document.getElementById("gameboard");
  const difficultySelect = document.getElementById("difficultySelect");
  const difficulty = parseInt(difficultySelect.value, 10);

  // Calcolare il numero di caselle e le righe in base alla difficoltà
  const gridSize = difficulty === 1 ? 100 : difficulty === 2 ? 81 : 49;
  const rows = difficulty === 1 ? 10 : difficulty === 2 ? 9 : 7;

  gridContainer.innerHTML = "";

  // Funzione per generare un numero casuale in un intervallo specificato
  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  // Funzione per generare un array di numeri casuali senza duplicati
  function generateBombs(difficulty, totalCells) {
    const bombs = [];
    while (bombs.length < difficulty) {
      const bomb = getRandomNumber(1, totalCells);
      if (!bombs.includes(bomb)) {
        bombs.push(bomb);
      }
    }
    return bombs;
  }

  // Funzione principale del gioco
  function playGame(difficulty, totalCells) {
    const bombs = generateBombs(difficulty, totalCells);

    function clickCell(cellNumber) {
      const clickedCell = document.querySelector(
        `.box:nth-child(${cellNumber})`
      );

      if (bombs.includes(cellNumber)) {
        // Bomba colpita, fine del gioco
        console.log("Hai colpito una bomba!");
        clickedCell.classList.add("bomb");
        endGame();
      } else {
        // Cella non ancora cliccata
        clickedCell.classList.add("clicked");
        checkWin();
      }
    }

    function endGame() {
      alert("Fine del gioco");
      // Altre azioni di fine gioco se necessario
    }

    function checkWin() {
      const clickedCells = document.querySelectorAll(".clicked");
      if (clickedCells.length === totalCells - difficulty) {
        // Tutte le celle non bombe sono state cliccate, fine del gioco
        alert("Hai vinto!");
        endGame();
      }
    }

    return clickCell;
  }

  // Impostare la griglia con il numero corretto di righe
  gridContainer.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

  // Esempio di utilizzo del gioco con difficoltà e dimensioni della griglia
  const totalCellsCount = gridSize;
  const play = playGame(difficulty, totalCellsCount);

  for (let i = 1; i <= gridSize; i++) {
    const gridItem = document.createElement("div");
    gridItem.textContent = i;
    gridItem.className = "box";
    gridItem.addEventListener("click", () => play(i));
    gridContainer.appendChild(gridItem);
  }
}

// Esempio di chiamata a generateGrid()
generateGrid();
