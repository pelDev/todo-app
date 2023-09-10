import ReactCalendar, { TileClassNameFunc } from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import "./styles.scss";
import { selectTodos } from "../../../redux-store/features/todoSlice";
import { useAppSelector } from "../../../hooks/store";
import { useCallback } from "react";

interface Props {
    value?: Date;
    onChange: (val: Date) => void;
}

export default function DatePicker(props: Props) {
    const { value = new Date(), onChange } = props;
    const todos = useAppSelector(selectTodos);

    const getTileClassName: TileClassNameFunc = useCallback(({view, date}) => {
        if (view === "month") {
            const day = date.getDate();
            const month = date.getMonth();
            const year = date.getFullYear();

            const dayHasTask = todos.some((todo) => {
                const todoDate = new Date(todo.date);

                return todoDate.getDate() === day && todoDate.getMonth() === month && todoDate.getFullYear() === year;
            });

            if (dayHasTask) return "hasTask";
        }

        return null;
    }, [todos]);

    return (
        <div className="custom-react-calendar">
            <ReactCalendar 
                value={value} 
                onChange={(date) => onChange(date as Date)}
                view="month"
                tileClassName={getTileClassName}
            />
        </div>
    );
};