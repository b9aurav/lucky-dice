import { Button, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";

function App() {
  const [points, setPoints] = useState(5000);
  const [bet, setBet] = useState(100);
  const [choice, setChoice] = useState("7 up");
  const [diceResult, setDiceResult] = useState([0, 0]);
  const [gameResult, setGameResult] = useState("");

  const rollDice = () => {
    // Simulate dice roll
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;
    setDiceResult([dice1, dice2]);

    // Simulate game result
    const total = dice1 + dice2;
    let result;
    if (choice === "7 up" && total > 7) result = "Win";
    else if (choice === "7 down" && total < 7) result = "Win";
    else if (choice === "Lucky 7" && total === 7) result = "Win";
    else result = "Lose";
    setGameResult(result);

    // Simulate new points
    const newPoints = result === "Win" ? points + bet : points - bet;
    setPoints(newPoints);
  };

  return (
    <div>
      <p>Points: {points}</p>
      <ToggleButtonGroup
        color="primary"
        value={bet}
        exclusive
        onChange={(e) => setBet(Number((e.target as HTMLInputElement).value))}
        aria-label="Platform"
      >
        <ToggleButton value={100}>100</ToggleButton>
        <ToggleButton value={200}>200</ToggleButton>
        <ToggleButton value={500}>500</ToggleButton>
      </ToggleButtonGroup>
      <ToggleButtonGroup
        color="primary"
        value={choice}
        exclusive
        onChange={(e) => setChoice((e.target as HTMLInputElement).value)}
        aria-label="Platform"
      >
        <ToggleButton value="7 up">7 up</ToggleButton>
        <ToggleButton value="7 down">7 down</ToggleButton>
        <ToggleButton value="Lucky 7">Lucky 7</ToggleButton>
      </ToggleButtonGroup>
      <Button variant="contained" onClick={rollDice}>Roll Dice</Button>
      {diceResult[0] > 0 && (
        <p>
          Dice results: {diceResult[0]}, {diceResult[1]}
        </p>
      )}
      {gameResult && <p>Game result: {gameResult}</p>}
    </div>
  );
}

export default App;
