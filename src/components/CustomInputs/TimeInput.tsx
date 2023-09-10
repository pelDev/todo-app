interface Props<T extends object> extends React.InputHTMLAttributes<HTMLInputElement>  {
    inputName?: keyof T;
}

export function TimeInput<T extends object>(props: Props<T>) {
    const { inputName, ...others } = props;

    return <input placeholder="00:00" {...others} type="time" className="custom-input time" name={inputName as string} />
}