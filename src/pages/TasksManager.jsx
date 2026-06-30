import { createContext, useState } from 'react';

import TasksList from '@/components/TasksManager/TasksList';
import TasksMessageWindow from '@/components/TasksManager/TasksMessageWindow';
export const TasksMessageContext = createContext();

function TasksManager(){
    const [ tasksMessage, setTasksMessage ] = useState('');

    return (
        <TasksMessageContext.Provider value={{ tasksMessage, setTasksMessage }}>
            <TasksMessageWindow/>
            <TasksList/>
        </TasksMessageContext.Provider>
    )
}

export default TasksManager
