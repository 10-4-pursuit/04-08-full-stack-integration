import Header from "../components/Header";
import TaskForm from "../components/TaskForm";


const HomePage = ({ onAddTask, onSave }) => {
    return (
        <div>
            <Header/>
            <TaskForm onAddTask={onAddTask} onSave={onSave} />
        </div>
    );
};

export default HomePage;