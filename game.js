
const henrietteImg = document.getElementsByClassName('hero')[0];
const arianaImg = document.getElementsByClassName('hero')[1];
const wyonaImg = document.getElementsByClassName('hero')[2];

let henrietteHealthTxt = document.getElementById('healer-health-txt');
let arianalHealthTxt = document.getElementById('archer-health-txt');
let wyonaHealthTxt = document.getElementById('warrior-health-txt');

const daarImg = document.getElementById('daar');
let daarCurrentHP = document.getElementById('daar-currentHP');
let daarHealthTxt = document.getElementById('dragon-health-txt');


const healthTxt = [henrietteHealthTxt, arianalHealthTxt, wyonaHealthTxt];
const heroImg = [henrietteImg, arianaImg,wyonaImg];


let heroesArray = [
  {
    id: 0,
    name: "Henriette Healer",
    maxHP: 400,
    currentHP: 400,
    damage: 100,
    alive: true,
  },
  {
    id: 1,
    name: "Ariana archer",
    maxHP: 500,
    currentHP: 500,
    damage: 400,
    alive: true,
  },
  {
    id: 2,
    name: "Wyona Warrior",
    maxHP: 600,
    currentHP: 600,
    damage: 400,
    alive: true,
  },
];

let dragonObject = {
  name: "Daar Dragon",
  maxHP: 2000,
  currentHP: 2000,
  damage: 200,
  alive: true,
};

henrietteImg.addEventListener('click', heroHenriette)
arianaImg.addEventListener('click', heroAriana);
wyonaImg.addEventListener('click', heroWyona);

// 🔘 creating the damage boost 10% 
document.body.addEventListener('keydown', (event) => {
    if (event.key === 'd') {
      heroesArray.forEach((hero, index) => {
        let boostedDamage = Math.floor(hero.damage * 1.1);
        heroesArray[index] = { ...heroesArray[index], damage: boostedDamage };
      });
    }
  });
  


function heroHenriette () {
  performAttack(0);
  dragonAttack();
  healerBoost();
}

function heroAriana () {
  performAttack(1);
  dragonAttack();
}

function heroWyona () {
  performAttack(2);
  dragonAttack();
}

function performAttack (heroNum) {

let {name,maxHP,currentHP,damage,alive } =  heroesArray[heroNum];

alert(`${name} har gjort ${damage} skade på ${dragonObject.name}`);

daarHealthTxt.textContent = `${dragonObject.currentHP -= damage} / 2000HP`;

}

function dragonAttack() {

let randomIndex;

if (heroesArray.length > 1) {
  randomIndex = Math.floor(Math.random() * heroesArray.length);
} else {
  randomIndex = 0;
}

let { name, maxHP, currentHP, damage } = heroesArray[randomIndex];

alert(`${dragonObject.name} har gjort ${dragonObject.damage} skade på ${name}`);

if (heroesArray[randomIndex].alive) {
  currentHP -= dragonObject.damage;
  currentHP = Math.max(currentHP, 0);

  healthBarColor(randomIndex,currentHP, maxHP)
  healthTxt[randomIndex].textContent = `${currentHP} / ${maxHP} HP`;

  if (currentHP === 0) {
    heroesArray[randomIndex].alive = false;
    heroImg[randomIndex].remove();
    healthTxt[randomIndex].parentNode.parentNode.remove();
    heroesArray = heroesArray.filter((hero) => hero.alive);
  }
}

if (heroesArray.length === 0) {
alert(`Spillet er tapt! ${dragonObject.name} har vunnet!`);
}

if (dragonObject.currentHP <= 0) {
daarImg.remove();
daarHealthTxt.parentNode.parentNode.remove();
arianaImg.removeEventListener('click', heroAriana);
wyonaImg.removeEventListener('click', heroWyona);
henrietteImg.removeEventListener('click', heroHenriette);
setTimeout(() => {
  alert('Gratulerer, du har vunnet spillet!');
}, 1500);
}

heroesArray[randomIndex] = { ...heroesArray[randomIndex], currentHP };
}

function healerBoost() {
heroesArray.forEach((hero, index) => {
if (hero.alive && hero.currentHP < hero.maxHP) {
  hero.currentHP = Math.min(hero.currentHP + 100, hero.maxHP);
  healthTxt[index].textContent = `${hero.currentHP} / ${hero.maxHP} HP`;
  healthBarColor(index, hero.currentHP, hero.maxHP)
}
});
}

function healthBarColor(index, currentHP, maxHP ) {
let heightPercentage = (currentHP / maxHP) * 100;
let healthBars = document.getElementsByClassName('healthbar');
let currentHealthBar = healthBars[index];
const fixedHeight = 50;
const heightInPixels = (heightPercentage / 100) * fixedHeight;
currentHealthBar.style.height = `${heightInPixels}px`;
}
