import "../../../styles/main/playing/Submit.css";
import { useEffect, useRef } from "react";

export default function Submit({ keyMap, userInputValue, setUserInputValue }) {
  const inputLines = Array.from({ length: 6 }, (_, i) => ({
    id: `input-block-${i}`,
  }));
  const lastKeyPressTime = useRef({});

  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.repeat) {
        e.preventDefault();
        return;
      }

      // Backspace 키 처리 (맥북의 Delete 키도 'Backspace'로 인식됨)
      if (e.key === "Backspace") {
        e.preventDefault();
        setUserInputValue([]);
        return;
      }

      const key = e.key.toUpperCase();
      if (!/^[a-zA-Z]$/.test(key)) return;
      if (userInputValue.length >= 6) return;

      const currentTime = Date.now();
      const lastPress = lastKeyPressTime.current[key] || 0;

      if (currentTime - lastPress < 100) {
        e.preventDefault();
        return;
      }

      lastKeyPressTime.current[key] = currentTime;
      const mappedKey = keyMap ? keyMap[key] : key;
      setUserInputValue((prevInputValue) => [...prevInputValue, mappedKey]);
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [userInputValue, keyMap]);

  useEffect(() => {
    if (userInputValue.length === 6) {
      setTimeout(() => {
        setUserInputValue([]);
      }, 300);
    }
  }, [userInputValue]);

  return (
    <div>
      <div className="input-row">
        {inputLines.map((line, i) => (
          <div
            key={line.id}
            className="input-board-line"
            data-index={`0${i}`}
          >
            {userInputValue[i]}
          </div>
        ))}
      </div>
    </div>
  );
}
