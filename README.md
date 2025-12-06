# 🎲 Pig Game - Dice Game

A fun and interactive **two-player dice game** built using **HTML, CSS, and JavaScript**.
The goal is simple: **be the first player to reach 100 points!**

---

## 🚀 Live Demo

*(Add your live link here when deployed)*
Example:

```
https://yourusername.github.io/pig-game/
```

---

## 📖 About the Game

The **Pig Game** is a classic turn-based dice game:

* Players take turns to **roll** a dice.
* Each roll (2–6) is added to the **current score**.
* If a **1** appears, the current score is lost and the turn switches.
* Players can **hold** to save their current score into total score.
* First player to reach **100 points** wins. 🏆

---

## ✅ Features

✔️ 2 Player Mode
✔️ Roll Dice Button
✔️ Hold Button
✔️ New Game / Reset
✔️ Turn Indicator
✔️ Winner Alert
✔️ Clean & Simple UI
✔️ Responsive Design

---

## 🎮 How To Play

1. Player 1 starts the game.
2. Click **Roll Dice** to generate a number:

   * If **1** → Lose round score, switch player
   * If **2 – 6** → Added to current score
3. Click **Hold** to save points.
4. First to reach **100** wins the game.

---

## 🛠️ Technologies Used

* HTML5
* CSS3
* JavaScript (ES6)

No framework, no library — pure Vanilla JS.

---

## 📁 Project Structure

```
PIG-GAME/
│
├── index.html
├── style.css
├── script.js
├── dice-1.png
├── dice-2.png
├── dice-3.png
├── dice-4.png
├── dice-5.png
├── dice-6.png
└── README.md
```

---

## 🖥️ How to Run Locally

1. Download or clone repository:

```
git clone https://github.com/yourusername/pig-game.git
```

2. Open folder
3. Double click `index.html`

Or use Live Server in VS Code.

---

## 🧠 Game Logic (Short Preview)

```javascript
let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

function rollDice() {
  const dice = Math.trunc(Math.random() * 6) + 1;
  if (dice !== 1) {
    currentScore += dice;
  } else {
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
  }
}
```

---

## 🌟 Future Improvements

* AI Player Mode
* Dark / Light theme
* Sound effects
* Online Multiplayer

---

## 👤 Author

**Usman Minhas**
Frontend Developer / Web Designer 🚀

> Feel free to fork, modify, and use this project.

---

## ⭐ Give this project a star if you like it!

Your support means a lot ❤️
