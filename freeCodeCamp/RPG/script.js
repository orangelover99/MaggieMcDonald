let xp = 0;
let loveHealth = 100;
let money = 50;
let currentTactic = 0;
let askingOut;
let boyHealth;
let inventory = ["barette"];

const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const loveHealthText = document.querySelector("#loveHealthText");
const moneyText = document.querySelector("#moneyText");
const boyStats = document.querySelector("#boyStats");
const screen = document.querySelector('#screen');
const view = document.querySelector("#currentView");
const boyName = document.querySelector("#boyName");
const boyHealthText = document.querySelector("#boyHealthText");
const tactics = [
  { name: 'barette', power: 5 },
  { name: 'knowledge of the Equestranauts', power: 30 },
  { name: 'tenacity', power: 50 },
  { name: 'confidence', power: 100 }
];
const boys = [
  {
    name: "Jeff the Ghost",
    level: 2,
    loveHealth: 15,
    currentView: "img/jeff_the_ghost.webp"
  },
  {
    name: "Zeke",
    level: 8,
    loveHealth: 60,
    currentView: "img/zeke.webp"
  },
  {
    name: "Jimmy Jr.",
    level: 20,
    loveHealth: 300,
    currentView: "img/jimmy_jr.webp"
  }
]
const locations = [
  //assign an asset so that each location has a picture?
  //if i do that, then location needs to add another thing for screen
  //and we have to query select above for screen
  {
    name: "the restaurant",
    "button text": ["Go to bedroom", "Go to school", "Ask out Jimmy Jr."],
    "button functions": [goBedroom, goSchool, askingOutJimmyJr],
    text: "You are in the restaurant. You know your room is upstairs in the apartment.",
    //not sure if this is a good idea!
    currentView: "img/inside_restaurant.webp"
  },
  {
    name: "Tina's Bedroom",
    "button text": ["Write erotic friend fiction (10 money)", "Learn tactic (30 money)", "Go to the restaurant"],
    "button functions": [getLoveHealth, learnTactic, goRestaurant],
    text: "You enter Tina's bedroom.",
    currentView: "img/tina_bedroom.webp"
  },
  {
    name: "School",
    "button text": ["Ask out Jeff the Ghost", "Ask out Zeke", "Go to the restaurant"],
    "button functions": [askingOutJeff, askingOutZeke, goRestaurant],
    text: "You enter the school. You see some boys."
  },
  {
    name: "Ask Out",
    "button text": ["Charm", "Dodge", "Run"],
    "button functions": [charm, dodge, goRestaurant],
    text: "You are asking out a boy."
  },
  {
    name: "Boy accepts date",
    "button text": ["Go to the restaurant", "Go to the restaurant", "Go to the restaurant"],
    "button functions": [goRestaurant, goRestaurant, goRestaurant],
    text: 'The boy screams "Arg!" as it dies. You gain love experience points and find money.'
  },
  {
    name: "rejected",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You got rejected. &#x2620;"
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
button1.onclick = goBedroom;
button2.onclick = goSchool;
button3.onclick = askingOutJimmyJr;
// view.img = "img/lost_game.png";
// not exactly working

function update(location) {
  //still good here!
  boyStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerHTML = location.text;
  //can't get this picture to work, keep on trying!!!
  view.src = location.currentView;
}

function goRestaurant() {
  update(locations[0]);
}

function goBedroom() {
  update(locations[1]);
}

function goSchool() {
  update(locations[2]);
}

function getLoveHealth() {
  if (money >= 10) {
    money -= 10;
    loveHealth += 10;
    moneyText.innerText = money;
    //start of new changes
    //text.innerText = "After writing a new chapter of erotic friend fiction, your faith in love gets restored.";
    loveHealthText.innerText = loveHealth;
  } else {
    text.innerText = "You do not have enough money to buy health.";
  }
}

function learnTactic() {
  if (currentTactic < tactics.length - 1) {
    if (money >= 30) {
        money -= 30;
      currentTactic++;
      moneyText.innerText = money;
      let newTactic = tactics[currentTactic].name;
      text.innerText = "You now have a " + newTactic + ".";
      inventory.push(newTactic);
      text.innerText += " In your inventory you have: " + inventory;
    } else {
      text.innerText = "You do not have enough money to buy a tactics.";
    }
  } else {
    text.innerText = "You already have the most powerful tactics!";
    button2.innerText = "Forget tactics for 15 money";
    button2.onclick = forgetTactic;
  }
}

function forgetTactic() {
  if (inventory.length > 1) {
    money += 15;
    moneyText.innerText = money;
    let currentTactic = inventory.shift();
    text.innerText = "You sold a " + currentTactic + ".";
    text.innerText += " In your inventory you have: " + inventory;
  } else {
    text.innerText = "Don't forget your only tactic!";
  }
}

function askingOutJeff() {
  askingOut = 0;
  askOut();
}

function askingOutZeke() {
  askingOut = 1;
  askOut();
}

function askingOutJimmyJr() {
  askingOut = 2;
  askOut();
}

function askOut() {
  update(locations[3]);
  boyHealth = boys[askingOut].loveHealth;
  screen.style.display = "flex";
  boyStats.style.display = "flex";
  boyName.innerText = boys[askingOut].name;
  boyHealthText.innerText = boyHealthText;
}

function charm() {
  text.innerText = boys[askingOut].name + " resists your charm.";
  text.innerText += " You charm it with your " + tactics[currentTactic].name + ".";
  loveHealth -= getBoyResistanceValue(boys[askingOut].level);
  if (isBoyHit()) {
    boyHealth -= tactics[currentTactic].power + Math.floor(Math.random() * xp) + 1;    
  } else {
    text.innerText += " You miss.";
  }
  loveHealthText.innerText = loveHealth;
  boyHealthText.innerText = boyHealth;
  if (loveHealth <= 0) {
    rejected();
  } else if (boyHealth <= 0) {
    if (askingOut === 2) {
      winGame();
    } else {
      defeatBoy();
    }
  }
  if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += " Your " + inventory.pop() + " breaks.";
    currentTactic--;
  }
}

function getBoyResistanceValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit > 0 ? hit : 0;
}

function isBoyHit() {
  return Math.random() > .2 || loveHealth < 20;
}

function dodge() {
  text.innerText = "You dodge " + boys[askingOut].name + " resisting your charm.";
}

function defeatBoy() {
  money += Math.floor(boys[askingOut].level * 6.7);
  xp += boys[askingOut].level;
  moneyText.innerText = money;
  xpText.innerText = xp;
  update(locations[4]);
}

function rejected() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
}

function restart() {
  xp = 0;
  loveHealth = 100;
  money = 50;
  currentTactic = 0;
  inventory = ["barette"];
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
      rejected();
    }
  }
}