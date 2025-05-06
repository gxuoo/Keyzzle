import { useEffect } from "react";

function Timer({ seconds, setSeconds, gameEnd }) {
  useEffect(() => {
    let interval;
    
    if (!gameEnd) {
      interval = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [gameEnd]);

  const formatTime = (totalSeconds) => {
    const mins = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const secs = String(totalSeconds % 60).padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <div className="timer">
      게임 시간 {formatTime(seconds)}
    </div>
  );
}

export default Timer;
