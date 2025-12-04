import {useState} from 'react';


function TestTextBox() {
    const [name, setName] = useState("");

    return (
        <>
            <p>What's your name?</p>
            <input type="text" onChange={(e) => setName(e.target.value)} />
            <h1>Hello {name}!</h1>
        </>
    )
}

export default TestTextBox
