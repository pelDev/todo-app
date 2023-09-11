import { useEffect, useMemo } from "react";
import "./styles.scss";
import DatePicker from "./DatePicker";
import { TaskFormMode, TodoActionState } from "../../constants";
import { UseTodoActionController } from "../../hooks/useTodoActionController";
import { logger } from "../../utils";
import TaskForm from "./TaskForm";
import AutoAnimateHeight from "../AutoAnimateHeight";
import HorizontalCalendar from "../HorizontalCalendar";
import TaskList from "./TaskList";
import ViewTask from "./ViewTask";

interface Props {
    todoController: UseTodoActionController;
}

export default function AppContent(props: Props) {
    useEffect(() => logger("Render AppContent"), []);

    const { selectedTodo, todoDateFilter, todoActionState, dateSelected, onDateChange, resetTodoActionState, createTodo, onTodoDateFilterChange, openView, clearSelectedTodo } = props.todoController;

    const todoActionComponent = useMemo(() => {
        switch (todoActionState) {
            case TodoActionState.DEFAULT:
                return <DatePicker value={new Date(dateSelected)} onChange={onDateChange} />;

            case TodoActionState.ADD:
                return <TaskForm close={resetTodoActionState} taskFormMode={TaskFormMode.ADD} dateSelected={dateSelected} createTodo={createTodo} />;

            case TodoActionState.VIEW:
                return selectedTodo && <ViewTask todo={selectedTodo} close={() => {
                    resetTodoActionState();
                    clearSelectedTodo();
                }} />;
        }
    }, [todoActionState, dateSelected, onDateChange, resetTodoActionState, createTodo, selectedTodo]);

    return (
        <div className="app-content container d-flex flex-row py-4">
            <AutoAnimateHeight className="todo-content-container">
                <HorizontalCalendar dateSelected={dateSelected} todoDateFilter={todoDateFilter} onTodoDateFilterChange={onTodoDateFilterChange} />

                <TaskList todoDateFilter={todoDateFilter} selectTodo={openView} selectedTodo={selectedTodo} />
            </AutoAnimateHeight>

            <AutoAnimateHeight className="todo-actions-container">
                {todoActionComponent}
            </AutoAnimateHeight>
        </div>
    );
}