import { useEffect } from "react";
import "../../../styles/main/playing/Timer.css";

function Timer({ gameState, playTime, setPlayTime }) {  
  useEffect(() => {
    let interval;

    if (gameState === 'playing') {
      interval = setInterval(() => {
        setPlayTime(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [gameState, setPlayTime]);

  const formatTime = (totalSeconds) => {
    const mins = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const secs = String(totalSeconds % 60).padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <div className="timer">
      게임 시간 {formatTime(playTime)}
    </div>
  );
}

export default Timer;
