import { CalendarIcon, ClockIcon, CloseIcon } from "../../assets/svg";
import { Todo } from "../../react-app-env";
import { getDateString } from "../../utils";
import CustomButton from "../Button";
import CustomIconButton from "../IconButton";

interface Props {
    todo: Todo;
    close: VoidFunction;
    goToEdit: VoidFunction;
    handleDelete: VoidFunction;
    handleClose?: VoidFunction;
}

export default function ViewTask(props: Props) {
    const { todo } = props;

    const closeForm = () => 
        props.handleClose ? props.handleClose() : props.close();

    const handleDelete = () => {
        props.handleDelete();
        closeForm();
    }

    return (
        <div className="view-task">
            <div className="view-task_header d-flex flex-row justify-content-end align-items-center mb-2">
                <CustomIconButton onClick={closeForm}>
                    <CloseIcon />
                </CustomIconButton>
            </div>

            <h3>{todo.title}</h3>

            <div className="view-task__details my-5">
                <div>
                    <span>
                        <CalendarIcon />
                    </span>

                    <span>
                        {getDateString(todo.date)}
                    </span>
                </div>

                <div>
                    <span>
                        <ClockIcon />
                    </span>

                    <span className="time-range">
                        {todo.start} - {todo.end}
                    </span>
                </div>
            </div>

            <div className="view-task__actions d-flex flex-row">
                <CustomButton
                    title="Delete"
                    variant="secondary"
                    onClick={handleDelete}
                />

                <CustomButton
                    title="Edit"
                    onClick={props.goToEdit}
                />
            </div>
        </div>
    );
}