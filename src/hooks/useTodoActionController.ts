import { useEffect, useState } from "react";
import { TodoActionState } from "../constants";
import { FormInput, Todo } from "../react-app-env";
import { useAppDispatch } from "./store";
import { addTodo } from "../redux-store/features/todoSlice";
import { convertDateToInputString, logger } from "../utils";

export const useTodoActionController = () => {
    const dispatch = useAppDispatch();

    const [selectedTodo, setSelectedTodo] = useState<Todo|null>(null);
    const [dateSelected, setDateSelected] = useState<string>(convertDateToInputString(new Date()));
    const [todoDateFilter, setTodoDateFilter] = useState(new Date());
    const [todoActionState, setTodoActionState] = useState<TodoActionState>(TodoActionState.DEFAULT);

    const openCreate = () => setTodoActionState(TodoActionState.ADD);
    const openView = (todo: Todo) => {
        logger("view todo", todo);
        setSelectedTodo(todo);
        setTodoActionState(TodoActionState.VIEW);
    }
    const clearSelectedTodo = () => setSelectedTodo(null);
    const resetTodoActionState = () => setTodoActionState(TodoActionState.DEFAULT);
    const onDateChange = (date: Date) => {
        setDateSelected(convertDateToInputString(date));
        setTodoDateFilter(date);
    }
    const onTodoDateFilterChange = setTodoDateFilter;

    const createTodo = (data: FormInput) => {
        dispatch(addTodo(data));
        setDateSelected(convertDateToInputString(new Date()));
        setTodoActionState(TodoActionState.DEFAULT);
        setSelectedTodo(null);
    }

    useEffect(() => {
        setSelectedTodo(null);
        setTodoActionState(TodoActionState.DEFAULT);
    }, [todoDateFilter]);

    return {selectedTodo, dateSelected, todoDateFilter, todoActionState, openCreate, onDateChange, resetTodoActionState, createTodo, onTodoDateFilterChange, openView, clearSelectedTodo};
}

export type UseTodoActionController = ReturnType<typeof useTodoActionController>;