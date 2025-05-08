import "../../../styles/main/Submit.css";

export default function Submit({ setGameState }) {
    // 정답을 맞추면 결과 페이지로 이동
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target.value);
        setGameState('result');
    }

    return (
        <div className="submit" onSubmit={handleSubmit}>
            <button type="submit">정답 제출!</button>
        </div>
    );
}