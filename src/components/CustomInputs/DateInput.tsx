interface Props<T extends object> extends React.InputHTMLAttributes<HTMLInputElement>  {
    inputName?: keyof T;
}

export function DateInput<T extends object>(props: Props<T>) {
    const { inputName, ...others } = props;

    return (
        <input type="date" className="custom-input date" placeholder="Today" {...others} name={inputName as string} />
    )
}