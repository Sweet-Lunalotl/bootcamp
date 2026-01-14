

interface TextBoxProperties {
    setCurrentText: React.Dispatch<React.SetStateAction<string>>,
    placeHolder?: string,
}

function TextBox({setCurrentText, placeHolder}: TextBoxProperties) {
    return <>
        <input type="text"
            placeholder={placeHolder}
            onChange={(e) => setCurrentText(e.target.value)}
        />
    </>
}

export default TextBox