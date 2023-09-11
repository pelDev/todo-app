import CustomButton from "../Button";

interface Props {
    date: Date;
    onClick: VoidFunction;
    selected?: boolean;
}

export default function DayCard(props: Props) {
    const { date, selected = false, onClick } = props;

    return (
        <CustomButton className={`day-card ${selected ? 'active' : ''}`} onClick={onClick}>
            {date.toLocaleDateString('default', { weekday: 'short' })}
            <br/>
            {date.getDate()}
        </CustomButton>
    )
}