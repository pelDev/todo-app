import { useMemo } from "react";
import { useAppSelector } from "../../../hooks/store";
import { selectTodos } from "../../../redux-store/features/todoSlice";
import "./styles.scss";
import TaskTile from "./TaskTile";
import { isDateSame } from "../../../utils";

interface Props {
    todoDateFilter: Date;
}

export default function TaskList(props: Props) {
    const { todoDateFilter } = props;
    const todos = useAppSelector(selectTodos);

    const filtered = useMemo(() => {
        return todos.filter((todo) => isDateSame(todoDateFilter, new Date(todo.date)))
    }, [todos, todoDateFilter]);

    return (
        <div className="task-list mt-5">
            <h5>My Tasks</h5>

            <div className="task-container mt-4 d-flex flex-column">
                {
                    useMemo(() => filtered.map((todo) => (
                        <TaskTile key={`task-tile-${todo.id}`} todo={todo} />
                    )), [filtered])
                }
            </div>
        </div>
    );
}