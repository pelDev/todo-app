import { useMemo } from "react";
import { CloseIcon } from "../../assets/svg";
import { TaskFormMode } from "../../constants";
import CustomIconButton from "../IconButton";
import { TextArea, DateInput, TimeInput } from "../CustomInputs";
import ReminderTile from "./RemiderTile";
import CustomButton from "../Button";

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

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
    }

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <div className="task-form__header d-flex flex-row justify-content-between align-items-center mb-2">
                <h3>{titleHeader}</h3>

                <CustomIconButton onClick={props.close}>
                    <CloseIcon />
                </CustomIconButton>
            </div>
    
            <TextArea 
                autoFocus
            />

            <div className="mt-4 d-flex flex-row justify-content-start align-items-start date-time-inputs">
                <DateInput />

                <TimeInput />

                <TimeInput />
            </div>

            <div className="reminder-container mt-4">
                <ReminderTile />
            </div>

            <div className="actions d-flex flex-row flex-wrap mt-5">
                <CustomButton
                    title="Cancel"
                    type="button"
                    variant="secondary"
                    onClick={props.close}
                />

                <CustomButton
                    title="Add"
                />
            </div>
        </form>
    )
}