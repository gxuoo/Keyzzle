import { useState } from 'react';
import './App.css';
import Header from './components/header/Header';
import Main from './components/main/Main';
import GameIntroModal from './components/aside/GameIntroModal';
import GameResultModal from './components/aside/GameResultModal';

function App() {
  // 게임 진행 상태 관리
  // 개임 진행 상태: intro(시작 전), result(게임 종료), playing(게임 진행 중)
  const [gameState, setGameState] = useState('intro');
  const [gameKey, setGameKey] = useState(0); // 게임 상태를 초기화하기 위한 키

  const handleRestart = () => {
    setGameKey(prev => prev + 1);
    setGameState('intro');
  };

  return (
    <div className="App">
      <Header />
      <Main key={gameKey} gameState={gameState} setGameState={setGameState} />
      {gameState === 'intro' && <GameIntroModal setGameState={setGameState} />}
      {gameState === 'result' && <GameResultModal setGameState={setGameState} onRestart={handleRestart} />}
    </div>
  );
}

export default App;
