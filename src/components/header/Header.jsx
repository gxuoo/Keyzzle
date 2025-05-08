import "../../styles/header.css";

export default function Header() {
    return (
        <header className="header-container">
            <div className="header-greedy">
                We are Greedy
            </div>
            <div className="header-title">
                <h1>KEYZZLE</h1>
            </div>
            <div className="header-developer">
                제작자: 신지우, 임규영, 정창우
            </div>
        </header>
    )
}