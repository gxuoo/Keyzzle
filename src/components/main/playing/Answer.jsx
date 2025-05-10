import { useEffect } from "react";
import "../../../styles/main/playing/Answer.css";

const answer = "GREEDY";

export default function Answer({ userInputValue, setGameState }) {
    useEffect(() => {
        if (userInputValue.length === 6) {
            const userAnswer = userInputValue.join("");
            if (userAnswer === answer) {
                setGameState("result");
            }
        }
    }, [userInputValue, setGameState]);

    return (
        <div className="answer-container">
            {answer.split("").map((letter, index) => {
                // 정확한 위치와 값이 맞는 경우 => (strike)
                const isStrike = userInputValue[index] === letter;

                // 해당 값이 정답에 포함되어 있고, 정확한 위치가 아닌 경우 => (ball)
                const isBall = userInputValue.includes(letter) && answer.includes(letter);

                return (
                    <div
                        key={index}
                        className={`answer-letter ${isStrike ? 'strike' : isBall ? 'ball' : ''}`}
                    >
                        {letter}
                    </div>
                );
            })}
        </div>
    );
}