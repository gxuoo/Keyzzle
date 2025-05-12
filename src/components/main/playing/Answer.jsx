import { useEffect } from "react";
import "../../../styles/main/playing/Answer.css";

const answer = "GREEDY";

export default function Answer({ userInputValue, setGameState, playTime }) {
    useEffect(() => {
        if (userInputValue.length === 6) {
            const userAnswer = userInputValue.join("");
            if (userAnswer === answer) {
                const currentStudentId = localStorage.getItem('currentStudentId');
                const savedPlayerRecords = localStorage.getItem('playerRecords');
                const playerRecords = JSON.parse(savedPlayerRecords);

                const updatedPlayerRecords = playerRecords.map(record => {
                    if (record.studentId === currentStudentId) {
                        return {
                            ...record,
                            clearTime: playTime
                        };
                    }
                    return record;
                });

                localStorage.setItem('playerRecords', JSON.stringify(updatedPlayerRecords));
                setGameState("result");
            }
            else {
                // 틀린 답을 입력했을 때 애니메이션 적용
                const letters = document.querySelectorAll('.answer-letter');
                letters.forEach(letter => {
                    letter.classList.add('wrong');
                    // 애니메이션이 끝나면 클래스 제거
                    setTimeout(() => {
                        letter.classList.remove('wrong');
                    }, 500);
                });
            }
        }
    }, [userInputValue, setGameState, playTime]);

    return (
        <div className="answer-container">
            <div className="answer-row">
                {answer.split('').map((letter, index) => {
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
        </div>
    );
}