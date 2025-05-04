import "../../styles/main.css";
import Timer from "./Timer.jsx";
import Input from "./Input.jsx";
import Result from "./Result.jsx";
import { useState } from "react";

export default function Main() {
  // const [userInputValue, setUserInputValue] = useState([]);
  const [resultValue, setResultValue] = useState([]);
  console.log(resultValue);
  return (
    <main className="main">
      <Timer />
      <Input setResultValue={setResultValue} />
      <Result resultValue={resultValue} />
    </main>
  );
}
