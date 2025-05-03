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
    <>
      <div className="input-row">
        <div className="input-board-block" data-index="00">
          {userInputValue[0]}
        </div>
        <div className="input-board-block" data-index="01">
          {userInputValue[1]}
        </div>
        <div className="input-board-block" data-index="02">
          {userInputValue[2]}
        </div>
        <div className="input-board-block" data-index="03">
          {userInputValue[3]}
        </div>
        <div className="input-board-block" data-index="04">
          {userInputValue[4]}
        </div>
        <div className="input-board-block" data-index="05">
          {userInputValue[5]}
        </div>
      </div>
    </>
  );
}
