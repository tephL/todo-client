import { useContext, useState, useRef, useEffect } from "react"

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
    }, [updateTask]);

    async function handleSubmit(){
        console.log(updateTask);
        return;
        if(newTask.title == ''){
            titleInputRef.current.focus();
            return setUpdateTaskMessageBox('Title must be provided');
        };

        await taskServ.updateTask({ task_id, title, description, category, status })
        .then(async res => {
            console.log(res);
            if(!res.ok) throw new Error("Unable to update the task");
            return await res.json();
        })
        .then(data => {
            setTasks(ts => [...ts, data]);
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
    }

    function exitUpdateTask(){
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
                <p onClick={handleCategorySelection}>Brainrot</p>
                <p onClick={handleCategorySelection}>Sahur</p>
                <p onClick={handleCategorySelection}>W-maxxing</p>
            </div>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default UpdateTaskWindow
