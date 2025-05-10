import { useState } from 'react';
import '../../styles/main/intro.css';

const GameIntroModal = ({ setGameState }) => {
  const [studentId, setStudentId] = useState('');

  const handleStart = () => {
    if (studentId) {
      const savedPlayerRecords = localStorage.getItem('playerRecords');
      let playerRecords = [];
      try {
        playerRecords = savedPlayerRecords ? JSON.parse(savedPlayerRecords) : [];
      } catch {
        playerRecords = [];
      }

      if (!playerRecords.some(record => record.studentId === studentId)) {
        playerRecords.push({
          studentId: studentId,
          clearTime: null,
          rank: null
        });
      }

      localStorage.setItem('playerRecords', JSON.stringify(playerRecords));
      localStorage.setItem('currentStudentId', studentId);

      setGameState('playing');
    } else {
      alert('학번을 입력해주세요!');
    }
  };

  const handleChange = (e) => {
    setStudentId(e.target.value);
  }

  const handleKey = (e) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      setStudentId(prev => prev.slice(0, -1));
    }
  }

  return (
    <div className="game-intro-container">
      <div className="game-intro-description">
        여기에 게임 설명을 올리면 하는데, 나중에 화면이 완성되고 이미지랑 함께 넣는게 좋을거 같아요.
      </div>
      <input
        className="player-id"
        placeholder="여기에 학번을 입력해주세요!"
        value={studentId}
        onChange={(e) => handleChange(e)}
        onKeyDown={handleKey}
      />
      <button className="game-start-bt" onClick={handleStart}>
        GAME START
      </button>
    </div>
  );
};

export default GameIntroModal;