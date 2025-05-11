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
        <h1>게임 설명</h1>
        <p>1. KeyZzle은 랜덤한 값이 출력되는 키보드를 가지고 <br /> G R E E D Y를 입력하는 게임입니다.</p>
        <p>2. 부스 입장하면서 부여 받은 고유 번호를 입력한 뒤에 <br /> 'Game Start' 버튼을 눌러 게임을 시작해주세요.</p>
        <p>3. 플레이어가 누를 수 있는 키는 키보드의 알파벳 키 뿐입니다.</p>
        <p>4. 매핑 된 키보드에서 G, R, E, D, Y에 해당되는 키를 찾은 뒤,<br /> '정답 제출!' 버튼을 눌러 정답을 입력해주세요.</p>
        <p>5. 정답을 맞추면 클리어 시간이 기록됩니다.</p>
        <p>* 클리어 시간이 짧을수록 높은 순위를 기록합니다!! *</p>
      </div>
      <input
        className="player-id"
        placeholder="여기에 고유 번호를 입력해주세요!"
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