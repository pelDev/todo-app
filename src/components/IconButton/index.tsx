import React, { useRef } from "react";
import "./styles.scss";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode; 
}

export default function CustomIconButton(props: Props) {
    const { children, className, ...others } = props;

    const buttonRef = useRef<HTMLButtonElement>(null);

    const showRipple = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const ripple = document.createElement("span");
        ripple.classList.add("ripple");
        buttonRef.current?.appendChild(ripple);

        const target = e.target as HTMLButtonElement;
        let x = e.clientX - target.offsetLeft;
        let y = e.clientY - target.offsetTop;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        setTimeout(() => {
            ripple.remove();
            others.onClick && others.onClick(e);
        }, 300);
    }

    const hanldeClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        showRipple(e);
    }

    return (
        <button 
            type="button"
            {...others}
            ref={buttonRef}
            onClick={hanldeClick}
            className={`custom-icon-button position-relative ${className}`}
        >
            {children}
        </button>
    );
}