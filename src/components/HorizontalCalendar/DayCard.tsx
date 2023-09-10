import CustomButton from "../Button";

interface Props {
    date: Date;
    selected?: boolean;
}

export default function DayCard(props: Props) {
    const { date, selected = false } = props;

    return (
        <CustomButton className={`day-card ${selected ? 'active' : ''}`}>
            {date.toLocaleDateString('default', { weekday: 'short' })}
            <br/>
            {date.getDate()}
        </CustomButton>
    )
}