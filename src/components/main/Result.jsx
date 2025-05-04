export default function Result({ resultValue }) {
  const resultBlocks = Array.from({ length: 6 }, (_, i) => ({
    id: `result-block-${i}`,
  }));
  return (
    <div className="result-row">
      {resultBlocks.map((block, i) => (
        <div key={block.id} className="result-board-block" data-index={`0${i}`}>
          {resultValue[i]}
        </div>
      ))}
    </div>
  );
}
