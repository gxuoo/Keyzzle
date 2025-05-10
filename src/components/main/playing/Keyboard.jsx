import { useState, useEffect } from "react";
import "../../../styles/main/playing/Keyboard.css";

/* 
  현재 Keyboard.jsx는 랜덤된 키보드를 생성하고, 키보드를 누르면 매핑된 값을 보여주는 기능을 한다.
  변경 사항은 게임이 시작 시, 1초 동안 매핑된 모든 키보드 값을 보여주고 (효과를 주면서),
  이후 keyDown 이벤트가 발생한 키에 대해 매핑된 값을 키보드가 눌려지는 동안 보여준다.
  따라서 키보드가 눌려지는 동안 매핑된 값을 보여주는 기능을 추가해야 한다.
*/

export default function Keyboard({ keyMap, resultValue }) {
  const originalKeys = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"],
  ];
  const [showEntireMappedKeys, setShowEntireMappedKeys] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowEntireMappedKeys(false);
    }, 1500);
  }, []);

  return (
    <div className="keyboard">
      {originalKeys.map((row, rowIndex) => (
        <div key={rowIndex} className={`key-row row-${rowIndex}`}>
          {row.map((key) => {
            const mappedKey = keyMap[key] || key;

            return (
              <div
                key={key}
                className="key-block"
                data-original={key}
                data-mapped={mappedKey}
                style={{
                  backgroundColor: "white",
                  boxSizing: "border-box",
                  color: "#017355",
                  fontSize: "50px",
                }}
              >
                {showEntireMappedKeys ? mappedKey : ""}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
