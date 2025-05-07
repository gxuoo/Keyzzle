import { useEffect } from "react";

function Timer({ playTime, setPlayTime, gameState }) {
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
  }, [setPlayTime, gameState]);

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
