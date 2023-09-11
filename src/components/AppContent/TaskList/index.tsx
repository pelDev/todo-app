import { useEffect, useMemo, useState } from "react";
import { useAppSelector } from "../../../hooks/store";
import { selectTodos } from "../../../redux-store/features/todoSlice";
import "./styles.scss";
import TaskTile from "./TaskTile";
import { isDateSame } from "../../../utils";
import Pagination from "../../Pagination";
import { Todo } from "../../../react-app-env";

interface Props {
    todoDateFilter: Date;
    selectTodo: (todo: Todo) => void;
    selectedTodo: Todo | null;
}

const PAGE_SIZE = 7;

const sliceIntoChunks = (arr: any[], chunkSize: number) => {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        res.push(chunk);
    }
    return res;
}

export default function TaskList(props: Props) {
    const { todoDateFilter } = props;
    const todos = useAppSelector(selectTodos);

    const [currentPage, setCurrentPage] = useState(1);

    const onPageChange = (page: number) => {
        setCurrentPage(page);
    }

    const filtered = useMemo(() => {
        return todos.filter((todo) => isDateSame(todoDateFilter, new Date(todo.date)));
    }, [todos, todoDateFilter]);

    useEffect(() => setCurrentPage(1), [todoDateFilter]);

    return (
        <div className="task-list mt-5">
            <h5>My Tasks</h5>

            <div className="task-container mt-4 d-flex flex-column">
                {
                    useMemo(() => sliceIntoChunks(filtered, PAGE_SIZE)[currentPage - 1]?.map((todo) => (
                        <TaskTile key={`task-tile-${todo.id}`} todo={todo} selectTodo={props.selectTodo} selected={todo.id === props.selectedTodo?.id}/>
                    )), [filtered, currentPage, props.selectedTodo, props.selectTodo])
                }
            </div>

            <div className="pagination-container mt-5">
                <Pagination 
                    currentPage={currentPage}
                    onPageChange={onPageChange}
                    pageSize={PAGE_SIZE}
                    totalCount={filtered.length}
                />
            </div>
        </div>
    );
}