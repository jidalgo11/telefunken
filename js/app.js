const d = document;
const buys = d.querySelector(".buy-wrapper");
const leaderboard = d.querySelector("#leaderboard");
const leaderboardScores = d.querySelector("#leaderboardScores");
const newPlayer = d.querySelector("#addPlayer");
const playersWrap = d.querySelector("#players");
const players = playersWrap.children;

let playerArr = [];

class Player {
  constructor(name, score = 0, buys = 12) {
    (this.name = name), (this.score = score), (this.buys = buys);
  }
}

class UI {
  static addPlayer(playerName) {
    let newPlayer = new Player(playerName);
    let playersLength = players.length;
    const playerRow = d.createElement("div");
    const playerLeaderboardRow = d.createElement("div");

    playersWrap.classList.add(
      "lg:bg-gray-200",
      "lg:rounded-md",
      "lg:shadow-md"
    );

    // Player Row
    playerRow.classList.add(
      "player-wrapper",
      "bg-white",
      "p-4",
      "rounded-md",
      "shadow-md"
    );

    playerRow.setAttribute(
      "data-player-id",
      `${newPlayer.name.toLowerCase()}_${playersLength + 1}`
    );

    playerRow.setAttribute(
      "data-score-id",
      `${newPlayer.name.toLowerCase()}_${playersLength + 1}_score`
    );

    playerRow.setAttribute(
      "data-buys-id",
      `${newPlayer.name.toLowerCase()}_${playersLength + 1}_buys`
    );

    playerLeaderboardRow.setAttribute(
      "id",
      `${newPlayer.name.toLowerCase()}_${playersLength + 1}`
    );

    playerRow.innerHTML = `
      <h3 class="text-2xl font-semibold mb-4 text-blue-700">${newPlayer.name}</h3>
      <div class="scores flex flex-col">
        <label for="round-1" class="block mb-1 font-medium">Round 1</label>
        <input type="text" id="round-1" class="round-1-score border rounded w-full p-2 mb-1" value="0">
        <input type="number" class="round-2-score border rounded w-full p-2 mb-1" value="0">
        <input type="number" class="round-3-score border rounded w-full p-2 mb-1" value="0">
        <input type="number" class="round-4-score border rounded w-full p-2 mb-1" value="0">
        <input type="number" class="round-5-score border rounded w-full p-2 mb-1" value="0">
        <input type="number" class="round-6-score border rounded w-full p-2 mb-1" value="0">
        <input type="number" class="round-7-score border rounded w-full p-2 mb-1" value="0">
      </div>
      <div class="player-score">Score: ${newPlayer.score}</div>
      <div class="buys flex flex-row flex-wrap gap-x-2 gap-y-1">
        <input type="checkbox" class="buy">
        <input type="checkbox" class="buy">
        <input type="checkbox" class="buy">
        <input type="checkbox" class="buy">
        <input type="checkbox" class="buy">
        <input type="checkbox" class="buy">
        <input type="checkbox" class="buy">
        <input type="checkbox" class="buy">
        <input type="checkbox" class="buy">
        <input type="checkbox" class="buy">
        <input type="checkbox" class="buy">
        <input type="checkbox" class="buy">
      </div>
      <div class="player-buys">Compras left: ${newPlayer.buys}</div>
    `;

    playerLeaderboardRow.innerHTML = `
    <div class="px-4 grid grid-cols-5">
      <h4 class="col-span-3">${playersLength + 1} ${newPlayer.name}</h4>
      <p id="${newPlayer.name.toLowerCase()}_${playersLength + 1}_score">${
      newPlayer.score
    }</p>
      <p id="${newPlayer.name.toLowerCase()}_${playersLength + 1}_buys">${
      newPlayer.buys
    }</p>
    </div>
    `;
    playersWrap.appendChild(playerRow);
    leaderboardScores.appendChild(playerLeaderboardRow);
  }
}

newPlayer.addEventListener("submit", function (e) {
  e.preventDefault();
  let name = d.querySelector("#name");
  playerArr.push(new Player(name.value));

  // addPlayerEl(name);
  if (!name.value || name.value.length < 2) {
    alert("Please enter a valid name");
  } else {
    UI.addPlayer(name.value);
    name.value = " ";
  }

  if (players) {
    for (let player of players) {
      const scores = player.querySelector(".scores");
      const buys = player.querySelector(".buys");

      if (scores) {
        scores.addEventListener("change", updateScore);

        for (let score of scores.querySelectorAll("input")) {
          score.addEventListener("focus", function () {
            score.select();
          });
        }
      }
      if (buys) {
        buys.addEventListener("click", updateBuys);
      }
    }
  }
});

function updateScore() {
  const playerId = this.closest(".player-wrapper").dataset.scoreId;
  const leaderboardScore = document.getElementById(playerId);
  const playerScore =
    this.closest(".player-wrapper").querySelector(".player-score");
  let currentScore = 0;

  for (let score of this.querySelectorAll("input")) {
    if (score.value >= 0) {
      let scoreIn = parseInt(score.value);
      currentScore += isNaN(scoreIn) ? 0 : scoreIn;
    } else {
      alert("Score cannot be less than 0");
      score.value = 0;
    }
  }
  playerScore.textContent = `Score: ${currentScore}`; // Update player score as text content
  leaderboardScore.textContent = currentScore;
}

function updateBuys() {
  const playerId = this.closest(".player-wrapper").dataset.buysId;
  const leaderboardBuys = document.getElementById(playerId);

  console.log(playerId);
  const playerBuys =
    this.closest(".player-wrapper").querySelector(".player-buys");
  console.log(this);
  if (this) {
    let buyCount = 12;
    for (let buy of this.querySelectorAll("input")) {
      if (buy.checked) {
        buyCount -= 1;
      }
    }
    playerBuys.textContent = `Compras left: ${buyCount}`;
    leaderboardBuys.textContent = buyCount;
  }
}
