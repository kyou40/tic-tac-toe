# Tic-Tac-Toe

A Genshin Impact–themed twist on classic tic-tac-toe, built with vanilla HTML, CSS, and JavaScript.

**[Live Preview](https://kyou40.github.io/tic-tac-toe/)**

## About

This isn't standard tic-tac-toe — each player can only have **3 marks on the board at a time**. Place a 4th, and your oldest mark disappears, freeing up that cell. The soon-to-vanish mark pulses as a warning before it's cleared, keeping the game from ever ending in a stalemate and forcing constant re-evaluation of the board.

## Features

- **Vanishing-mark mechanic** — no more than 3 X's or O's on the board per player
- **Visual warning** — the next mark to disappear pulses before it's removed
- **Win detection** across all 8 standard tic-tac-toe lines
- **Restart** button to reset the board mid-game
- **Genshin Impact–inspired UI** — glowing cyan/violet marks, Cinzel/Quicksand typography, and a Silvermoon-styled background

## Tech Stack

- HTML5
- CSS3 (custom properties, gradients, animations)
- Vanilla JavaScript (module pattern / IIFEs, no frameworks or dependencies)

## Getting Started

Clone the repo and open `index.html` in your browser — no build step or dependencies required.

```bash
git clone https://github.com/kyou40/tic-tac-toe.git
cd tic-tac-toe
open index.html
```

## How to Play

1. Player X goes first, then players alternate turns.
2. Click an empty cell to place your mark.
3. Once you have 3 marks on the board, placing a 4th removes your oldest one.
4. Get 3 of your marks in a row (horizontally, vertically, or diagonally) to win.
5. Click **Restart** to play again.
