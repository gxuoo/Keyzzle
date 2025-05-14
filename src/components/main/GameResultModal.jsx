import { useEffect, useMemo, useState } from "react";
import "../../styles/main/result.css";
import axios from "axios";

function GameResultModal({ setGameState, onRestart }) {
    const [ranking, setRanking] = useState([]);
    const [username, setUserName] = useState("");
    const currentPlayer = useMemo(() => {
      if (ranking.length > 0 && username) {
        return ranking.find((rank) => rank.nickname === username);
      }
      return null;
    }, [ranking, username]);
    const [failed, setFailed] = useState(false);
    const clearTime = localStorage.getItem('clearTime');

    useEffect(() => {
        if (clearTime === 120) {
            setFailed(true);
            return; // api 미호출
        }

        const fetchResult = async () => {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/leader-board/keyzzle`);
            setRanking(response.data.rankings);
        }

        fetchResult();
    }, []);

    useEffect(() => {
        const getUserName = async () => {
            const currentId = localStorage.getItem('currentStudentId');
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/users/${currentId}`, {
                headers: {
                    Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
                }
            });
            setUserName(response.data.nickname);
        }
        
        getUserName();
    }, []);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        if (minutes === 0) {
            return `${remainingSeconds}초`;
        }
        return `${minutes}분 ${remainingSeconds.toString().padStart(2, '0')}초`;
    };

    useEffect(() => {
        const handleKeyDown = (e) => {

            if (e.key === "Enter") {
                e.preventDefault();
                handleRestart();
                return;
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const handleRestart = () => {
        setGameState('intro');
        onRestart();
    };

    return (
        <div className="game-result-modal-container">
            <h1 className="game-result-modal-title">게임 결과</h1>
            <div className="my-result-container">
                <h2>나의 게임 결과</h2>
                <table className="my-result-table">
                    <thead>
                        <tr>
                            <th>순위</th>
                            <th>닉네임</th>
                            <th>클리어 시간</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{(!failed || !currentPlayer) ? "등외" : `${currentPlayer.rank}위`}</td>
                            <td>{username}</td>
                            <td>{!failed ? "실패" : formatTime(clearTime)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="ranking-container">
                <h2>최종 순위</h2>
                {ranking.length > 0 ? (
                    <table className="ranking-table">
                        <thead>
                            <tr>
                                <th>순위</th>
                                <th>닉네임</th>
                                <th>클리어 시간</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ranking.map((student) => (
                                <tr key={student.studentId}>
                                        <td>{student.rank}위</td>
                                        <td>{student.nickname}</td>
                                        <td>{formatTime(student.score)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="highlight-yellow">아직 완료한 플레이어가 없습니다.</p>
                )}
            </div>
            <button className="game-result-modal-button" onClick={handleRestart}>
                <span>게임 다시 시작하기</span>
            </button>
        </div>
    )
}

export default GameResultModal;