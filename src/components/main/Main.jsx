import "../../styles/main.css";
import Timer from "./Timer.jsx";
import Input from "./Input.jsx";
import Result from "./Result.jsx";
import { useEffect, useState } from "react";
import createKeyMap from "./utils/shuffleKey.js";
import Keyboard from "./Keyboard.jsx";

export default function Main() {
  const [seconds, setSeconds] = useState(0);
  const [resultValue, setResultValue] = useState([]);
  const [keyMap, setKeyMap] = useState({});
  const [gameEnd, setGameEnd] = useState(false);

  useEffect(() => {
    setKeyMap(createKeyMap());
  }, [])
  
  return (
    <main className="main">
      <Timer seconds={seconds} setSeconds={setSeconds} gameEnd={gameEnd} />
      <Input setResultValue={setResultValue} keyMap={keyMap} />
      <Result resultValue={resultValue} seconds={seconds} setGameEnd={setGameEnd} />
      <Keyboard keyMap={keyMap} resultValue={resultValue} />
    </main>
  );
}
