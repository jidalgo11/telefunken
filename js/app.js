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
    const playerScoreRow = d.createElement("div");

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

    playerScoreRow.setAttribute(
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
      <div class="buys">
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

    playerScoreRow.classList.add("test");

    playerScoreRow.innerHTML = `
    <div class="px-4 grid grid-cols-5">
      <h4 class="col-span-3">${playersLength + 1} ${newPlayer.name}</h4>
      <p>${newPlayer.score}</p>
      <p>${newPlayer.buys}</p>
    </div>
    `;
    playersWrap.appendChild(playerRow);
    leaderboardScores.appendChild(playerScoreRow);
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
  const playerScore =
    this.closest(".player-wrapper").querySelector(".player-score");
  const scores = this.closest(".scores");
  let currentScore = 0;
  for (let score of scores.querySelectorAll("input")) {
    if (score.value >= 0) {
      let scoreIn = parseInt(score.value);
      currentScore += isNaN(scoreIn) ? 0 : scoreIn;
    } else {
      alert("Score cannot be less than 0");
      score.value = 0;
    }
  }
  playerScore.textContent = `Score: ${currentScore}`; // Update player score as text content
}

function updateBuys() {
  const playerBuys =
    this.closest(".player-wrapper").querySelector(".player-buys");
  const buys = this.closest(".buys");
  if (buys) {
    let buyCount = 12;
    for (let buy of buys.querySelectorAll("input")) {
      if (buy.checked) {
        buyCount -= 1;
      }
    }
    playerBuys.textContent = `Compras left: ${buyCount}`;
  }
}

// // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-

// // const addPlayer = d.querySelector("#addPlayer");
// // const scores = d.querySelectorAll("#scores");
// // const players = d.querySelectorAll("#players > div");

// // players.forEach((player) => (i) => {
// //   console.log(player);
// // });

// // console.log(players);

// // class UI {
// //   static addPlayer(player) {
// //     const players = document.querySelector("#players");

// //     const row = document.createElement("div");

// //     row.classList.add = "123";
// //     row.innerHTML = `
// //       <div>${player.name}</div>
// //       <div id="scores">
// //         <input type="text" id="round-1-score">
// //         <input type="text" id="round-2-score">
// //         <input type="text" id="round-3-score">
// //         <input type="text" id="round-4-score">
// //         <input type="text" id="round-5-score">
// //         <input type="text" id="round-6-score">
// //         <input type="text" id="round-7-score">
// //       </div>
// //       <div>${player.score}</div>
// //       <div>${player.buys}</div>

// //     `;

// //     players.appendChild(row);
// //   }

// // // Event Add Player

// // addPlayer.addEventListener("submit", function (e) {
// //   e.preventDefault();

// //   let name = document.querySelector("#name").value;

// //   if (name === "" || name.length < 2) {
// //     alert("Please enter a valid name");
// //   } else {
// //     let player = new Player(name);

// //     UI.addPlayer(player);

// //     UI.getScore();

// //     console.log(scores);
// //   }
// // });

// // // if (scores) {
// // //   scores.addEventListener("click", UI.getScore());
// // // }

// // // Event Update Score

// // // Event Update Buys

// // // TODO: Save player data to local storage
