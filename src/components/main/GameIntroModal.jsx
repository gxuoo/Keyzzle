import { useEffect } from 'react';
import '../../styles/main/intro1.css';

const GameIntroModal = ({ setGameState }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        setGameState('intro2');
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="game-intro1-container">
      <div className="game-intro1-description">
        <h1>게임 설명</h1>
        <p>1. KeyZzle은 랜덤한 값이 출력되는 키보드를 통해 <br /> <span className="highlight-yellow">G R E E D Y</span>를 입력하는 게임입니다.</p>
        <p>2. 부스 입장하면서 부여 받은 고유 번호를 입력한 뒤에 <br /> <span className="highlight-lightskyblue">Game Start</span> 버튼을 눌러 게임을 시작해주세요!</p>
        <p>3. 랜덤 키보드에서 <span className="highlight-yellow">G, R, E, D, Y</span>에 해당되는 키를 찾은 뒤, <br /> <span className="highlight-red">G R E E D Y</span>를 순서대로 입력해주세요!!</p>
        <p>4. 정답을 맞추면 클리어 시간이 기록됩니다.</p>
        <p className="highlight-red">* 클리어 시간이 짧을수록 높은 순위를 기록합니다!! *</p>
        <h1>게임 조작</h1>
        <p><span className="highlight-yellow">A to Z</span> 키를 눌러 입력할 수 있습니다. <br /></p>
        <p><span className="highlight-lightskyblue">Backspace</span> 키를 눌러 입력한 값을 모두 지울 수 있습니다.</p>
      </div>
      <button className="next-bt" onClick={() => setGameState('intro2')}>
        다음
      </button>
    </div >
  );
};

export default GameIntroModal;