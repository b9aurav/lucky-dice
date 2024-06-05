import React, { useState } from 'react';

const Game = () => {
  const [points, setPoints] = useState(5000);
  const [bet, setBet] = useState(100);
  const [choice, setChoice] = useState('7 up');
  const [diceResult, setDiceResult] = useState([0, 0]);
  const [gameResult, setGameResult] = useState('');

  const rollDice = () => {
    // Simulate dice roll
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;
    setDiceResult([dice1, dice2]);

    // Simulate game result
    const total = dice1 + dice2;
    let result;
    if (choice === '7 up' && total > 7) result = 'Win';
    else if (choice === '7 down' && total < 7) result = 'Win';
    else if (choice === 'Lucky 7' && total === 7) result = 'Win';
    else result = 'Lose';
    setGameResult(result);

    // Simulate new points
    const newPoints = result === 'Win' ? points + bet : points - bet;
    setPoints(newPoints);
  };

  return (
    <div>
      <p>Points: {points}</p>
      <select value={bet} onChange={(e) => setBet(Number(e.target.value))}>
        <option value={100}>100</option>
        <option value={200}>200</option>
        <option value={500}>500</option>
      </select>
      <select value={choice} onChange={(e) => setChoice(e.target.value)}>
        <option value="7 up">7 up</option>
        <option value="7 down">7 down</option>
        <option value="Lucky 7">Lucky 7</option>
      </select>
      <button onClick={rollDice}>Roll dice</button>
      {diceResult[0] > 0 && <p>Dice results: {diceResult[0]}, {diceResult[1]}</p>}
      {gameResult && <p>Game result: {gameResult}</p>}
    </div>
  );
};

export default Game;