interface TextBoxProperties {
    setCurrentText: React.Dispatch<React.SetStateAction<string>>,
    currentText: string,
    placeHolder?: string,
    maxLength?: number
}

function TextBox({setCurrentText, currentText, placeHolder, maxLength}: TextBoxProperties) {
    return <>
        <input type="text"
               placeholder={placeHolder}
               maxLength={maxLength}
               value={currentText}
               onChange={(e) => setCurrentText(e.target.value)}
        />
    </>
}

export default TextBox