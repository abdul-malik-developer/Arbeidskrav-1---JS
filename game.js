
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

let arrNames = ['healer', 'archer', 'warrior']

// *  Changing the names of heroes in html. 

document.getElementById('healer-name-txt').innerText = 'Henriette';
document.getElementById('archer-name-txt').innerText = 'Ariana';
document.getElementById('warrior-name-txt').innerText = 'Wyona'

// *  Creating the font-family;

const linkElement = document.createElement('link');
linkElement.rel = 'stylesheet';
linkElement.href = 'https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Rubik+Doodle+Shadow&display=swap';
document.head.appendChild(linkElement);
document.body.style.fontFamily = "'Cinzel Decorative', serif";
document.body.style.fontSize = "16px";


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
    if (dragonObject.alive){
      setTimeout(() => {
      dragonAttack();
      }, 2500);
    }
    healerBoost();
}

function heroAriana() {
    performAttack(1);
    if (dragonObject.alive){
    setTimeout(() => {
    dragonAttack();
    }, 2500);
  }
}

function heroWyona () {
    performAttack(2);

    if (dragonObject.alive){
      setTimeout(() => {
      dragonAttack();
      }, 2500);
}
}

function performAttack(heroId) {

  const hero = heroesArray.find((hero) => hero.id === heroId);

  let { name, maxHP, currentHP, damage, alive } = hero;

  showAlert(`${name} har gjort ${damage} skade på ${dragonObject.name}`, `#FFD700`);

  dragonObject.currentHP -= damage;

  dragonObject.currentHP = Math.max(dragonObject.currentHP, 0);

  daarHealthTxt.textContent = `${dragonObject.currentHP} / ${dragonObject.maxHP}HP`;

  if (dragonObject.currentHP === 0) {
    dragonObject.alive = false;
    daarImg.remove();
    daarHealthTxt.parentNode.parentNode.remove();
    arianaImg.removeEventListener('click', heroAriana);
    wyonaImg.removeEventListener('click', heroWyona);
    henrietteImg.removeEventListener('click', heroHenriette);
    setTimeout(() => {
    showAlert('Gratulerer, du har vunnet spillet!','#fff');
  }, 1500)
  }

  DragonHealthBarColor(dragonObject.currentHP, dragonObject.maxHP);
}

function dragonAttack() {

let randomIndex;

do {
  randomIndex = Math.floor(Math.random() * 3);
}while (!heroesArray[randomIndex].alive)


let { name, maxHP, currentHP, damage, alive } = heroesArray[randomIndex];

showAlert(`${dragonObject.name} har gjort ${dragonObject.damage} skade på ${name}`,'#A30000' )


  currentHP -= dragonObject.damage;

  currentHP = Math.max(currentHP, 0);

  healthBarColor(randomIndex,currentHP, maxHP)
  
  healthTxt[randomIndex].textContent = `${currentHP} / ${maxHP} HP`;

  // * Important to update the currentHP in the array. 
  heroesArray[randomIndex] = { ...heroesArray[randomIndex], currentHP };

if (currentHP === 0) {
  heroesArray[randomIndex].alive = false;
  heroImg[randomIndex].remove();
  healthTxt[randomIndex].parentNode.parentNode.style.opacity = 0.1;
}

if (heroesArray.every(hero => !hero.alive)) {
  showAlert(`Spillet er tapt! ${dragonObject.name} har vunnet!`, 'red')
} 

}

function healerBoost() {
heroesArray.forEach((hero, index) => {
if (hero.alive && hero.currentHP < hero.maxHP) {
    hero.currentHP = Math.min(hero.currentHP + 100, hero.maxHP);
    healthTxt[index].style.color = 'blue';
    setTimeout(() =>{
        healthTxt[index].style.color = 'black';
    },1000)
    healthTxt[index].textContent = `${hero.currentHP} / ${hero.maxHP} HP`;
    healthBarColor(index, hero.currentHP, hero.maxHP)
}
});
}

function healthBarColor(index, currentHP, maxHP) {
  let heightPercentage = (currentHP / maxHP) * 100;
  const healthBars = document.querySelector(`.${arrNames[index].toLowerCase()}-health`);
  const fixedHeight = 300;
  const heightInPixels = (heightPercentage / 100) * fixedHeight;
  healthBars.style.width = `${heightInPixels}px`;
}

function DragonHealthBarColor(currentHP,maxHP) {
    let heightPercentage = (currentHP / maxHP) * 100;
    const healthBars = document.querySelector('.dragon-health');
    const fixedHeight = 300;
    const heightInPixels = (heightPercentage / 100) * fixedHeight;
    healthBars.style.width = `${heightInPixels}px`;
}

function showAlert(message, color) {
    const alertContainer = document.createElement('div');
    let h1 = document.createElement('h1');
    h1.textContent = message;

    alertContainer.appendChild(h1);

    alertContainer.setAttribute('style', `
    position: fixed;
    top: 350px;
    left: 36%;
    width: 300px;
    height: 100px;
    padding: 10px;
    border-radius: 10px; 
    box-shadow: 0 5px 2px 0 #00000022;
    background-color: ${color}; 
    font-size: 0.6rem;
    color: #868686;
    opacity: 1;
    transition: opacity 1s ease-out;
    `);
    document.body.appendChild(alertContainer);

    setTimeout(() => {
        alertContainer.style.opacity = '0';
    }, 1000);
}
