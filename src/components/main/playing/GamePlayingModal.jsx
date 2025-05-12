import { useState, useEffect } from "react";
import Timer from "./Timer";
import Answer from "./Answer";
import Keyboard from "./Keyboard";
import Submit from "./Submit";
import createKeyMap from "../utils/shuffleKey.js";

export default function GamePlayingModal({ gameState, setGameState }) {
  const [playTime, setPlayTime] = useState(0);
  const [keyMap, setKeyMap] = useState({});
  const [userInputValue, setUserInputValue] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);

  // 게임 시작 시 키맵 초기화
  useEffect(() => {
    setKeyMap(createKeyMap());
    setPlayTime(0);
    setIsCorrect(false);
  }, []);

  return (
    <>
      <Timer
        playTime={playTime}
        setPlayTime={setPlayTime}
        gameState={gameState}
        isCorrect={isCorrect}
      />
      <Answer
        userInputValue={userInputValue}
        setGameState={setGameState}
        playTime={playTime}
        setIsCorrect={setIsCorrect}
      />
      <Submit
        keyMap={keyMap}
        userInputValue={userInputValue}
        setUserInputValue={setUserInputValue}
      />
      <Keyboard keyMap={keyMap} />
    </>
  );
}
