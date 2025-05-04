import "../../styles/footer.css";

export default function Keyboard() {
  const keys = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"],
  ];

  return (
    <div className="keyboard">
      {keys.map((row, rowIndex) => (
        <div key={rowIndex} className={`key-row row-${rowIndex}`}>
          {row.map((key) => (
            <div key={key} className="key-block" data-key={key}>
              {/* {key} */}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
