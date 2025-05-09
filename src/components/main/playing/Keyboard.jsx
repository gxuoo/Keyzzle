import { useState, useEffect } from "react";
import "../../../styles/main/playing/Keyboard.css";

/* 
  현재 Keyboard.jsx는 랜덤된 키보드를 생성하고, 키보드를 누르면 매핑된 값을 보여주는 기능을 한다.
  변경 사항은 게임이 시작 시, 1초 동안 매핑된 모든 키보드 값을 보여주고 (효과를 주면서),
  이후 keyDown 이벤트가 발생한 키에 대해 매핑된 값을 키보드가 눌려지는 동안 보여준다.
  따라서 키보드가 눌려지는 동안 매핑된 값을 보여주는 기능을 추가해야 한다.
*/


export default function Keyboard({ keyMap, resultValue }) {
  const answerKeys = new Set(["G", "R", "E", "D", "Y"]);
  const [accumulatedKeys, setAccumulatedKeys] = useState(new Set());
  const originalKeys = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"],
  ];

  useEffect(() => {
    if (resultValue) {
      const newKeys = resultValue
        .map(v => v?.toUpperCase())
        .filter(v => v);

      setAccumulatedKeys(prev =>
        new Set([...prev, ...newKeys])
      );
    }
  }, [resultValue]);

  return (
    <div className="keyboard">
      {originalKeys.map((row, rowIndex) => (
        <div key={rowIndex} className={`key-row row-${rowIndex}`}>
          {row.map((key) => {
            const mappedKey = keyMap[key] || key;
            const isPressed = accumulatedKeys.has(mappedKey);
            const isAnswer = answerKeys.has(mappedKey);

            return (
              <div
                key={key}
                className="key-block"
                data-original={key}
                data-mapped={mappedKey}
                style={{
                  color: isPressed && isAnswer ? "white" : "black",
                  backgroundColor: isPressed && isAnswer ? "#4CAF50" : "#d3d6da",
                  boxSizing: "border-box"
                }}
              >
                {isPressed ? (
                  <>
                    {mappedKey}
                    <div className="input-highlight" />
                  </>
                ) : (
                  <>&nbsp;</>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
