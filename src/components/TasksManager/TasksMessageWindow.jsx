import { TasksMessageContext } from "@/pages/TasksManager"
import { useContext } from "react"

function TasksMessageWindow(){
    const { tasksMessage, setTasksMessage } = useContext(TasksMessageContext);

    function discardMessage(){
        setTasksMessage('');
    }

    const button = tasksMessage == '' || tasksMessage == undefined?
        <button hidden onClick={discardMessage}>x</button> :
        <button onClick={discardMessage}>x</button> ;

    return (
        <div>
            { tasksMessage }
            { button }
        </div>
    )
}

export default TasksMessageWindow
