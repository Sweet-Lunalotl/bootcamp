import TextBox from "../atoms/TextBox.tsx";
import {useState} from "react";
import MyButton from "../atoms/MyButton.tsx";

function SubmitTask({maxLength = 60}){
    const [text, setText] = useState("")
    const [list, setList] = useState(["Haie streicheln", "Möhren klauen", "Tauben fangen"]);

    function AddButtonClicked(){
        if (text != ""){
            list.push(text)
        }
        setText("")
    }

    return (
        <>
            <div className="listarea">
            {list.map(item => {
                return <li key={item}>{item}</li>
            })}
            </div>
            <h2>Add new To-Do</h2>
            <TextBox setCurrentText={setText} currentText={text} placeHolder="What you gonna do now?" maxLength={maxLength}></TextBox>
            <MyButton title="add" onClick={AddButtonClicked}></MyButton>
        </>
    )
}

function TaskList(){
    return (
        <>
            <div>
                <h1>To-Do List</h1>
                <SubmitTask></SubmitTask>
            </div>
        </>
    );

}

export default TaskList