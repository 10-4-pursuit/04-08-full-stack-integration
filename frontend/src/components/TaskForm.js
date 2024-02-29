import { useState} from "react";
import {v4 as uuidv4} from 'uuid';


const TaskForm = ({ onAddTask}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('todo');


    const handleSubmit = async (e) => {
        e.preventDefault();
        const newTask = {
            // Generate ID immediately but may override if editing
            id: uuidv4(),   
            title,
            description,
            status
        }

        try{
            const response = await fetch('http://localhost:8080/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newTask)
            });
            const data = await response.json();
            if(response.ok){
                alert('Task created successfully');
                onAddTask(data);
                setTitle('');
                setDescription('');
                setStatus('todo');

            } else {
                alert('Failed to create task');
            }
        } catch(err){
            console.log(err);
        }
    };
 

    return (


        <div className="card">
            <div className="card-header">
                Add Task
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Title</label>
                        <input
                            type="text"
                            className="form-control"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            className="form-control"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />  
                    </div>
                    <div className="form-group">
                        <label>Status</label>
                        <select
                            className="form-control"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="todo">To Do</option>
                            <option value="inprogress">In Progress</option>
                            <option value="done">Done</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </div>
        </div>
 

    )



}
export default TaskForm
