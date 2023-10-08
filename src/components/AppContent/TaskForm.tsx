import { useEffect, useMemo, useState } from "react";
import { CloseIcon } from "../../assets/svg";
import { RIPPLE_DELAY, TaskFormMode } from "../../constants";
import CustomIconButton from "../IconButton";
import { TextArea, DateInput, TimeInput } from "../CustomInputs";
import ReminderTile from "./RemiderTile";
import CustomButton from "../Button";
import { useForm } from "../../hooks/useForm";
import { FormInput, Todo } from "../../react-app-env";
import { taskDate, taskEnd, taskStart, taskTitle } from "../../validators";
import Alert from "../Alert";
import { logger } from "../../utils";

interface Props {
    dateSelected?: string;
    selectedTodo?: Todo | null;
    close: VoidFunction;
    taskFormMode: TaskFormMode;
    createTodo?: (data: FormInput) => void;
    editTodo?: (data: Todo) => void;
    handleClose?: VoidFunction;
}

const defaultTaskFormState: FormInput = {
    title: "",
    date: "",
    start: "",
    end: ""
}

export default function TaskForm(props: Props) {
    useEffect(() => logger('render TaskForm'), []);

    const { selectedTodo } = props;

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

    const [error, setError] = useState(""); 

    const closeForm = () => 
        props.handleClose ? props.handleClose() : props.close();

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        setError(""); // clear existing error

        const error = taskForm.validate();
        
        if (error) return setError(error);

        const data = {
            date: taskForm.date,
            start: taskForm.start,
            end: taskForm.end,
            title: taskForm.title
        };

        const create = () => props.createTodo && props.createTodo(data);

        const update = () => props.editTodo && selectedTodo && props.editTodo({
            ...selectedTodo,
            ...data
        });

        await new Promise<void>((res) => {
            setTimeout(() => {
                props.taskFormMode === TaskFormMode.ADD ? create() : update();
                res();
            }, RIPPLE_DELAY);
        });
        
        closeForm();
    }

    const handleChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = (e) => {
        taskForm.onChange(e.target.name as keyof FormInput, e.target.value);
    }

    useEffect(() => {
        if (props.dateSelected && props.taskFormMode === TaskFormMode.ADD) {
            taskForm.onChange('date', props.dateSelected);
        }
    // eslint-disable-next-line
    }, [props.dateSelected, props.taskFormMode, taskForm.onChange]);

    useEffect(() => setError(""), [taskForm.date, taskForm.end, taskForm.title, taskForm.start]);

    useEffect(() => {
        if (selectedTodo?.id && props.taskFormMode === TaskFormMode.EDIT) {
            taskForm.onChange("title", selectedTodo.title);
            taskForm.onChange("start", selectedTodo.start);
            taskForm.onChange("end", selectedTodo.end);
            taskForm.onChange("date", selectedTodo.date);
        }
        // eslint-disable-next-line
    }, [selectedTodo, taskForm.onChange, props.taskFormMode]);

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <div className="task-form__header d-flex flex-row justify-content-between align-items-center mb-2">
                <h3>{titleHeader}</h3>

                <CustomIconButton onClick={closeForm}>
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

            <Alert variant="error" message={error} />

            <div className="actions d-flex flex-row flex-wrap mt-5">
                <CustomButton
                    title="Cancel"
                    type="button"
                    variant="secondary"
                    onClick={closeForm}
                />

                <CustomButton
                    title={props.taskFormMode === TaskFormMode.ADD ? "Add" : "Save"}
                />
            </div>
        </form>
    )
}