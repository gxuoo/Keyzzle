import "../../../styles/main/playing/Submit.css";
import { useState, useEffect } from "react";

export default function Submit({ keyMap, userInputValue, setUserInputValue }) {
  const inputLines = Array.from({ length: 6 }, (_, i) => ({
    id: `input-block-${i}`,
  }));

  useEffect(() => {
    const handleKeydown = (e) => {
      const key = e.key.toUpperCase();
      if (!/^[a-zA-Z]$/.test(key)) return;
      if (userInputValue.length >= 6) return;

      // keyMap을 사용하여 키를 매핑하고 업데이트
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
