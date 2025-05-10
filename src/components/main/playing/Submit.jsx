import "../../../styles/main/playing/Submit.css";
import { useState, useEffect } from "react";

export default function Submit({ setGameState, keyMap }) {
  // 정답을 맞추면 결과 페이지로 이동 (아직 정답 맞추는 로직 없어서 임시로 버튼 누르면 결과 페이지로 이동)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setGameState("result");
  };

  const [isSubmitButtonClicked, setIsSubmitButtonClicked] = useState(false);
  const inputLines = Array.from({ length: 6 }, (_, i) => ({
    id: `input-block-${i}`,
  }));
  const [userInputValue, setUserInputValue] = useState([]);

  useEffect(() => {
    if (isSubmitButtonClicked) {
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
    }
  }, [isSubmitButtonClicked, userInputValue, keyMap]);

  useEffect(() => {
    if (userInputValue.length === 6) {
      setTimeout(() => {
        setUserInputValue([]);
      }, 300);
    }
  }, [userInputValue]);

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
            >
              {userInputValue[i]}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
