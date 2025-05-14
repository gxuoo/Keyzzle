import { useEffect } from "react";
import "../../../styles/main/playing/Timer.css";

function Timer({ playTime, setPlayTime, gameState, setGameState, isCorrect }) {
  useEffect(() => {
    let interval;

    if (gameState === 'playing' && !isCorrect) {
      interval = setInterval(() => {
        setPlayTime(prev => prev + 1);
      }, 1000);
    }

    if (playTime === 120) {
      setGameState("result");
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [playTime, setPlayTime, gameState, isCorrect]);

  const formatTime = (totalSeconds) => {
    const mins = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const secs = String(totalSeconds % 60).padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <div className="timer">
      게임 시간 {formatTime(120 - playTime)}
    </div>
  );
}

export default Timer;
