interface MyButton{
    title: string,
    onClick: () => void
}

function MyButton({title, onClick}: MyButton){
    return (
        <button onClick={onClick}>{title}</button>
    )
}

export default MyButton;