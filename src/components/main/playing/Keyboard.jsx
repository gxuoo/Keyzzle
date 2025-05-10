import { useState, useEffect } from "react";
import "../../../styles/main/playing/Keyboard.css";

export default function Keyboard({ keyMap }) {
  const originalKeys = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"],
  ];
  const [showEntireMappedKeys, setShowEntireMappedKeys] = useState(true);
  const [currentKey, setCurrentKey] = useState(null);
  const [showCurrentKey, setShowCurrentKey] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowEntireMappedKeys(false);
    }, 1500);
  }, []);

  useEffect(() => {
    const handleKeydown = (e) => {
      const key = e.key.toUpperCase();
      if (!/^[a-zA-Z]$/.test(key)) return;

      const mappedKey = keyMap[key] || key;
      setCurrentKey(mappedKey);
      setShowCurrentKey(true);

      setTimeout(() => {
        setShowCurrentKey(false);
        setCurrentKey(null);
      }, 500);
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [keyMap]);

  return (
    <div className="keyboard">
      {originalKeys.map((row, rowIndex) => (
        <div key={rowIndex} className={`key-row row-${rowIndex}`}>
          {row.map((key) => {
            const mappedKey = keyMap[key] || key;
            const isCurrentKey = currentKey === mappedKey;

            return (
              <div
                key={key}
                className="key-block"
                data-original={key}
                data-mapped={mappedKey}
                style={{
                  backgroundColor: "#FCFCFC",
                  boxSizing: "border-box",
                  color: "#017355",
                  fontSize: "50px",
                }}
              >
                {showEntireMappedKeys || (showCurrentKey && isCurrentKey)
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
