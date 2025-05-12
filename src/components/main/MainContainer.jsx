import { useState } from 'react';
import '../../styles/main/main.css';
import GameIntroModal from './GameIntroModal';
import GamePlayingModal from './playing/GamePlayingModal';
import GameResultModal from './GameResultModal';

export default function MainContainer() {
    // 게임 진행 상태 관리
    // 개임 진행 상태: intro(시작 전), result(게임 종료), playing(게임 진행 중)
    const [gameState, setGameState] = useState('intro');
    const [gameKey, setGameKey] = useState(0); // 게임 상태를 초기화하기 위한 키

    const handleRestart = () => {
        setGameKey(prev => prev + 1);
        setGameState('intro');
    };

    return (
        <main className="main">
            {gameState === 'intro' && <GameIntroModal setGameState={setGameState} />}
            {gameState === 'playing' && <GamePlayingModal gameState={gameState} setGameState={setGameState} />}
            {gameState === 'result' && <GameResultModal setGameState={setGameState} onRestart={handleRestart} />}
        </main>
    );
}