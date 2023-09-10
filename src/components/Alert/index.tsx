import "./styles.scss";

interface Props {
    variant: "error";
    message?: string | null;
}

export default function Alert(props: Props) {
    const { variant, message } = props;

    if (!message) return null;

    return (
        <div className={`custom-alert my-2 ${variant}`}>
            {message}
        </div>
    )
}