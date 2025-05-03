export default function Input({ setUserInputValue }) {
  const handleSubmit = (e) => {
    setUserInputValue(e.target.value);
  };

  return (
    <>
      <div className="input-row">
        <div className="input-board-block" data-index="00"></div>
        <div className="input-board-block" data-index="01"></div>
        <div className="input-board-block" data-index="02"></div>
        <div className="input-board-block" data-index="03"></div>
        <div className="input-board-block" data-index="04"></div>
        <div className="input-board-block" data-index="05"></div>
      </div>

      {/* <div className="input-row">
        <input type="text" onChange={handleSubmit} />
      </div> */}
    </>
  );
}
