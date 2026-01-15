import {useState} from 'react';
import TextBox from "../atoms/TextBox.tsx";


interface TestHelloMessageProps {
    placeholder?: string
    maxLength?: number
}

function TestHelloMessage({placeholder = "your name here", maxLength = 60}: TestHelloMessageProps) {
    const [text, setText] = useState("")

    return (
        <>
            <div>
            <div>
                <p>What's your name?</p>
                <TextBox setCurrentText={setText} placeHolder={placeholder} maxLength={maxLength}></TextBox>
            </div>
            <div>
                <h1>Hello {text}!</h1>
            </div>
            </div>
        </>
    )
}



export default TestHelloMessage
