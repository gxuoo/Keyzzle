import "../../styles/main.css";
import Timer from "../Timer.jsx";
import Input from "./Input.jsx";
import Result from "./Result.jsx";
import { useEffect, useState } from "react";
import createKeyMap from "../utils/shuffleKey.js";
import Keyboard from "../Keyboard.jsx";

export default function Main({ gameState, setGameState }) {
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
    <main className="main">
      <Timer playTime={playTime} setPlayTime={setPlayTime} gameState={gameState} />
      <Input setResultValue={setResultValue} keyMap={keyMap} />
      <Result resultValue={resultValue} playTime={playTime} setGameState={setGameState} />
      <Keyboard keyMap={keyMap} resultValue={resultValue} />
    </main>
  );
}
