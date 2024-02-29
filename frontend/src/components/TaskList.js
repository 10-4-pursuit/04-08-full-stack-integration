import {useState, useEffect} from 'react';
import axios from 'axios';
import '../App.css';


const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/tasks')
          .then(response => {
            if (Array.isArray(response.data.tasks)) { 
              setTasks(response.data.tasks);
              console.log('Tasks fetched successfully', response.data.tasks);
            } else {
              console.error('Failed to fetch tasks: Data is not an array');
            }
          })
          .catch(err => {
            console.error('Failed to fetch tasks:', err);
            setTasks([]); // Fallback to an empty array in case of error
          });
      }, []);
      
    

    const deleteTask = (id) => {
        axios.delete(`http://localhost:8080/api/tasks/${id}`)
            .then(response => { 
                if(response.status === 200){
                    setTasks(tasks.filter((task) => task.id !== id));
                } else{
                    console.log('Failed to delete task');
                }
            })
            .catch(err => {
                console.log(err);
            });
    }   

  
      

    return (
        <div>
            <h1>Task List</h1>
         {tasks.map((task) => (
             <div key={task.id} className="card mb-3">
                <div className="card-body">
                    <h5 className="card-title">{task.title}</h5>
                    <p className="card-text">{task.description}</p>
                    <div className="mb-2">
                    <span
    key={task.id}
    className="badge"
    style={{
      backgroundColor: task.status === 'New' ? 'blue' :
                       task.status === 'In-Progress' ? 'orange' :
                       task.status === 'Completed' ? 'green'  : 'black', // Default color if status doesn't match
      color: 'white',
      padding: '5px 10px',
      borderRadius: '5px',
      fontSize: '0.8em',
    }}
  >
    {task.status}
  </span>


                    </div>
                    <div className="mt-3">
                        <button onClick={() => deleteTask(task.id)} className="btn btn-danger">Delete</button>
                    </div>

                </div>
               
             </div>
         ))}


        </div>
      
    );
    
}


export default TaskList
