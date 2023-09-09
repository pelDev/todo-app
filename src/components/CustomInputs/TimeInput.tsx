interface Props extends React.HTMLAttributes<HTMLInputElement>  {}

export function TimeInput(props: Props) {
    const { ...others } = props;

    return <input placeholder="00:00" {...others} type="time" className="custom-input time" />
}