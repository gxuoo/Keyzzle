import { useState, useEffect, useRef } from 'react';
import '../../styles/main/intro2.css';

const inputLines = Array.from({ length: 4 }, (_, i) => ({
    id: `input-block-${i}`,
}));

const GameIntroModal2 = ({ setGameState }) => {
    const [studentId, setStudentId] = useState('');
    const studentIdRef = useRef('');

    useEffect(() => {
        studentIdRef.current = studentId;
    }, [studentId]);

    useEffect(() => {
        const handleKeyDown = (e) => {

            if (e.key === "Enter") {
                e.preventDefault();
                handleStart();
                return;
            }
            if (e.key === "Backspace") {
                e.preventDefault();
                setStudentId(prev => prev.slice(0, -1));
            } else if (e.key.length === 1 && /^[a-zA-Z0-9]$/.test(e.key)) {
                setStudentId(prev => {
                    if (prev.length < 4) {
                        return prev + e.key.toUpperCase();
                    }
                    return prev;
                });
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const handleStart = () => {
        if (studentIdRef.current.length === 4) {
            const savedPlayerRecords = localStorage.getItem('playerRecords');
            let playerRecords = [];
            try {
                playerRecords = savedPlayerRecords ? JSON.parse(savedPlayerRecords) : [];
            } catch {
                playerRecords = [];
            }

            if (!playerRecords.some(record => record.studentId === studentIdRef.currentntId)) {
                playerRecords.push({
                    studentId: studentIdRef.current,
                    clearTime: null,
                    rank: null
                });
            }

            localStorage.setItem('playerRecords', JSON.stringify(playerRecords));
            localStorage.setItem('currentStudentId', studentIdRef.current);

            setGameState('playing');
        } else {
            alert('고유 번호를 4자리 입력해주세요!');
        }
    };

    return (
        <div className="game-intro-container">
            <div className="game-intro-operation">
                <h1>게임 추가 기능</h1>
                <p>1. 게임이 시작되면 <span className="highlight-yellow">1.5초</span> 뒤에 모든 랜덤 키보드가 출력됩니다.</p>
                <p>2. 키를 누르고 있는 동안 <span className="highlight-yellow">매핑된 랜덤 값</span>이 키보드에 출력됩니다.</p>
                <p>3. 정답 글자와 입력 글자의 값과 일치하면 정답 글자가 <span className="highlight-green">초록색</span>으로 표시, 위치만 다른 경우에는 <span className="highlight-yellow">노란색</span>으로 표시됩니다.</p>
                <img src="/example.png" alt="게임 예시 이미지" className="game-example-img" />
            </div>
            <div className="game-intro-input-container">
                <div className="game-intro-input-unique-id">
                    고유번호:
                </div>
                <div className="game-intro-input-row">
                    {inputLines.map((line, i) => (
                        <div
                            key={line.id}
                            className="game-intro-input-board-line"
                            data-index={`0${i}`}
                        >
                            {studentId[i] || ''}
                        </div>
                    ))}
                </div>
            </div>
            <button className="game-start-bt" onClick={handleStart}>
                GAME START
            </button>
        </div>
    );
};

export default GameIntroModal2;