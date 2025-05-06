import { useState } from 'react';
import '../../styles/modal.css';

const GameIntroModal = ({ setIsOpenModal }) => {
  const [studentId, setStudentId] = useState('');

  const handleStart = () => {
    if(studentId) {
      localStorage.setItem('studentId', JSON.stringify({ id: studentId }));
      setIsOpenModal(false);
    } else {
      alert('학번을 입력해주세요!');
    }
  };

  return (
    <div className="game-intro-container">
      <div className="game-intro-wrapper">
        <div className="game-name">KEYZZLE</div>
        <div className="game-intro-body">
          여기에 게임 설명을 올리면 하는데, 나중에 화면이 완성되고 이미지랑 함께 넣는게 좋을거 같아요.
        </div>
        <input
          className="player-id"
          placeholder="여기에 학번을 입력해주세요!"
          value={studentId}
          onChange={e => setStudentId(e.target.value)}
        />
        <button className="game-start-bt" onClick={handleStart}>
          GAME START
        </button>
      </div>
    </div>
  );
};

export default GameIntroModal;