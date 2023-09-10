import { useEffect, useMemo } from "react";
import { CloseIcon } from "../../assets/svg";
import { TaskFormMode } from "../../constants";
import CustomIconButton from "../IconButton";
import { TextArea, DateInput, TimeInput } from "../CustomInputs";
import ReminderTile from "./RemiderTile";
import CustomButton from "../Button";
import { useForm } from "../../hooks/useForm";
import { FormInput } from "../../react-app-env";
import { taskDate, taskEnd, taskStart, taskTitle } from "../../validators";

interface Props {
    dateSelected?: string;
    close: VoidFunction;
    taskFormMode: TaskFormMode;
    createTodo: (data: FormInput) => void;
}

const defaultTaskFormState: FormInput = {
    title: "",
    date: "",
    start: "",
    end: ""
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

    const taskForm = useForm<FormInput>({ 
        initialState: defaultTaskFormState,
        validators: { title: taskTitle, start: taskStart, end: taskEnd, date: taskDate }
    });

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        const error = taskForm.validate();
        
        console.log("[error]", error);
    }

    const handleChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = (e) => {
        taskForm.onChange(e.target.name as keyof FormInput, e.target.value);
    }

    useEffect(() => {
        if (props.dateSelected && props.taskFormMode === TaskFormMode.ADD) {
            taskForm.onChange('date', props.dateSelected);
        }
    }, [props.dateSelected, props.taskFormMode]);

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <div className="task-form__header d-flex flex-row justify-content-between align-items-center mb-2">
                <h3>{titleHeader}</h3>

                <CustomIconButton onClick={props.close}>
                    <CloseIcon />
                </CustomIconButton>
            </div>
    
            <TextArea<FormInput>
                inputName="title"
                autoFocus
                value={taskForm.title}
                onChange={handleChange}
            />

            <div className="mt-4 d-flex flex-row justify-content-start align-items-start date-time-inputs">
                <DateInput<FormInput>
                    onChange={handleChange}
                    value={taskForm.date}
                    inputName="date"
                />

                <TimeInput<FormInput> 
                    inputName="start"
                    value={taskForm.start}
                    onChange={handleChange}
                />

                <TimeInput<FormInput> 
                    inputName="end"
                    value={taskForm.end}
                    onChange={handleChange}
                />
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