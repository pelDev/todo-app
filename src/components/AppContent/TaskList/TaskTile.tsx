import { useCallback } from "react";
import { Todo } from "../../../react-app-env";
import { isDateSame } from "../../../utils";
import { Checkbox } from "../../CustomInputs";
import { useAppDispatch } from "../../../hooks/store";
import { updateTodo } from "../../../redux-store/features/todoSlice";

interface Props {
    todo: Todo;
}

export default function TaskTile(props: Props) {
    const { todo } = props;

    const dispatch = useAppDispatch();

    const getDisplayDate = useCallback(() => {
        if (isDateSame(new Date(), new Date(todo.date))) {
            return "Today";
        }

        return todo.date;
    }, [todo.date]);

    const onChecked = () => {
        dispatch(updateTodo({ ...todo, complete: !todo.complete }));
    };

    return (
        <div className="task-tile d-flex flex-row align-items-center justify-content-between">
            <div className="left d-flex flex-row align-items-center">
                <Checkbox isChecked={todo.complete} onChecked={onChecked} />

                <div>
                    <span className="title">{todo.title}</span>
                    <span className="time-range">{todo.start} - {todo.end}</span>
                </div>
            </div>

            <div className="right">
                {getDisplayDate()}
            </div>
        </div>
    );
}