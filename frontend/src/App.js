import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./pages/HomePage";
import TaskListPage from "./pages/TaskListPage";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);


 

  const onSave = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const onAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

 
  return (
    <Router>
      <div className="App">
        <nav>
          <Link className="link" to="/add">Add Task</Link>
          <Link className="link" to="/">Task List</Link>
        </nav>

        <Routes>
          <Route path="/" element={<TaskListPage taskList={tasks} />} />
          <Route path="/add" element={<HomePage  onSave={onSave} onAddTask={onAddTask} />} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;
