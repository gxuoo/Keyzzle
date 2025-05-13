import { useEffect } from "react";
import "../../../styles/main/playing/Answer.css";
import axios from "axios";

const answer = "GREEDY";

export default function Answer({ userInputValue, setGameState, playTime, setIsCorrect }) {
    useEffect(() => {
        const postResult = async (data) => {
            try {
                const token = process.env.REACT_APP_TOKEN;
                const res = await fetch(
                    'https://0by7j8suf2.execute-api.ap-northeast-2.amazonaws.com/proxy/api/result',
                    {
                        method: 'POST',
                        mode: 'cors',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        },
                        body: data,
                    }
                );

                if (!res.ok) throw new Error(`HTTP ${res.status}`);

                console.log('점수 전송 성공');
            } catch (e) {
                console.error('전송 오류:', e);
            }
        };

        if (userInputValue.length === 6) {
            const userAnswer = userInputValue.join("");
            if (userAnswer === answer) {
                setIsCorrect(true);
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

                const data = {
                    gameName: "keyzzle",
                    userId: currentStudentId,
                    score: playTime,
                }

                localStorage.setItem('playerRecords', JSON.stringify(updatedPlayerRecords));
                postResult(JSON.stringify(data));

                setTimeout(() => {
                    setGameState("result");
                }, 1500);
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
    }, [userInputValue, setGameState, playTime, setIsCorrect]);

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