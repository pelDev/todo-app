interface Props {
    isChecked: boolean;
    onChecked: VoidFunction;
}

export function Checkbox(props: Props) {
    const { isChecked, onChecked } = props;

    return (
        <div className="checkbox-wrapper">
            <label>
                <input type="checkbox" checked={isChecked} onChange={onChecked} />
            </label>
        </div>
    );
}