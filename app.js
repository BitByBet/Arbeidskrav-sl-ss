// Del 1: Lag karakter og lagre karakteren i localStorage
class Character {
  constructor(name, hp, attack, image) {
    this.name = name;
    this.hp = hp;
    this.attack = attack;
    this.image = image;
  }

  saveToLocalStorage() {
    localStorage.setItem("character", JSON.stringify(this));
  }

  static loadFromLocalStorage() {
    const data = localStorage.getItem("character");
    return data ? JSON.parse(data) : null;
  }
}

let selectedImage = "";
document.querySelectorAll(".profile-img").forEach((img) => {
  img.addEventListener("click", () => {
    selectedImage = img.src;
    document
      .querySelectorAll(".profile-img")
      .forEach((i) => (i.style.border = "3px solid white"));
    img.style.border = "3px solid blue";
  });
});

const createCharacterButton = document.getElementById("create-character");
if (createCharacterButton) {
  createCharacterButton.addEventListener("click", () => {
    const name = document.getElementById("character-name").value;
    const hp = parseInt(document.getElementById("character-hp").value);
    const attack = parseInt(document.getElementById("attack-damage").value);

    if (!name || !hp || !attack || !selectedImage) {
      alert("Fyll inn alle feltene og velg et bilde!");
      return;
    }

    const character = new Character(name, hp, attack, selectedImage);
    character.saveToLocalStorage();
    alert("Karakteren din er lagret!");
  });
}

// Seksjon 2: Generer fiende
class Enemy {
  constructor() {
    const enemies = [
      { name: "Monster", img: "assets/monster.jpg" },
      { name: "Sumpmonster", img: "assets/swamp-monster.jpg" },
      { name: "Drage", img: "assets/dragon.jpg" },
    ];
    const randomEnemy = enemies[Math.floor(Math.random() * enemies.length)];

    this.name = randomEnemy.name;
    this.hp = Math.floor(Math.random() * (150 - 50) + 50);
    this.attack = Math.floor(Math.random() * (40 - 10) + 10);
    this.image = randomEnemy.img;
  }

  saveToLocalStorage() {
    localStorage.setItem("enemy", JSON.stringify(this));
  }
}

const generateEnemyButton = document.getElementById("generate-enemy");
if (generateEnemyButton) {
  generateEnemyButton.addEventListener("click", () => {
    const enemy = new Enemy();
    enemy.saveToLocalStorage();

    document.getElementById("enemy-img").src = enemy.image;
    document.getElementById("enemy-name").textContent = `Navn: ${enemy.name}`;
    document.getElementById("enemy-hp").textContent = `HP: ${enemy.hp}`;
    document.getElementById("enemy-attack").textContent = `Angrep: ${enemy.attack}`;
  });
}

// Seksjon 3: Sloss!


function displayResults(character, enemy, result) {
  const battleArea = document.getElementById("battle-area");
  if (!battleArea) {
    console.error("battle-area element not found!");
    return;
  }

  
  battleArea.innerHTML = `
    <h1>Sloss!</h1>
    <div id="battle-arena" class="battle-arena"></div>
    <button id="start-fight">Start kamp</button>
    <p id="battle-result"></p>
  `;

  const battleArena = document.getElementById("battle-arena");
  if (!battleArena) {
    console.error("battle-arena element not found!");
    return;
  }

  
  const heroCard = document.createElement("div");
  heroCard.className = "profile-card";
  heroCard.innerHTML = `
    <h2>Helten</h2>
    <img src="${character.image}" alt="Profilbilde" id="char-img" />
    <p id="char-name">${character.name}</p>
    <p id="char-hp">HP: ${character.hp}</p>
    <p id="char-attack">Angrep: ${character.attack}</p>
  `;

  
  const enemyCard = document.createElement("div");
  enemyCard.className = "profile-card";
  enemyCard.innerHTML = `
    <h2>Fiende</h2>
    <img src="${enemy.image}" alt="Fiendens profilbilde" id="enemy-fight-img" />
    <p id="enemy-fight-name">${enemy.name}</p>
    <p id="enemy-fight-hp">HP: ${enemy.hp}</p>
    <p id="enemy-fight-attack">Angrep: ${enemy.attack}</p>
  `;

  
  battleArena.appendChild(heroCard);
  battleArena.appendChild(enemyCard);

  
  const battleResultButton = document.getElementById("battle-result");
  if (battleResultButton) {
    battleResultButton.innerText = result;
  }

  
  const startFightButton = document.getElementById("start-fight");
  if (startFightButton) {
    startFightButton.addEventListener("click", fight);
  }
}


function fight() {
  const character = Character.loadFromLocalStorage();
  const enemy = JSON.parse(localStorage.getItem("enemy"));

  if (!character || !enemy) {
    alert("Mangler karakter eller fiende!");
    return;
  }

  const characterHpAfterAttack = character.hp - enemy.attack;
  const enemyHpAfterAttack = enemy.hp - character.attack;

  let result;
  if (characterHpAfterAttack > enemyHpAfterAttack) {
    result = "Du vant!";
  } else if (characterHpAfterAttack < enemyHpAfterAttack) {
    result = "Du tapte!";
  } else {
    result = "Uavgjort!";
  }

  
  displayResults(character, enemy, result);
}


document.addEventListener("DOMContentLoaded", () => {
  const startFightButton = document.getElementById("start-fight");
  if (startFightButton) {
    startFightButton.addEventListener("click", fight);
  }
});

module.exports = { Character, Enemy};