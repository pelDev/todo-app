import React, { ReactNode, useRef } from "react";
import "./styles.scss";
import { RIPPLE_DELAY } from "../../constants";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    title?: string;
    children?: ReactNode;
    variant?: "primary" | "secondary";
    leftIcon?: React.ReactNode; 
}

export default function CustomButton(props: Props) {
    const { children, title, leftIcon, variant = "primary", ...others } = props;

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
        }, RIPPLE_DELAY);
    }

    const hanldeClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        showRipple(e);
    }

    return (
        <button 
            {...others}
            ref={buttonRef}
            onClick={hanldeClick}
            className={`custom-button ${variant} position-relative d-flex flex-row align-items-center justify-content-center ${others.className}`}
        >
            {Boolean(children) ? 
                (
                    children
                ) :
                (
                    <>
                        {leftIcon && leftIcon}

                        {title && title}
                    </>
                )
            }
        </button>
    );
}