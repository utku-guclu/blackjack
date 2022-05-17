let player = {
  name: "Per",
  chips: 200,
};

let cards = [];
let sum = 0;
let hasBlackJack = false;
let isAlive = false;
let gameOver = false;
let message = "";
let messageEl = document.getElementById("message-el");
let sumEl = document.getElementById("sum-el");
let cardsEl = document.getElementById("cards-el");
let playerEl = document.getElementById("player-el");

// get player info
player.name = prompt("your name: ");
playerEl.textContent = player.name + ": $" + player.chips;

function getRandomCard() {
  let randomNumber = Math.floor(Math.random() * 13) + 1;
  if (randomNumber > 10) {
    return 10;
  } else if (randomNumber === 1) {
    return 11;
  } else {
    return randomNumber;
  }
}

function startGame() {
  if (!gameOver) {
    if (sum >= 19 && !hasBlackJack && isAlive) {
      player.chips += 20;
    }
    playerEl.textContent = player.name + ": $" + player.chips;
    isAlive = true;
    let firstCard = getRandomCard();
    let secondCard = getRandomCard();
    cards = [firstCard, secondCard];
    sum = firstCard + secondCard;
    renderGame();
  }
}

function renderGame() {
  cardsEl.textContent = "Cards: ";
  for (let i = 0; i < cards.length; i++) {
    cardsEl.textContent += cards[i] + " ";
  }

  sumEl.textContent = "Sum: " + sum;
  if (sum <= 20) {
    hasBlackJack = false;
    message = "Do you want to draw a new card?";
  } else if (sum === 21) {
    hasBlackJack = true;
    player.chips += 100;
    playerEl.textContent = player.name + ": $" + player.chips;
    message = "You've got Blackjack!";
  } else {
    player.chips -= 50;
    playerEl.textContent = player.name + ": $" + player.chips;
    message = "You're out of the game!";
    isAlive = false;
  }
  if (player.chips <= 0) {
    isAlive = false;
    message = "Bankrupt!";
    gameOver = true;
  }
  messageEl.textContent = message;
}

function newCard() {
  if (isAlive === true && hasBlackJack === false) {
    let card = getRandomCard();
    sum += card;
    cards.push(card);
    renderGame();
  }
}
