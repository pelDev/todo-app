import { useState } from "react";
import { TodoActionState } from "../constants";

export const useTodoActionController = () => {
    const [dateSelected, setDateSelected] = useState<Date>(new Date());
    const [todoActionState, setTodoActionState] = useState<TodoActionState>(TodoActionState.DEFAULT);

    const openCreate = () => setTodoActionState(TodoActionState.ADD);
    const resetTodoActionState = () => setTodoActionState(TodoActionState.DEFAULT);
    const onDateChange = (date: Date) => setDateSelected(date);

    return {dateSelected, todoActionState, openCreate, onDateChange, resetTodoActionState};
}

export type UseTodoActionController = ReturnType<typeof useTodoActionController>;