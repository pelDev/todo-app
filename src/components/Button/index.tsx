import React, { useRef } from "react";
import "./styles.scss";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    title: string;
    variant?: "primary" | "secondary";
    leftIcon?: React.ReactNode; 
}

export default function CustomButton(props: Props) {
    const { title, leftIcon, variant = "primary", ...others } = props;

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
            {...others}
            ref={buttonRef}
            onClick={hanldeClick}
            className={`custom-button ${variant} position-relative d-flex flex-row align-items-center justify-content-center`}
        >
            {leftIcon && leftIcon}

            {title}
        </button>
    );
}