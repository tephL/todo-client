import { createContext, useState } from 'react';

import TasksList from '@/components/TasksManager/TasksList';
import TasksMessageWindow from '@/components/TasksManager/TasksMessageWindow';
import NewTaskWindow from '@/components/TasksManager/NewTaskWindow';
import UpdateTaskWindow from '@/components/TasksManager/UpdateTaskWindow';

export const TasksMessageContext = createContext();
export const TasksContext = createContext();
export const UpdateTaskContext = createContext();

function TasksManager(){
    const [ tasksMessage, setTasksMessage ] = useState('');
    const [ newTaskWindowVisibility, setNewTaskWindowVisibility ] = useState(true);
    const [ updateTaskWindowVisibility, setUpdateTaskWindowVisibility ] = useState(true);
    const [ tasks, setTasks ] = useState([]);
    const [ updateTask, setUpdateTask ] = useState({
        task_id: '', 
        title: '',
        description: '',
        category: '',
    });

    return (
        <UpdateTaskContext.Provider value={{ updateTask, setUpdateTask }}>
        <TasksContext.Provider value={{ tasks, setTasks }}>
        <TasksMessageContext.Provider value={{ tasksMessage, setTasksMessage, newTaskWindowVisibility, setNewTaskWindowVisibility, updateTaskWindowVisibility, setUpdateTaskWindowVisibility }}>
            <TasksMessageWindow/>
            <NewTaskWindow/>
            <UpdateTaskWindow/>
            <TasksList/>
        </TasksMessageContext.Provider>
        </TasksContext.Provider> 
        </UpdateTaskContext.Provider>
    )
}

export default TasksManager
