export default function Result({ userInputValue }) {
  return (
    // <div className="result">
    //     {userInputValue}
    // </div>
    <div className="result-row">
      <div className="result-board-block" data-index="00"></div>
      <div className="result-board-block" data-index="01"></div>
      <div className="result-board-block" data-index="02"></div>
      <div className="result-board-block" data-index="03"></div>
      <div className="result-board-block" data-index="04"></div>
      <div className="result-board-block" data-index="05"></div>
    </div>
  );
}
