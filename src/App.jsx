import { useState, useEffect, useRef, useReducer } from "react";
import Field from "./Field";

const initialState = { score: 0, highScore: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "increaseScore":
      return { ...state, score: state.score + 1 };
    case "resetScore":
      return { ...state, score: 0 };
    case "setHighScoreFromCurrent":
      return { ...state, highScore: Math.max(state.highScore, state.score) };
    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [isGameOver, setIsGameOver] = useState(false);
  const timerRef = useRef(null);

  function increaseScore() {
    dispatch({ type: "increaseScore" });
  }

  function startGame() {
    dispatch({ type: "resetScore" });
    setTimeLeft(15);
    setIsPlaying(true);
    setIsGameOver(false);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
  }

  function restartGame() {
    dispatch({ type: "setHighScoreFromCurrent" });
    setIsPlaying(false);
    setIsGameOver(false);
    clearInterval(timerRef.current);
  }

  useEffect(() => {
    if (timeLeft <= 0 && isPlaying) {
      clearInterval(timerRef.current);
      setIsPlaying(false);
      setIsGameOver(true);
      dispatch({ type: "setHighScoreFromCurrent" });
    }
  }, [timeLeft, isPlaying]);

  return (
    <div>
      <h1>Whack-a-Mole</h1>

      {!isPlaying && !isGameOver ? (
        <div className="welcome">
          <p>Welcome! Whack the mole when it appears to earn points.</p>
          <p>High Score: {state.highScore}</p>
          <button onClick={startGame}>Play</button>
        </div>
      ) : isGameOver ? (
        <div className="game-over">
          <h2>Game Over!</h2>
          <p>Your final score: {state.score}</p>
          <p>High Score: {state.highScore}</p>
          <button onClick={restartGame}>Restart</button>
        </div>
      ) : (
        <div className="game">
          <h2>Score: {state.score}</h2>
          <h3>Time Left: {timeLeft}s</h3>
          <button onClick={restartGame}>Restart</button>
          <Field increaseScore={increaseScore} />
        </div>
      )}
    </div>
  );
}
