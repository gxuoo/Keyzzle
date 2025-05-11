import "../../../styles/main/playing/Submit.css";
import { useState, useEffect, useRef } from "react";
import FloatingChar from "./FloatingChar";

export default function Submit({ keyMap, userInputValue, setUserInputValue, floatingChar, setFloatingChar }) {
  const [isSubmitButtonClicked, setIsSubmitButtonClicked] = useState(false);
  const inputLines = Array.from({ length: 6 }, (_, i) => ({
    id: `input-block-${i}`,
  }));
  const inputRefs = useRef([]);

  useEffect(() => {
    if (
      floatingChar &&
      floatingChar.to == null &&
      inputRefs.current[floatingChar.targetIndex]
    ) {
      const rect = inputRefs.current[floatingChar.targetIndex].getBoundingClientRect();
      setFloatingChar((char) => {
        if (char.to) return char;
        return {
          ...char,
          to: { x: rect.left + rect.width / 4, y: rect.top + rect.height / 4 },
        };
      });
    }
  }, [floatingChar]);

  useEffect(() => {
    if (isSubmitButtonClicked) {
      const handleKeydown = (e) => {
        const key = e.key.toUpperCase();
        if (!/^[a-zA-Z]$/.test(key) && userInputValue.length >= 6) return;
      };

      window.addEventListener("keydown", handleKeydown);
      return () => window.removeEventListener("keydown", handleKeydown);
    }
  }, [isSubmitButtonClicked, userInputValue, keyMap]);

  useEffect(() => {
    if (userInputValue.length === 6) {
      setTimeout(() => {
        setUserInputValue([]);
      }, 300);
    }
  }, [userInputValue]);

  const handleAnimationEnd = () => {
    if (userInputValue.length < 6) {
      setUserInputValue(prev => [...prev, floatingChar.char]);
    }
    setFloatingChar(null);
  };

  return (
    <div>
      {!isSubmitButtonClicked ? (
        <div className="submit-button">
          <button type="button" onClick={() => setIsSubmitButtonClicked(true)}>
            정답 제출!
          </button>
        </div>
      ) : (
        <div className="input-row">
          {inputLines.map((line, i) => (
            <div
              key={line.id}
              className="input-board-line"
              data-index={`0${i}`}
              ref={el => (inputRefs.current[i] = el)}
            >
              {userInputValue[i]}
            </div>
          ))}
          {floatingChar && floatingChar.from && floatingChar.to && (
            <FloatingChar
              char={floatingChar.char}
              from={floatingChar.from}
              to={floatingChar.to}
              onAnimationEnd={handleAnimationEnd}
            />
          )}
        </div>
      )}
    </div>
  );
}
