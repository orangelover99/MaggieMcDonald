let xp = 0;
let loveHealth = 100;
let money = 50;
let currentWeapon = 0;
let askingOut;
let monsterHealth;
let inventory = ["barette"];

const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const loveHealthText = document.querySelector("#loveHealthText");
const moneyText = document.querySelector("#moneyText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const weapons = [
  { name: 'barette', power: 5 },
  { name: 'knowledge of the Equestranauts', power: 30 },
  { name: 'tenacity', power: 50 },
  { name: 'confidence', power: 100 }
];
const monsters = [
  {
    name: "Jeff the Ghost",
    level: 2,
    loveHealth: 15
  },
  {
    name: "Zeke",
    level: 8,
    loveHealth: 60
  },
  {
    name: "Jimmy Jr.",
    level: 20,
    loveHealth: 300
  }
]
const locations = [
  {
    name: "the restaurant",
    "button text": ["Go to store", "Go to cave", "Try to pay rent"],
    "button functions": [askingOutJeff, askingOutZeke, askingOutJimmyJr],
    text: "You are in the restaurant. You see a sign that says \"Store\"."
  },
  {
    name: "store",
    "button text": ["Buy 10 health (10 money)", "Buy weapon (30 money)", "Go to the restaurant"],
    "button functions": [getLoveHealth, buyWeapon, goRestaurant],
    text: "You enter the store."
  },
  {
    name: "cave",
    "button text": ["Ask out Jeff the Ghost", "Ask out Zeke", "Go to the restaurant"],
    "button functions": [askingOutJeff, askingOutZeke, goRestaurant],
    text: "You enter the cave. You see some monsters."
  },
  {
    name: "Ask Out",
    "button text": ["Charm", "Dodge", "Run"],
    "button functions": [charm, dodge, goRestaurant],
    text: "You are asking out a boy."
  },
  {
    name: "kill monster",
    "button text": ["Go to the restaurant", "Go to the restaurant", "Go to the restaurant"],
    "button functions": [goRestaurant, goRestaurant, goRestaurant],
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find money.'
  },
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You die. &#x2620;"
  },
  { 
    name: "win", 
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"], 
    "button functions": [restart, restart, restart], 
    text: "Jimmy Jr says yes, but you realize that Zeke is way better. So you ask him out, he says yes! YOU WIN THE GAME! &#x1F389;" 
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Go to the restaurant?"],
    "button functions": [pickTwo, pickEight, goRestaurant],
    text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
  }
];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = askingOutJimmyJr;

function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerHTML = location.text;
}

function goRestaurant() {
  update(locations[0]);
}

function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}

function getLoveHealth() {
  if (money >= 10) {
    money -= 10;
    loveHealth += 10;
    moneyText.innerText = money;
    //start of new changes
    text.innerText = "After writing a new chapter of erotic friend fiction, your faith in love gets restored.";
    loveHealthText.innerText = loveHealth;
  } else {
    text.innerText = "You do not have enough money to buy health.";
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (money >= 30) {
        money -= 30;
      currentWeapon++;
      moneyText.innerText = money;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "You now have a " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " In your inventory you have: " + inventory;
    } else {
      text.innerText = "You do not have enough money to buy a weapon.";
    }
  } else {
    text.innerText = "You already have the most powerful weapon!";
    button2.innerText = "Sell weapon for 15 money";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    money += 15;
    moneyText.innerText = money;
    let currentWeapon = inventory.shift();
    text.innerText = "You sold a " + currentWeapon + ".";
    text.innerText += " In your inventory you have: " + inventory;
  } else {
    text.innerText = "Don't sell your only weapon!";
  }
}

function askingOutJeff() {
  askingOut = 0;
  askingOut();
}

function askingOutZeke() {
  askingOut = 1;
  askingOut();
}

function askingOutJimmyJr() {
  askingOut = 2;
  askingOut();
}

function askingOut() {
  update(locations[3]);
  monsterHealth = monsters[askingOut].loveHealth;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[askingOut].name;
  monsterHealthText.innerText = monsterHealth;
}

function charm() {
  text.innerText = monsters[askingOut].name + " resists your charm.";
  text.innerText += " You charm it with your " + weapons[currentWeapon].name + ".";
  loveHealth -= getMonsterResistanceValue(monsters[askingOut].level);
  if (isMonsterHit()) {
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;    
  } else {
    text.innerText += " You miss.";
  }
  loveHealthText.innerText = loveHealth;
  monsterHealthText.innerText = monsterHealth;
  if (loveHealth <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (askingOut === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }
  if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += " Your " + inventory.pop() + " breaks.";
    currentWeapon--;
  }
}

function getMonsterResistanceValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > .2 || loveHealth < 20;
}

function dodge() {
  text.innerText = "You dodge " + monsters[askingOut].name + " resisting your charm.";
}

function defeatMonster() {
  money += Math.floor(monsters[askingOut].level * 6.7);
  xp += monsters[askingOut].level;
  moneyText.innerText = money;
  xpText.innerText = xp;
  update(locations[4]);
}

function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
}

function restart() {
  xp = 0;
  loveHealth = 100;
  money = 50;
  currentWeapon = 0;
  inventory = ["chalk"];
  moneyText.innerText = money;
  loveHealthText.innerText = loveHealth;
  xpText.innerText = xp;
  goRestaurant();
}

function easterEgg() {
  update(locations[7]);
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.includes(guess)) {
    text.innerText += "Right! You win 20 money!";
    money += 20;
    moneyText.innerText = money;
  } else {
    text.innerText += "Wrong! You lose 10 health!";
    loveHealth -= 10;
    loveHealthText.innerText = loveHealth;
    if (loveHealth <= 0) {
      lose();
    }
  }
}