import "../../styles/footer.css";

export default function Keyboard({ keyMap, resultValue }) {
  const originalKeys = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"],
  ];

  const mappedKeys = originalKeys.map(row =>
    row.map(key => keyMap[key] || key)
  );

  const inputSet = new Set(
    (resultValue || []).map(v => v?.toUpperCase())
  );

  return (
    <div className="keyboard">
      {mappedKeys.map((row, rowIndex) => (
        <div key={rowIndex} className={`key-row row-${rowIndex}`}>
          {row.map((mappedKey, colIndex) => {
            const originalKey = originalKeys[rowIndex][colIndex];
            return (
              <div 
                key={originalKey} 
                className="key-block" 
                data-original={originalKey}
                data-mapped={mappedKey}
              >
                {mappedKey}
                
                {inputSet.has(mappedKey) && (
                  <div className="input-highlight" />
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
