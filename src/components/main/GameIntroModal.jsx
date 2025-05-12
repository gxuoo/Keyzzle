import { useState, useEffect, useRef } from 'react';
import '../../styles/main/intro.css';

const inputLines = Array.from({ length: 4 }, (_, i) => ({
  id: `input-block-${i}`,
}));

const GameIntroModal = ({ setGameState }) => {
  const [studentId, setStudentId] = useState('');
  const studentIdRef = useRef('');

  useEffect(() => {
    studentIdRef.current = studentId;
  }, [studentId]);  

  useEffect(() => {
    const handleKeyDown = (e) => {
      
    if (e.key === "Enter") {
      e.preventDefault();
      handleStart();
      return;
    }
      if (e.key === "Backspace") {
        e.preventDefault();
        setStudentId(prev => prev.slice(0, -1));
      } else if (e.key.length === 1 && /^[a-zA-Z0-9]$/.test(e.key)) {
        setStudentId(prev => {
          if (prev.length < 4) {
            return prev + e.key.toUpperCase();
          }
          return prev;
        });
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleStart = () => {
    if (studentIdRef.current.length === 4) {
      const savedPlayerRecords = localStorage.getItem('playerRecords');
      let playerRecords = [];
      try {
        playerRecords = savedPlayerRecords ? JSON.parse(savedPlayerRecords) : [];
      } catch {
        playerRecords = [];
      }

      if (!playerRecords.some(record => record.studentId === studentIdRef.currentntId)) {
        playerRecords.push({
          studentId: studentIdRef.current,
          clearTime: null,
          rank: null
        });
      }

      localStorage.setItem('playerRecords', JSON.stringify(playerRecords));
      localStorage.setItem('currentStudentId', studentIdRef.current);

      setGameState('playing');
    } else {
      alert('고유 번호를 4자리 입력해주세요!');
    }
  };

  return (
    <div className="game-intro-container">
      <div className="game-intro-description">
        <h1>게임 설명</h1>
        <p>1. KeyZzle은 랜덤한 값이 출력되는 키보드를 가지고 <br /> <span className="highlight">G R E E D Y</span>를 입력하는 게임입니다.</p>
        <p>2. 부스 입장하면서 부여 받은 고유 번호를 입력한 뒤에 <br /> 'Game Start' 버튼을 눌러 게임을 시작해주세요!</p>
        <p>3. 입력 가능한 키는 키보드의 <span className="highlight">알파벳 키</span> 입니다.</p>
        <p>4. 랜덤 키보드에서 <span className="highlight">G, R, E, D, Y</span>에 해당되는 키를 찾은 뒤,<br /> '정답 제출!' 버튼을 눌러 정답을 입력해주세요.</p>
        <p>5. 정답을 맞추면 클리어 시간이 기록됩니다.</p>
        <p className="game-intro-description-highlight">* 클리어 시간이 짧을수록 높은 순위를 기록합니다!! *</p>
      </div>
      <div className="game-intro-input-container">
        <div className="game-intro-input-description">
          고유번호:
        </div>
        <div className="game-intro-input-row">
          {inputLines.map((line, i) => (
            <div
              key={line.id}
              className="game-intro-input-board-line"
              data-index={`0${i}`}
            >
              {studentId[i] || ''}
            </div>
          ))}
        </div>
      </div>
      <button className="game-start-bt" onClick={handleStart}>
        GAME START
      </button>
    </div>
  );
};

export default GameIntroModal;