import { useCallback, useRef } from "react";
import { Todo } from "../../../react-app-env";
import { isDateSame } from "../../../utils";
import { Checkbox } from "../../CustomInputs";
import { useAppDispatch } from "../../../hooks/store";
import { updateTodo } from "../../../redux-store/features/todoSlice";
import { RIPPLE_DELAY } from "../../../constants";

interface Props {
    todo: Todo;
    selectTodo: (todo: Todo) => void;
    selected?: boolean;
}

export default function TaskTile(props: Props) {
    const { todo, selectTodo, selected = false } = props;

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

    const ref = useRef<HTMLDivElement | null>(null);

    const showRipple = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        const ripple = document.createElement("span");
        ripple.classList.add("ripple");
        ref.current?.appendChild(ripple);

        const target = e.target as HTMLElement;
        let x = e.clientX - target.offsetLeft;
        let y = e.clientY - target.offsetTop;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        setTimeout(() => {
            ripple.remove();
            selectTodo(todo);
        }, RIPPLE_DELAY);
    }

    const hanldeClick: React.MouseEventHandler<HTMLElement> = (e) => {
        showRipple(e);
    }

    return (
        <div ref={ref} className={`task-tile position-relative d-flex flex-row align-items-center justify-content-between ${todo.complete ? 'complete' : ''} ${selected ? 'selected' : ''}`} onClick={hanldeClick}>
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