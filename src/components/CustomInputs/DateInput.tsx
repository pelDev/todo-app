interface Props extends React.HTMLAttributes<HTMLInputElement>  {}

export function DateInput(props: Props) {
    const { ...others } = props;

    return (
        <input type="date" className="custom-input date" placeholder="Today" {...others} />
    )
}