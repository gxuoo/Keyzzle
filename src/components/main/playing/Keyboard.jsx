import { useState, useEffect } from "react";
import "../../../styles/main/playing/Keyboard.css";

function Keyboard({ keyMap }) {
  const originalKeys = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"],
  ];

  const [showEntireMappedKeys, setShowEntireMappedKeys] = useState(false);
  const [currentKey, setCurrentKey] = useState([]);
  const [inputEnabled, setInputEnabled] = useState(false);

  useEffect(() => {
    setInputEnabled(false);
    const showTimer = setTimeout(() => {
      setShowEntireMappedKeys(true);
    }, 200);

    const hideTimer = setTimeout(() => {
      setShowEntireMappedKeys(false);
      setInputEnabled(true);
    }, 1600);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  useEffect(() => {
    const handleKeydown = (e) => {
      if (!inputEnabled) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      const key = e.key.toUpperCase();
      if (!/^[a-zA-Z]$/.test(key)) return;

      const mappedKey = keyMap[key] || key;
      setCurrentKey((prev) => [...prev, mappedKey]);
    };

    const handleKeyup = (e) => {
      if (!inputEnabled) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      const key = e.key.toUpperCase();
      if (!/^[a-zA-Z]$/.test(key)) return;

      const mappedKey = keyMap[key] || key;
      setTimeout(() => {
        setCurrentKey((prev) => prev.filter((k) => k !== mappedKey));
      }, 500);
    };

    window.addEventListener("keydown", handleKeydown, { capture: true });
    window.addEventListener("keyup", handleKeyup, { capture: true });

    return () => {
      window.removeEventListener("keydown", handleKeydown, { capture: true });
      window.removeEventListener("keyup", handleKeyup, { capture: true });
    };
  }, [keyMap, inputEnabled]);

  return (
    <div className="keyboard" onKeyDown={(e) => !inputEnabled && e.preventDefault()}>
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
                  className={`key-label ${showEntireMappedKeys || isCurrentKey ? "visible" : ""}`}
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

export default Keyboard;