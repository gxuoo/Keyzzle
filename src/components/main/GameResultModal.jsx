import { useEffect, useState } from "react";
import "../../styles/main/result.css";

// 공동 순위 계산 함수
function getRankedList(players) {
    let rank = 1;
    let prevTime = null;
    let sameRankCount = 0;

    return players.map((player, idx) => {
        if (player.clearTime === prevTime) {
            sameRankCount++;
        } else {
            rank = idx + 1;
            sameRankCount = 1;
        }
        prevTime = player.clearTime;
        return { ...player, rank };
    });
}

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
        const savedData = localStorage.getItem('playerRecords');
        let playerRecords = [];
        try {
            playerRecords = savedData ? JSON.parse(savedData) : [];
        } catch {
            playerRecords = [];
        }

        // completionTime이 있는 학생들만 필터링하고 시간순으로 정렬
        const sortedPlayers = playerRecords
            .filter(player => player.clearTime)
            .sort((a, b) => a.clearTime - b.clearTime)
            .slice(0, 5);

        const rankedPlayers = getRankedList(sortedPlayers);
        setRanking(rankedPlayers);

        // 현재 플레이어의 결과 찾기
        const currentId = localStorage.getItem('currentStudentId');
        if (currentId) {
            const currentPlayer = playerRecords.find(player => player.studentId === currentId);
            if (currentPlayer && currentPlayer.clearTime) {
                const rank = playerRecords
                    .filter(player => player.clearTime)
                    .sort((a, b) => a.clearTime - b.clearTime)
                    .findIndex(player => player.studentId === currentId) + 1;
                setMyResult({
                    rank,
                    studentId: currentPlayer.studentId,
                    clearTime: currentPlayer.clearTime
                });
            }
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
                                <td>{myResult.studentId}</td>
                                <td>{formatTime(myResult.clearTime)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
            <div className="ranking-container">
                <h2>최종 순위</h2>
                {ranking.length > 0 ? (
                    <table className="ranking-table">
                        <thead>
                            <tr>
                                <th>순위</th>
                                <th>학번</th>
                                <th>클리어 시간</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ranking.map((student) => (
                                <tr key={student.studentId}>
                                    <td>{student.rank}위</td>
                                    <td>{student.studentId}</td>
                                    <td>{formatTime(student.clearTime)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>아직 완료한 플레이어가 없습니다.</p>
                )}
            </div>
            <button className="game-result-modal-button" onClick={handleRestart}>
                <span>게임 다시 시작하기</span>
            </button>
        </div>
    )
}

export default GameResultModal;