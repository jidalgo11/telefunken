const d = document;
const buys = d.querySelector(".buy-wrapper");
const newPlayer = d.querySelector("#addPlayer");
const playersWrap = d.querySelector("#players");
const players = playersWrap.children;

let playerArr = [];

class Player {
  constructor(name, score = 0, buys = 0) {
    (this.name = name), (this.score = score), (this.buys = buys);
  }
}

class UI {
  static addPlayer(playerName) {
    let newPlayer = new Player(playerName);
    let playersLength = players.length;
    const playerRow = d.createElement("div");

    playerRow.classList.add(
      "player-wrapper",
      "bg-white",
      "p-4",
      "rounded-md",
      "shadow-md"
    );
    playerRow.setAttribute("data-id", "player-id-" + (playersLength + 1));

    playerRow.innerHTML = `
      <h3 class="text-2xl font-semibold mb-4">${newPlayer.name}</h3>
      <div class="scores flex flex-col">
        <input type="text" class="round-1-score border rounded-md" value="0">
        <input type="text" class="round-2-score border rounded-md" value="0">
        <input type="text" class="round-3-score border rounded-md" value="0">
        <input type="text" class="round-4-score border rounded-md" value="0">
        <input type="text" class="round-5-score border rounded-md" value="0">
        <input type="text" class="round-6-score border rounded-md" value="0">
        <input type="text" class="round-7-score border rounded-md" value="0">
      </div>
      <div class="player-score">Score: ${newPlayer.score}</div>
      <div class="buys">
        <input type="checkbox" class="buy">
        <input type="checkbox" class="buy" disabled>
        <input type="checkbox" class="buy" disabled>
        <input type="checkbox" class="buy" disabled>
        <input type="checkbox" class="buy" disabled>
        <input type="checkbox" class="buy" disabled>
        <input type="checkbox" class="buy" disabled>
        <input type="checkbox" class="buy" disabled>
      </div>
      <div class="player-buys">Compras: ${newPlayer.buys}</div>
    `;

    playersWrap.appendChild(playerRow);
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
    let scoreIn = parseInt(score.value);
    currentScore += isNaN(scoreIn) ? 0 : scoreIn;
  }
  playerScore.textContent = currentScore; // Update player score as text content
}

function updateBuys() {
  const playerBuys =
    this.closest(".player-wrapper").querySelector(".player-buys");
  const buys = this.closest(".buys");
  if (buys) {
    let buyCount = 0;
    for (let buy of buys.querySelectorAll("input")) {
      if (buy.checked) {
        buyCount += 1;
        buy.disabled = true;
        if (buy.nextElementSibling !== null) {
          buy.nextElementSibling.disabled = false;
        }
      }
    }
    buyCount < 8
      ? (playerBuys.textContent = `Compras: ${buyCount}`)
      : (playerBuys.textContent = `Compras: Ya no mas!`);
    // playerBuys.textContent = `Compras: ${buyCount}`;
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
