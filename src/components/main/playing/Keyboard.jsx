import { useState, useEffect } from "react";
import "../../../styles/main/playing/Keyboard.css";

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
