export default function Result({ keyMap, resultValue }) {
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
