import "../../../styles/main/playing/Submit.css";

export default function Submit({ setGameState }) {

    // 정답을 맞추면 결과 페이지로 이동 (아직 정답 맞추는 로직 없어서 임시로 버튼 누르면 결과 페이지로 이동)
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target.value);
        setGameState('result');
    }

    return (
        <div className="submit" onSubmit={handleSubmit}>
            {/* 버튼 클릭과 동시에 버튼이 사라지고, 정답을 입력할 수 있는 6글자 입력 언더바가 생성
                언더바에 정답을 하나씩 입력할 때마다, Answer.jsx에 있는 G R E E D Y의 문자가 하나씩 빛난다.
                정답을 모두 맞히면 버튼이 다시 생기고, 결과 페이지로 이동한다.
            */}
            <button type="submit">정답 제출!</button>
        </div>
    );
}