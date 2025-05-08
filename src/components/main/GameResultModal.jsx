import { useEffect, useState } from "react";
import "../../styles/main/result.css";

function GameResultModal({ setGameState, onRestart }) {
    const [ranking, setRanking] = useState([]);
    const [myResult, setMyResult] = useState(null);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        if (minutes === 0) {
            return `${remainingSeconds}초`;
        }
        return `${minutes}분 ${remainingSeconds.toString().padStart(2, '0')}초`;
    };

    useEffect(() => {
        const savedData = localStorage.getItem('studentIds');
        let students = [];
        try {
            students = savedData ? JSON.parse(savedData) : [];
        } catch {
            students = [];
        }

        // completionTime이 있는 학생들만 필터링하고 시간순으로 정렬
        const sortedStudents = students
            // .filter(student => student.completionTime)
            .sort((a, b) => a.completionTime - b.completionTime)
            .slice(0, 5);

        setRanking(sortedStudents);

        // 현재 플레이어의 결과 찾기
        const currentId = localStorage.getItem('currentStudentId');
        if (currentId) {
            const currentStudent = students.find(student => student.id === currentId);
            // if (currentStudent && currentStudent.completionTime) {
            //     const rank = students
            //         .filter(student => student.completionTime)
            //         .sort((a, b) => a.completionTime - b.completionTime)
            //         .findIndex(student => student.id === currentId) + 1;
            //     setMyResult({
            //         rank,
            //         id: currentStudent.id,
            //         completionTime: currentStudent.completionTime
            //     });
            // }
            const rank = students
                .filter(student => student.completionTime)
                .sort((a, b) => a.completionTime - b.completionTime)
                .findIndex(student => student.id === currentId) + 1;
            setMyResult({
                rank,
                id: currentStudent.id,
                completionTime: currentStudent.completionTime
            });
        }
    }, []);

    const handleRestart = () => {
        setGameState('intro');
        onRestart();
    };

    return (
        <div className="game-result-modal-container">
            <h1 className="game-result-modal-title">게임 결과</h1>
            {myResult && (
                <div className="my-result-container">
                    <h2>나의 게임 결과</h2>
                    <table className="my-result-table">
                        <thead>
                            <tr>
                                <th>순위</th>
                                <th>학번</th>
                                <th>클리어 시간</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{myResult.rank}위</td>
                                <td>{myResult.id}</td>
                                <td>{formatTime(myResult.completionTime)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
            <div className="ranking-container">
                <h2>최종 순위</h2>
                {/* {ranking.length > 0 ? (
                        <table className="ranking-table">
                            <thead>
                                <tr>
                                    <th>순위</th>
                                    <th>학번</th>
                                    <th>클리어 시간</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ranking.map((student, index) => (
                                    <tr key={student.id}>
                                        <td>{index + 1}위</td>
                                        <td>{student.id}</td>
                                        <td>{formatTime(student.completionTime)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>아직 완료한 플레이어가 없습니다.</p>
                    )} */}
                <table className="ranking-table">
                    <thead>
                        <tr>
                            <th>순위</th>
                            <th>학번</th>
                            <th>클리어 시간</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ranking.map((student, index) => (
                            <tr key={student.id}>
                                <td>{index + 1}위</td>
                                <td>{student.id}</td>
                                <td>{formatTime(student.completionTime)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button className="game-result-modal-button" onClick={handleRestart}>
                <span>게임 다시 시작하기</span>
            </button>
        </div>
    )
}

export default GameResultModal;