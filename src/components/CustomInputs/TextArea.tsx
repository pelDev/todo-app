interface Props<T extends object> extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    inputName: keyof T;
}

export function TextArea<T extends object>(props: Props<T>) {
    const { inputName, ...others } = props;

    return (
        <textarea rows={3} {...others} name={inputName as string} className="custom-input textarea" />
    );
}