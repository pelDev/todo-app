import { useMemo } from "react";
import { useAppSelector } from "../../../hooks/store";
import { selectTodos } from "../../../redux-store/features/todoSlice";
import "./styles.scss";
import TaskTile from "./TaskTile";

export default function TaskList() {
    const todos = useAppSelector(selectTodos);

    console.log("todos", todos);

    return (
        <div className="task-list mt-5">
            <h5>My Tasks</h5>

            <div className="task-container mt-4 d-flex flex-column">
                {
                    useMemo(() => todos.map((todo) => (
                        <TaskTile key={`task-tile-${todo.id}`} todo={todo} />
                    )), [todos])
                }
            </div>
        </div>
    );
}