import { useState, useEffect } from 'react';
import Timer from './Timer';
import Answer from './Answer.jsx';
import Keyboard from './Keyboard.jsx';
import Submit from './Submit.jsx';
import createKeyMap from "./utils/shuffleKey.js";

export default function GamePlayingModal({ gameState, setGameState }) {
    const [playTime, setPlayTime] = useState(0);
    const [resultValue, setResultValue] = useState([]);
    const [keyMap, setKeyMap] = useState({});

    // 게임 시작 시 키맵 초기화
    useEffect(() => {
        setKeyMap(createKeyMap());
        setPlayTime(0);
        setResultValue([]);
    }, []);

    return (
        <>
            <Timer playTime={playTime} setPlayTime={setPlayTime} gameState={gameState} />
            <Answer />
            <Submit setGameState={setGameState} />
            <Keyboard keyMap={keyMap} resultValue={resultValue} />
        </>
    );
}