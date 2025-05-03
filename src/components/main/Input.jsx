import { useEffect } from "react";

export default function Input({ userInputValue, setUserInputValue }) {
  useEffect(() => {
    const handleKeydown = (e) => {
      const key = e.key;
      if (!/^[a-zA-Z]$/.test(key)) return; // 알파벳만 허용
      if (userInputValue.length >= 6) return; // 6글자까지만
      setUserInputValue([...userInputValue, key.toUpperCase()]);
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [userInputValue, setUserInputValue]);

  return (
    <div className="input-row">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="input-board-block" data-index={`0${i}`}>
          {userInputValue[i]}
        </div>
      ))}
    </div>
  );
}
