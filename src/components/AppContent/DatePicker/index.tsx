import ReactCalendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import "./styles.scss";

interface Props {
    value?: Date;
    onChange: (val: Date) => void;
}

export default function DatePicker(props: Props) {
    const { value = new Date(), onChange } = props;

    return (
        <div className="custom-react-calendar">
            <ReactCalendar 
                value={value} 
                onChange={(date) => onChange(date as Date)}
                view="month"
                tileClassName={({ view, date }) => view === 'month' && date.getDate() === new Date().getDate() ? 'hasTask' : null}
            />
        </div>
    );
};