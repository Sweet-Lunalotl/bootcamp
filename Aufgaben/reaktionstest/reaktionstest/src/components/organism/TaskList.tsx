import TextBox from "../atoms/TextBox.tsx";
import {useState} from "react";
import MyButton from "../atoms/MyButton.tsx";

function SubmitTask({maxLength = 100}){
    const [text, setText] = useState("")
    const [list, setList] = useState(["Haie streicheln", "Möhren klauen", "Tauben fangen", "Gecko anbeten"]);
    const [count, setCount] = useState(0)

    function AddButtonClicked(){
        if (text != ""){
            list.push(text)
        }
        setText("")
    }

    function ToDoClicked(){
        setCount(count + 1)
        if(count > 0){
            console.log("streichen")
        }
        else if(count > 1){
            console.log("löschen")
        }
    }



    return (
        <>
            <div className="listarea">
            {list.map(item => {
                return <li onClick={ToDoClicked} key={item}>{item}</li>
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

/*
Idee: Liste als Link mit Attribut times clicked
times clicked 0: normal
1: durchgestriche
2: löschen
 */