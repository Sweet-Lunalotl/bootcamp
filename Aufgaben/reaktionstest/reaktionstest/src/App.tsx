import './App.css'
import TestHelloMessage from "./components/molecules/TestHelloMessage.tsx";
import TikTakToe from "./components/organism/TikTakToe.tsx";
import TaskList from "./components/organism/TaskList.tsx";

function App() {


  return (
      <>
          <div className="nameTest">
            <TestHelloMessage></TestHelloMessage>
          </div>
          <div className="tikTak">
            <TikTakToe></TikTakToe>
          </div>
          <div className="taskList">
            <TaskList></TaskList>
          </div>
      </>
  )
}

export default App
