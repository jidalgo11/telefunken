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
    const playerLeaderboardRow = d.createElement("ul");

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
      <h3 class="text-3xl font-semibold mb-4 text-blue-700">${newPlayer.name}</h3>
      <div class="scores flex flex-col mb-4">
        <label for="round-1" class="block mb-1 font-medium text-sm px-1">Round 1</label>
        <input type="text" id="round-1" class="round-1-score border rounded w-full p-2 mb-2" value="0">
        <label for="round-2" class="block mb-1 font-medium text-sm px-1">Round 2</label>
        <input type="number" id="round-2" class="round-2-score border rounded w-full p-2 mb-2" value="0">
        <label for="round-3" class="block mb-1 font-medium text-sm px-1">Round 3</label>
        <input type="number" id="round-3" class="round-3-score border rounded w-full p-2 mb-2" value="0">
        <label for="round-4" class="block mb-1 font-medium text-sm px-1">Round 4</label>
        <input type="number" id="round-4" class="round-4-score border rounded w-full p-2 mb-2" value="0">
        <label for="round-5" class="block mb-1 font-medium text-sm px-1">Round 5</label>
        <input type="number" id="round-5" class="round-5-score border rounded w-full p-2 mb-2" value="0">
        <label for="round-6" class="block mb-1 font-medium text-sm px-1">Round 6</label>
        <input type="number" id="round-6" class="round-6-score border rounded w-full p-2 mb-2" value="0">
        <label for="round-7" class="block mb-1 font-medium text-sm px-1">Round 7</label>
        <input type="number" id="round-7" class="round-7-score border rounded w-full p-2 mb-2" value="0">
      </div>
      <h3 class="text-xl font-semibold mb-3 text-red-600">Buys</h3>
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
    `;

    playerLeaderboardRow.innerHTML = `
    <li class="px-4 grid grid-cols-5">
      <h4 class="col-span-3 font-semibold text-lg text-blue-900">${
        playersLength + 1
      } ${newPlayer.name}</h4>
      <p class="font-semibold text-green-600 text-center" id="${newPlayer.name.toLowerCase()}_${
      playersLength + 1
    }_score">${newPlayer.score}</p>
      <p class="font-semibold text-red-600 text-center" id="${newPlayer.name.toLowerCase()}_${
      playersLength + 1
    }_buys">${newPlayer.buys}</p>
    </li>
    <hr>
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
  leaderboardScore.textContent = currentScore;
}

function updateBuys() {
  const playerId = this.closest(".player-wrapper").dataset.buysId;
  const leaderboardBuys = document.getElementById(playerId);

  if (this) {
    let buyCount = 12;
    for (let buy of this.querySelectorAll("input")) {
      if (buy.checked) {
        buyCount -= 1;
      }
    }
    leaderboardBuys.textContent = buyCount;
  }
}
