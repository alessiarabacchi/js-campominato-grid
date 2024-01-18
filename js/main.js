function generateGrid() {
  const gridContainer = document.getElementById("gameboard");
  const difficultySelect = document.getElementById("difficultySelect");
  const difficulty = parseInt(difficultySelect.value, 10);

  // Calcolare il numero di caselle e le righe in base alla difficoltà
  const gridSize = difficulty === 1 ? 100 : difficulty === 2 ? 81 : 49;
  const rows = difficulty === 1 ? 10 : difficulty === 2 ? 9 : 7;

  gridContainer.innerHTML = "";

  for (let i = 1; i <= gridSize; i++) {
    const gridItem = document.createElement("div");
    gridItem.textContent = i;
    gridItem.className = "box";
    gridItem.addEventListener("click", () => handleCellClick(i));
    gridContainer.appendChild(gridItem);
  }

  // Impostare la griglia con il numero corretto di righe
  gridContainer.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
}

function handleCellClick(cellNumber) {
  console.log(`Cella cliccata: ${cellNumber}`);
  const clickedCell = document.querySelector(
    `.grid-item:nth-child(${cellNumber})`
  );
  clickedCell.classList.add("clicked");
}