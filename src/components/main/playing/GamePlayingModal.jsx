import { useState } from "react";
import Timer from "./Timer";
import Answer from "./Answer";
import Keyboard from "./Keyboard";
import Submit from "./Submit";
import createKeyMap from "../utils/shuffleKey.js";

export default function GamePlayingModal({ gameState, setGameState }) {
  const [playTime, setPlayTime] = useState(0);
  const [keyMap] = useState(createKeyMap());
  const [userInputValue, setUserInputValue] = useState([]);
  const [floatingChar, setFloatingChar] = useState(null);

  const handleKeyPressWithPosition = (char, fromPosition) => {
    if (userInputValue.length >= 6 || floatingChar) return;

    setUserInputValue((prevUserInput) => {
      if (prevUserInput.length >= 6) return prevUserInput;

      const newIndex = prevUserInput.length;
      setFloatingChar({
        char,
        from: fromPosition,
        to: null,
        targetIndex: newIndex,
      });
      return prevUserInput;
    });
  };

  return (
    <>
      <Timer
        gameState={gameState}
        playTime={playTime}
        setPlayTime={setPlayTime}
      />
      <Answer
        userInputValue={userInputValue}
        setGameState={setGameState}
        playTime={playTime}
      />
      <Submit
        keyMap={keyMap}
        userInputValue={userInputValue}
        setUserInputValue={setUserInputValue}
        floatingChar={floatingChar}
        setFloatingChar={setFloatingChar}
      />
      <Keyboard
        keyMap={keyMap}
        onKeyPressWithPosition={handleKeyPressWithPosition}
      />
    </>
  );
}
