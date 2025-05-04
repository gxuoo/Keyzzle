import { useEffect } from "react";

export default function Input({
  userInputValue,
  setUserInputValue,
  setResultValue,
}) {
  const inputBlocks = Array.from({ length: 6 }, (_, i) => ({
    id: `input-block-${i}`,
  }));

  useEffect(() => {
    const handleKeydown = (e) => {
      const key = e.key;
      if (!/^[a-zA-Z]$/.test(key)) return; // 알파벳만 허용
      if (userInputValue.length >= 6) return; //6글자까지만 허용
      setUserInputValue([...userInputValue, key.toUpperCase()]);
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [userInputValue, setUserInputValue]);

  useEffect(() => {
    if (userInputValue.length === 6) {
      setTimeout(() => {
        setResultValue(userInputValue);
        setUserInputValue([]);
      }, 300); //마지막 글자 잠깐 보여주기
    }
  }, [userInputValue, setResultValue, setUserInputValue]);

  return (
    <div className="input-row">
      {inputBlocks.map((block, i) => (
        <div key={block.id} className="input-board-block" data-index={`0${i}`}>
          {userInputValue[i]}
        </div>
      ))}
    </div>
  );
}
