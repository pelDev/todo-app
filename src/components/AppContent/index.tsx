import { useEffect, useMemo, useState } from "react";
import "./styles.scss";
import DatePicker from "./DatePicker";
import { TodoActionState } from "../../constants";
import { UseTodoActionController } from "../../hooks/useTodoActionController";
import { logger } from "../../utils";

interface Props {
    todoController: UseTodoActionController;
}

export default function AppContent(props: Props) {
    useEffect(() => logger("Render AppContent"), []);

    const { todoActionState, dateSelected, onDateChange } = props.todoController;

    const todoActionComponent = useMemo(() => {
        switch (todoActionState) {
            case TodoActionState.DEFAULT:
                return <DatePicker value={dateSelected} onChange={onDateChange} />
        }
    }, [todoActionState, dateSelected, onDateChange]);

    return (
        <div className="app-content container d-flex flex-row py-4">
            <div className="todo-content-container"></div>

            <div className="todo-actions-container">
                {todoActionComponent}
            </div>
        </div>
    );
}