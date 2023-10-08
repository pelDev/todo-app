import React, { ReactElement, useCallback, useEffect, useState } from "react";
import "./styles.scss";

interface Props {
    shouldShow: boolean;
    onRequestClose: VoidFunction; 
    children: ReactElement | null; 
}

export default function Modal(props: Props) {
    const {onRequestClose} = props;
    const [openState, setOpenState] = useState('opened');

    useEffect(() => {
        setOpenState('opened');
    }, [props.shouldShow]);

    const handleClose = useCallback(async () => {
        setOpenState('closed');
        await new Promise(rs => setTimeout(rs, 300));
        onRequestClose();
    }, [onRequestClose, setOpenState]);

    if (!props.shouldShow) return null;

    return (
        <div className={`modal-container d-flex flex-column justify-content-end ${openState}`} onClick={handleClose}>
            <div className="modal-content p-5" onClick={(e) => e.stopPropagation()}>
                {props.children && React.cloneElement(props.children, {
                    handleClose
                })}
            </div>
        </div>
    );
}