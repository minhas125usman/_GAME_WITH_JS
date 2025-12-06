const WIN_SCORE = 100;

let scores, currentScore, activePlayer, playing;
let playerNames = ['PLAYER 1', 'PLAYER 2'];

const scoreEls = [document.getElementById('score-0'), document.getElementById('score-1')];
const currentEls = [document.getElementById('current-0'), document.getElementById('current-1')];
const playerEls = [document.getElementById('player-0'), document.getElementById('player-1')];
const nameEls = [document.getElementById('name-0'), document.getElementById('name-1')];
const diceImg = document.getElementById('dice-img');
const btnRoll = document.getElementById('btn-roll');
const btnHold = document.getElementById('btn-hold');
const btnNew = document.getElementById('btn-new');

function makeDiceSVG(n, size = 92) {
  const r = Math.round(size / 12);
  const pip = (cx, cy) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#2b2b2b"/>`;

  const positions = {
    1: [[50,50]],
    2: [[30,30],[70,70]],
    3: [[30,30],[50,50],[70,70]],
    4: [[30,30],[30,70],[70,30],[70,70]],
    5: [[30,30],[30,70],[50,50],[70,30],[70,70]],
    6: [[30,25],[30,50],[30,75],[70,25],[70,50],[70,75]]
  };

  const pips = (positions[n] || []).map(pos => pip(pos[0], pos[1])).join('');

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#ffffff"/>
          <stop offset="100%" stop-color="#f2f2f2"/>
        </linearGradient>
      </defs>
      <rect rx="14" ry="14" width="100" height="100" fill="url(#g)" stroke="#e0e0e0" stroke-width="2"/>
      ${pips}
    </svg>
  `;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

function animateDice() {
  diceImg.style.transition = 'transform 90ms cubic-bezier(.2,.9,.3,1)';
  diceImg.style.transform = 'translateY(-8px) rotate(-6deg)';
  setTimeout(()=> diceImg.style.transform = 'translateY(3px) rotate(10deg)', 80);
  setTimeout(()=> diceImg.style.transform = 'translateY(-3px) rotate(-4deg)', 160);
  setTimeout(()=> diceImg.style.transform = 'translateY(0px) rotate(0deg)', 260);
}

function switchPlayer() {
  currentScore = 0;
  currentEls[activePlayer].textContent = '0';
  playerEls[activePlayer].classList.remove('active');
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerEls[activePlayer].classList.add('active');
}

function init(askNames = true) {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  scoreEls[0].textContent = '0';
  scoreEls[1].textContent = '0';
  currentEls[0].textContent = '0';
  currentEls[1].textContent = '0';

  playerEls.forEach((el, i) => {
    el.classList.remove('winner');
    el.classList.toggle('active', i === 0);
  });

  diceImg.classList.add('hidden');
  diceImg.style.transform = 'none';
  diceImg.style.opacity = '1';

  if (askNames) {
    const p1 = prompt('Enter Player 1 name:', 'Usman');
    const p2 = prompt('Enter Player 2 name:', 'Dilbahr');

    playerNames[0] = (p1 && p1.trim().length) ? p1.trim() : 'Player 1';
    playerNames[1] = (p2 && p2.trim().length) ? p2.trim() : 'Player 2';

    nameEls[0].textContent = playerNames[0].toUpperCase();
    nameEls[1].textContent = playerNames[1].toUpperCase();

    alert('Player 1: ' + playerNames[0]);
    alert('Player 2: ' + playerNames[1]);
  } else {
    nameEls[0].textContent = playerNames[0].toUpperCase();
    nameEls[1].textContent = playerNames[1].toUpperCase();
  }
}

init(true);

btnRoll.addEventListener('click', function() {
  if (!playing) return;

  const dice = Math.floor(Math.random()*6) + 1;

  diceImg.src = makeDiceSVG(dice);
  diceImg.classList.remove('hidden');
  animateDice();

  if (dice !== 1) {
    currentScore += dice;
    currentEls[activePlayer].textContent = currentScore;
  } else {
    currentScore = 0;
    currentEls[activePlayer].textContent = '0';
    setTimeout(switchPlayer, 420);
  }
});

btnHold.addEventListener('click', function() {
  if (!playing) return;

  scores[activePlayer] += currentScore;
  scoreEls[activePlayer].textContent = scores[activePlayer];

  if (scores[activePlayer] >= WIN_SCORE) {
    playing = false;
    playerEls[activePlayer].classList.add('winner');
    playerEls[activePlayer].classList.remove('active');
    diceImg.classList.remove('hidden');
    diceImg.style.transform = 'scale(1.06)';
    const winnerName = playerNames[activePlayer];
    const loserName = playerNames[activePlayer === 0 ? 1 : 0];
    alert(`${winnerName} won the game against ${loserName} 🎉`);
    return;
  }

  currentScore = 0;
  currentEls[activePlayer].textContent = '0';
  switchPlayer();
});

btnNew.addEventListener('click', function() {
  if (!confirm('Start a new game?')) return;
  init(true);
});

document.addEventListener('keydown', (e) => {
  if (!playing) return;
  if (e.key === 'r' || e.key === 'R') btnRoll.click();
  if (e.key === 'h' || e.key === 'H') btnHold.click();
});
