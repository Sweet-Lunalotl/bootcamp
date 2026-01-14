import './App.css'
import TestHelloMessage from "./components/molecules/TestHelloMessage.tsx";
import Board from "./components/organism/TikTakToe.tsx";

function App() {


  return (
      <>
          <div className="nameTest">
          <TestHelloMessage></TestHelloMessage>
          </div>
          <div className="tikTak">
          <Board></Board>
          </div>
      </>
  )
}

export default App
