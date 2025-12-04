import {useState} from 'react';

function AddItem() {
    const [item, setItem] = useState("");
    const [list, setlist] = useState<string []>([]);

    const listItems: string[] = []

    function pushItem(){

        setlist(listItems)
    }

    return(
        <>
            <p>add new item</p>
            <input type="text" onChange={(e) => setItem(e.target.value)}/>
            <button onClick={pushItem()}>submit</button>
        </>

    )

}

export default AddItem