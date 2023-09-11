import { useEffect, useState } from "react";
import "./styles.scss";
import { startOfWeek, next10Days, getMonthName, isDateSame } from "../../utils";
import DayCard from "./DayCard";

interface Props {
    onTodoDateFilterChange: (date: Date) => void;
    todoDateFilter: Date;
    dateSelected: string;
}

export default function HorizontalCalendar(props: Props) {
    const { dateSelected, todoDateFilter, onTodoDateFilterChange } = props;

    const [dates, setDates] = useState<Date[]>(next10Days(startOfWeek(new Date())));

    useEffect(() => setDates(next10Days(startOfWeek(new Date(dateSelected)))), [dateSelected]);

    return (
        <>
            <h4 className="horizontal-calendar-title mb-4">{getMonthName(new Date(dateSelected).getMonth())}, {new Date(dateSelected).getFullYear()}</h4>
            
            <div className="horizontal-calendar w-100 d-flex flex-row">
                {
                    dates.map((date, idx) => (
                        <DayCard key={`day-card-${idx}`} date={date} selected={isDateSame(date, todoDateFilter)} onClick={() => onTodoDateFilterChange(date)} />
                    ))
                }
            </div>
        </>
    );
}