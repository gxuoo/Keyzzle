import { useState, useEffect, useRef } from "react";
import "../../../styles/main/playing/Keyboard.css";

export default function Keyboard({ keyMap }) {
  const originalKeys = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"],
  ];
  const [showEntireMappedKeys, setShowEntireMappedKeys] = useState(false);
  const [currentKey, setCurrentKey] = useState([]);
  const [inputEnabled, setInputEnabled] = useState(false);
  const holdKeys = useRef(new Set());

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setShowEntireMappedKeys(true); // 0.1초 뒤에 보여줌
    }, 200);
  
    const hideTimer = setTimeout(() => {
      setShowEntireMappedKeys(false); // 1.5초 뒤에 숨김
      setInputEnabled(true);
    }, 1600);
  
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);
  

  useEffect(() => {
    const handleKeydown = (e) => {
      if (!inputEnabled) return; 
      if (e.repeat) return; // 키보드 이벤트 중복됨을 방지합니다. (성능 저하 방지용)

      const key = e.key.toUpperCase();
      if (!/^[a-zA-Z]$/.test(key)) return;

      const mappedKey = keyMap[key] || key;

      // 아래는 같은 키보드 입력이 반복될 때 깜박이는 현상 방지용입니다. (중복 입력 방지지)
      if (!holdKeys.current.has(mappedKey)) {
        holdKeys.current.add(mappedKey);
        setCurrentKey((prev) => [...prev, mappedKey]);
      }
    };
    
    // 타이머를 키에서 손을 떼었을 때를 기준으로 시작합니다.
    const handleKeyup = (e) => {
      if (!inputEnabled) return; 
      const key = e.key.toUpperCase();
      if (!/^[a-zA-Z]$/.test(key)) return;

      const mappedKey = keyMap[key] || key;

      holdKeys.current.delete(mappedKey);

      setTimeout(() => {
        setCurrentKey((prev) => prev.filter((k) => k !== mappedKey));
      }, 500);
    };

    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("keyup", handleKeyup);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
      window.removeEventListener("keyup", handleKeyup);
    };
  }, [keyMap, inputEnabled]);

  return (
    <div className="keyboard">
      {originalKeys.map((row, rowIndex) => (
        <div key={rowIndex} className={`key-row row-${rowIndex}`}>
          {row.map((key) => {
            const mappedKey = keyMap[key] || key;
            const isCurrentKey = currentKey.includes(mappedKey);

            return (
              <div
                key={key}
                className={`key-block ${isCurrentKey ? "active" : ""}`}
                data-original={key}
                data-mapped={mappedKey}
              >
                <span
                  className={`key-label ${
                    showEntireMappedKeys || isCurrentKey ? "visible" : ""
                  }`}
                >
                  {mappedKey}
                </span>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
