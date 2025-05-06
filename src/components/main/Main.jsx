import "../../styles/main.css";
import Timer from "./Timer.jsx";
import Input from "./Input.jsx";
import Result from "./Result.jsx";
import { useEffect, useState } from "react";
import createKeyMap from "./utils/shuffleKey.js";
import Keyboard from "./Keyboard.jsx";

export default function Main() {
  const [resultValue, setResultValue] = useState([]);
  const [keyMap, setKeyMap] = useState({});
  console.log(keyMap);

  useEffect(() => {
    setKeyMap(createKeyMap());
  }, [])
  
  return (
    <main className="main">
      <Timer />
      <Input setResultValue={setResultValue} keyMap={keyMap} />
      <Result resultValue={resultValue} />
      <Keyboard keyMap={keyMap} resultValue={resultValue} />
    </main>
  );
}
