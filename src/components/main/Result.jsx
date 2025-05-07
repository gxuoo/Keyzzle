import { useEffect } from "react";

const Result = ({ resultValue, playTime, setGameState }) => {
  const answer = "GREEDY";

  const resultBlocks = Array.from({ length: 6 }, (_, i) => {
    let bgColor, textColor;
    if (answer[i] === resultValue[i]) {
      bgColor = "#6AAA64";
      textColor = "white";
    } else if (answer.includes(resultValue[i])) {
      bgColor = "#C9B458";
      textColor = "white";
    } else {
      bgColor = "white";
      textColor = "black";
    }
    return {
      id: `result-block-${i}`,
      bgColor,
      textColor,
    };
  });

  const isAllCorrect = answer.length === resultValue.length && answer.split('').every((ch, i) => ch === resultValue[i]);

  useEffect(() => {
    if (isAllCorrect) {
      setGameEnd(true);
      const currentId = localStorage.getItem('currentStudentId');
      if (!currentId) return;

      const savedData = localStorage.getItem('studentIds');
      let students = [];
      try {
        students = savedData ? JSON.parse(savedData) : [];
      } catch {
        students = [];
      }

      const studentIndex = students.findIndex(s => s.id === currentId);
      if (studentIndex !== -1) {
        const updatedStudents = [...students];
        updatedStudents[studentIndex] = {
          ...updatedStudents[studentIndex],
          completionTime: playTime
        };
        localStorage.setItem('studentIds', JSON.stringify(updatedStudents));
      }
      setGameState('result');
    }
  }, [isAllCorrect, playTime, setGameState]);

  return (
    <div className="result-row">
      {resultBlocks.map((block, i) => (
        <div
          key={block.id}
          className="result-board-block"
          data-index={`0${i}`}
          style={{ backgroundColor: block.bgColor, color: block.textColor }}
        >
          {resultValue[i]}
        </div>
      ))}
    </div>
  );
}

export default Result;
