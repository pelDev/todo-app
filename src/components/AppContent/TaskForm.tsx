import { useMemo } from "react";
import { CloseIcon } from "../../assets/svg";
import { TaskFormMode } from "../../constants";
import CustomIconButton from "../IconButton";

interface Props {
    close: VoidFunction;
    taskFormMode: TaskFormMode;
}

export default function TaskForm(props: Props) {
    const titleHeader = useMemo(() => {
        switch (props.taskFormMode) {
            case TaskFormMode.ADD:
                return "Add Task";

            case TaskFormMode.EDIT:
                return "Edit Task";
        }
    }, [props.taskFormMode]);

    return (
        <form className="task-form">
            <div className="task-form__header d-flex flex-row justify-content-between align-items-center">
                <h3>{titleHeader}</h3>

                <CustomIconButton onClick={props.close}>
                    <CloseIcon />
                </CustomIconButton>
            </div>
        </form>
    )
}