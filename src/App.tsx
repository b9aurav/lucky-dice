import {
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Box,
  Typography,
  Container,
  keyframes,
} from "@mui/material";
import { useState } from "react";
import styled from "@mui/system/styled";

const diceRollAnimation = keyframes`
0% { transform: rotateX(0deg) rotateY(0deg); }
25% { transform: rotateX(-90deg) rotateY(45deg); }
50% { transform: rotateX(-180deg) rotateY(90deg); }
75% { transform: rotateX(-270deg) rotateY(135deg); }
100% { transform: rotateX(-360deg) rotateY(180deg); }
`;

function App() {
  const [points, setPoints] = useState(5000);
  const [bet, setBet] = useState(100);
  const [choice, setChoice] = useState("7 up");
  const [diceResult, setDiceResult] = useState([0, 0]);
  const [gameResult, setGameResult] = useState("");
  const [rolling, setRolling] = useState(false);
  
  const AnimatedBox = styled(Box)(() => ({
    animation: rolling ? `${diceRollAnimation} 1s ease-out` : 'none',
    display: 'inline-block',
    perspective: '600px',
  }));

  const rollDice = () => {
    setRolling(true);
    // Simulate dice roll
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;
    setDiceResult([dice1, dice2]);

    setTimeout(() => {
      setRolling(false);
    }, 1000);

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
    <Container maxWidth="sm">
      <Box py={4} textAlign="center">
        <img src="/logo.png" alt="logo" width={50} height={50} />
        <Typography variant="h4" component="h1" gutterBottom>
          Lucky Dice
        </Typography>
        <Typography variant="h6" component="p" gutterBottom>
          Your Points: {points}
        </Typography>
        <Box
          my={2}
          border={1}
          py={2}
          display="flex"
          justifyContent="center"
          borderRadius={4}
          bgcolor={"white"}
          boxShadow={'0px 0px 25px black'}
        >
          <Box my={2}>
            <Typography variant="h6" component="p" gutterBottom>
              Bet amount:
            </Typography>
            <ToggleButtonGroup
              color="primary"
              value={bet}
              exclusive
              onChange={(e) =>
                setBet(Number((e.target as HTMLInputElement).value))
              }
              aria-label="Platform"
            >
              <ToggleButton value={100} color="success">100</ToggleButton>
              <ToggleButton value={200}>200</ToggleButton>
              <ToggleButton value={500} color="error">500</ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <Box pl={2} ml={2} pt={2} borderLeft={1}>
            <Typography variant="h6" component="p" gutterBottom>
              Choose:
            </Typography>
            <ToggleButtonGroup
              color="primary"
              value={choice}
              exclusive
              onChange={(e) => setChoice((e.target as HTMLInputElement).value)}
              aria-label="Platform"
            >
              <ToggleButton value="7 up" color="success">7▲</ToggleButton>
              <ToggleButton value="7 down" color="error">7▼</ToggleButton>
              <ToggleButton value="Lucky 7">7★</ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Box>
        <Button variant="contained" onClick={rollDice}>
          Roll Dice
        </Button>
        <Box my={2}>
          {diceResult[0] > 0 && (
            <Typography variant="h6" component="p" gutterBottom>
              Dice results:
              <br />
              <AnimatedBox
                component="span"
                color="primary.main"
                fontWeight="bold"
                border={1}
                p={1}
                m={1}
                className="dice"
                px={2}
                bgcolor="whitesmoke"
                borderRadius={1}
              >
                {diceResult[0]}
              </AnimatedBox>
              <AnimatedBox
                component="span"
                color="primary.main"
                fontWeight="bold"
                border={1}
                className="dice"
                p={1}
                m={1}
                px={2}
                bgcolor="whitesmoke"
                borderRadius={1}
              >
                {diceResult[1]}
              </AnimatedBox>
            </Typography>
          )}
          {gameResult && (
            <Typography variant="h6" component="p" gutterBottom>
              Game result: 
              {gameResult == "Win" && (<span style={{color: "green"}}>{gameResult}</span>) || (<span style={{color: "red"}}>{gameResult}</span>)}
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
}

export default App;
