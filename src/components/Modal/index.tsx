import { ReactNode } from "react";
import "./styles.scss";

interface Props {
    shouldShow: boolean;
    onRequestClose: VoidFunction; 
    children: ReactNode; 
}

export default function Modal(props: Props) {
    if (!props.shouldShow) return null;

    return (
        <div className="modal-container d-flex flex-column justify-content-end" onClick={props.onRequestClose}>
            <div className="modal-content p-5" onClick={(e) => e.stopPropagation()}>
                {props.children}
            </div>
        </div>
    );
}