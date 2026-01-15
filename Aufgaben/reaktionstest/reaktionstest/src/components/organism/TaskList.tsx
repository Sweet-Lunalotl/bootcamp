import TextBox from "../atoms/TextBox.tsx";
import {useState} from "react";
import MyButton from "../atoms/MyButton.tsx";

function SubmitTask({maxLength = 60}){
    const [text, setText] = useState("")

    function AddButtonClicked(){
        setText("")
    }

    return (
        <>
            <TextBox setCurrentText={setText} currentText={text} placeHolder="What you gonna do now?" maxLength={maxLength}></TextBox>
            <MyButton title="add" onClick={AddButtonClicked}></MyButton>
        </>
        )
}

function ListArea(){
    const [list, setList] = useState(["Haie streicheln", "Möhren klauen", "Tauben fangen"]);


    return(
        <>
            {list.map(item => {
                return <li key={item}>{item}</li>
            })}
        </>
    )
}

function TaskList(){
    return (
        <>
            <div>
                <h1>To-Do List</h1>
                <div className="listarea">
                    <ListArea></ListArea>
                </div>
                <h2>Add new To-Do</h2>
                <SubmitTask></SubmitTask>
            </div>
        </>
    );

}

export default TaskList