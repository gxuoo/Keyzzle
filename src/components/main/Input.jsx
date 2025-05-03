export default function Input( {setUserInputValue}) {
    const handleSubmit = (e) => {
        setUserInputValue(e.target.value);
    }
    
    return (
        <div className="input">
            <input type="text" onChange={handleSubmit}/>
        </div>
    )
}