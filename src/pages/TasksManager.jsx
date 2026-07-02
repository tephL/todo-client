import { createContext, useState } from 'react';

import TasksList from '@/components/TasksManager/TasksList';
import TasksMessageWindow from '@/components/TasksManager/TasksMessageWindow';
import NewTaskWindow from '@/components/TasksManager/NewTaskWindow';
export const TasksMessageContext = createContext();
export const TasksContext = createContext();

function TasksManager(){
    const [ tasksMessage, setTasksMessage ] = useState('');
    const [ newTaskWindowVisibility, setNewTaskWindowVisibility ] = useState(true);
    const [ tasks, setTasks ] = useState([]);

    return (
        <TasksContext.Provider value={{ tasks, setTasks }}>
        <TasksMessageContext.Provider value={{ tasksMessage, setTasksMessage, newTaskWindowVisibility, setNewTaskWindowVisibility }}>
            <TasksMessageWindow/>
            <NewTaskWindow/>
            <TasksList/>
        </TasksMessageContext.Provider>
        </TasksContext.Provider> 
    )
}

export default TasksManager
