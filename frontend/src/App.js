
import 'bootstrap/dist/css/bootstrap.min.css';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { useState } from 'react';



import './App.css';



function App() {
  const [taskList, setTaskList] = useState([]);

  const onAddTask = (task) => {
    setTaskList([...taskList, task]);
  }
 
  


  return (
    <div className="App">

      <TaskForm onAddTask={onAddTask} />
      <TaskList taskList={taskList} />

    

      </div>

  );
}

export default App;

