import { useContext, useState, useRef, useEffect } from "react"

import styles from '@/components/TasksManager/UpdateTaskWindow.module.css';

import { TasksMessageContext, TasksContext, UpdateTaskContext } from "@/pages/TasksManager"
import * as taskServ from '@/services/tasks-serv.js';

function UpdateTaskWindow(){
    const { setTasksMessage } = useContext(TasksMessageContext);
    const { updateTaskWindowVisibility, setUpdateTaskWindowVisibility } = useContext(TasksMessageContext);

    const { tasks, setTasks } = useContext(TasksContext);
    const titleInputRef = useRef();

    const [ updateTaskMessageBox, setUpdateTaskMessageBox ] = useState('');
    const { updateTask, setUpdateTask } = useContext(UpdateTaskContext);
    const storedTask = useRef();

    // assign upon mount
    useEffect(() => {
        storedTask.current = updateTask;
    }, [updateTaskWindowVisibility]);

    async function handleSubmit(){
        if(updateTask.title == storedTask.current.title && 
            updateTask.description == storedTask.current.description && 
            updateTask.category == storedTask.current.category && 
            updateTask.status == storedTask.current.status 
        ){
            exitUpdateTask();
            return setTasksMessage('No changes have been made');
        }

        if(updateTask.title == ''){
            titleInputRef.current.focus();
            return setUpdateTaskMessageBox('Title must be provided');
        };

        const { task_id, title, description, category, status } = updateTask;

        await taskServ.updateTask({ task_id, title, description, category, status })
        .then(async res => {
            console.log(res);
            if(!res.ok) throw new Error("Unable to update the task");
            return await res.json();
        })
        .then(data => {
            console.log(data);
            setUpdateTaskWindowVisibility(true);
            setUpdateTaskMessageBox('');
            setTasksMessage("Successfully updated task");
        })
        .catch(e => {
            console.log(e);
            setUpdateTaskWindowVisibility(true);
            setTasksMessage(e?.message);
        });

    }

    function handleCategorySelection(e){
        const chosen_category = `${e.currentTarget.innerHTML}`.toLowerCase();
        setUpdateTask((nt) => { return { ...nt, category: chosen_category }});
        console.log(updateTask);
    }

    function exitUpdateTask(){
        setUpdateTask(t => Object.fromEntries(
            Object.entries(t).map(([key, value]) => {
                return [key, ''];
            })
        ));
        setUpdateTaskWindowVisibility(true);
    }

    return (
        <div hidden={updateTaskWindowVisibility}>
            <button onClick={exitUpdateTask}>x</button>
            <p>{ updateTaskMessageBox }</p>
            <p>Update task</p>
            <button onClick={exitUpdateTask}>x</button>
            <input ref={titleInputRef} defaultValue={updateTask.title} onChange={e => setUpdateTask(nt => { return { ...nt, title: e.target.value } })} placeholder="Title" type="text" />
            <textarea defaultValue={updateTask.description} onChange={e => setUpdateTask(nt => { return { ...nt, description: e.target.value } })} cols="30" rows="10" placeholder="Description"></textarea>
            <div>
                <p className={updateTask.category == 'brainrot' ? styles['selected-category'] : ''} onClick={handleCategorySelection}>Brainrot</p>
                <p className={updateTask.category == 'sahur' ? styles['selected-category'] : ''} onClick={handleCategorySelection}>Sahur</p>
                <p className={updateTask.category == 'w-maxxing' ? styles['selected-category'] : ''} onClick={handleCategorySelection}>W-maxxing</p>
            </div>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default UpdateTaskWindow
