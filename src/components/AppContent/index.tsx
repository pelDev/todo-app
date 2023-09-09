import { useEffect, useMemo } from "react";
import "./styles.scss";
import DatePicker from "./DatePicker";
import { TaskFormMode, TodoActionState } from "../../constants";
import { UseTodoActionController } from "../../hooks/useTodoActionController";
import { logger } from "../../utils";
import TaskForm from "./TaskForm";
import AutoAnimateHeight from "../AutoAnimateHeight";

interface Props {
    todoController: UseTodoActionController;
}

export default function AppContent(props: Props) {
    useEffect(() => logger("Render AppContent"), []);

    const { todoActionState, dateSelected, onDateChange, resetTodoActionState } = props.todoController;

    const todoActionComponent = useMemo(() => {
        switch (todoActionState) {
            case TodoActionState.DEFAULT:
                return <DatePicker value={dateSelected} onChange={onDateChange} />;

            case TodoActionState.ADD:
                return <TaskForm close={resetTodoActionState} taskFormMode={TaskFormMode.ADD} />;
        }
    }, [todoActionState, dateSelected, onDateChange, resetTodoActionState]);

    return (
        <div className="app-content container d-flex flex-row py-4">
            <div className="todo-content-container"></div>

            <AutoAnimateHeight className="todo-actions-container">
                {todoActionComponent}
            </AutoAnimateHeight>
        </div>
    );
}