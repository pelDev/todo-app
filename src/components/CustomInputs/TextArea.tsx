interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function TextArea(props: Props) {
    const { ...others } = props;

    return (
        <textarea rows={3} {...others} className="custom-input textarea" />
    );
}