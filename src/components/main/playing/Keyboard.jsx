import { useState, useEffect, useRef } from "react";
import "../../../styles/main/playing/Keyboard.css";

export default function Keyboard({ keyMap, onKeyPressWithPosition }) {
  const originalKeys = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"],
  ];
  const [showEntireMappedKeys, setShowEntireMappedKeys] = useState(true);
  const [currentKey, setCurrentKey] = useState([]);
  const holdKeys = useRef(new Set());
  const keyRefs = useRef({});
  const keyMapRef = useRef(keyMap);

  useEffect(() => {
    keyMapRef.current = keyMap;
  }, [keyMap]);

  useEffect(() => {
    setTimeout(() => {
      setShowEntireMappedKeys(false);
    }, 1500);
  }, []);

  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.repeat) return; // 키보드 이벤트 중복됨을 방지합니다. (성능 저하 방지용)

      const key = e.key.toUpperCase();
      if (!/^[a-zA-Z]$/.test(key)) return;

      const mappedKey = keyMapRef.current[key] || key;

      // 아래는 같은 키보드 입력이 반복될 때 깜박이는 현상 방지용입니다. (중복 입력 방지지)
      if (!holdKeys.current.has(mappedKey)) {
        holdKeys.current.add(mappedKey);
        setCurrentKey((prev) => [...prev, mappedKey]);
        
        const rect = keyRefs.current[mappedKey]?.getBoundingClientRect();
        if (rect && onKeyPressWithPosition) {
          onKeyPressWithPosition(mappedKey, {
            x: rect.left + rect.width / 4,
            y: rect.top + rect.height / 4,
          });
        }
      }
    };
    
    // 타이머를 키에서 손을 떼었을 때를 기준으로 시작합니다.
    const handleKeyup = (e) => {
      const key = e.key.toUpperCase();
      if (!/^[a-zA-Z]$/.test(key)) return;

      const mappedKey = keyMapRef.current[key] || key;

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
  }, []);

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
                ref={el => (keyRefs.current[mappedKey] = el)}
              >
                {showEntireMappedKeys || isCurrentKey
                  ? mappedKey
                  : ""}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
