import { useState, useEffect, useRef } from "react";
import Field from "./Field";

export default function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [isGameOver, setIsGameOver] = useState(false);
  const timerRef = useRef(null);

  function increaseScore() {
    setScore(score + 1);
  }

  function startGame() {
    setScore(0);
    setTimeLeft(15);
    setIsPlaying(true);
    setIsGameOver(false);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
  }

  function restartGame() {
    if (score > highScore) setHighScore(score);
    setIsPlaying(false);
    setIsGameOver(false);
    clearInterval(timerRef.current);
  }

  useEffect(() => {
    if (timeLeft <= 0 && isPlaying) {
      clearInterval(timerRef.current);
      setIsPlaying(false);
      setIsGameOver(true);
      if (score > highScore) setHighScore(score);
    }
  }, [timeLeft, isPlaying]);

  return (
    <div>
      <h1>Whack-a-Mole</h1>

      {!isPlaying && !isGameOver ? (
        <div className="welcome">
          <p>Welcome! Whack the mole when it appears to earn points.</p>
          <p>High Score: {highScore}</p>
          <button onClick={startGame}>Play</button>
        </div>
      ) : isGameOver ? (
        <div className="game-over">
          <h2>Game Over!</h2>
          <p>Your final score: {score}</p>
          <p>High Score: {highScore}</p>
          <button onClick={restartGame}>Restart</button>
        </div>
      ) : (
        <div className="game">
          <h2>Score: {score}</h2>
          <h3>Time Left: {timeLeft}s</h3>
          <button onClick={restartGame}>Restart</button>
          <Field increaseScore={increaseScore} />
        </div>
      )}
    </div>
  );
}
