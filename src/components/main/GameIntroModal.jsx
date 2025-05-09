import { useState } from 'react';
import '../../styles/main/intro.css';

const GameIntroModal = ({ setGameState }) => {
  const [studentId, setStudentId] = useState('');

  const handleStart = () => {
    if (studentId) {
      const existing = localStorage.getItem('studentIds');
      let arr = [];
      try {
        arr = existing ? JSON.parse(existing) : [];
      } catch {
        arr = [];
      }
      // 여기 중복되는 학번 검사 부분은 추후에 더 좋은 기록으로 덮어쓴다던가 하는 방식이 필요할 듯 합니다.
      if (!arr.some(item => item.id === studentId)) {
        arr.push({ id: studentId });
      }
      localStorage.setItem('studentIds', JSON.stringify(arr));
      localStorage.setItem('currentStudentId', studentId);  // 현재 플레이어가 누군지 확인하기 위한 용도.
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