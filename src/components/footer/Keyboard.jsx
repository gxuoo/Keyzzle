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
    // <div className="keyboard">
    //   <div className="key-row row-0">
    //     <div className="key-block" data-key="Q">
    //       Q
    //     </div>
    //     <div className="key-block" data-key="W">
    //       W
    //     </div>
    //     <div className="key-block" data-key="E">
    //       E
    //     </div>
    //     <div className="key-block" data-key="R">
    //       R
    //     </div>
    //     <div className="key-block" data-key="T">
    //       T
    //     </div>
    //     <div className="key-block" data-key="Y">
    //       Y
    //     </div>
    //     <div className="key-block" data-key="U">
    //       U
    //     </div>
    //     <div className="key-block" data-key="I">
    //       I
    //     </div>
    //     <div className="key-block" data-key="O">
    //       O
    //     </div>
    //     <div className="key-block" data-key="P">
    //       P
    //     </div>
    //   </div>
    //   <div className="key-row row-1">
    //     <div className="key-block" data-key="A">
    //       A
    //     </div>
    //     <div className="key-block" data-key="S">
    //       S
    //     </div>
    //     <div className="key-block" data-key="D">
    //       D
    //     </div>
    //     <div className="key-block" data-key="F">
    //       F
    //     </div>
    //     <div className="key-block" data-key="G">
    //       G
    //     </div>
    //     <div className="key-block" data-key="H">
    //       H
    //     </div>
    //     <div className="key-block" data-key="J">
    //       J
    //     </div>
    //     <div className="key-block" data-key="K">
    //       K
    //     </div>
    //     <div className="key-block" data-key="L">
    //       L
    //     </div>
    //   </div>
    //   <div className="key-row row-2">
    //     <div className="key-block" data-key="Z">
    //       Z
    //     </div>
    //     <div className="key-block" data-key="X">
    //       X
    //     </div>
    //     <div className="key-block" data-key="C">
    //       C
    //     </div>
    //     <div className="key-block" data-key="V">
    //       V
    //     </div>
    //     <div className="key-block" data-key="B">
    //       B
    //     </div>
    //     <div className="key-block" data-key="N">
    //       N
    //     </div>
    //     <div className="key-block" data-key="M">
    //       M
    //     </div>
    //   </div>
    // </div>
  );
}
