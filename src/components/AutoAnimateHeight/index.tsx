import { ReactNode, useEffect, useRef, useState } from "react";
import AnimateHeight, { Height } from "react-animate-height";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

const Padding = 20;

export default function AutoAnimateHeight(props: Props) {
    const { children, ...others } = props;
    const [height, setHeight] = useState<Height>('auto');

    const contentDiv = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const resizeObserver = new ResizeObserver(() => {
            setHeight(contentDiv.current? contentDiv.current.clientHeight + (Padding * 2) : "auto");
        });

        if (contentDiv.current) resizeObserver.observe(contentDiv.current);

        return () => resizeObserver.disconnect()
    }, []);

    return (
        <AnimateHeight
            {...others}
            height={height}
            contentClassName="auto-content"
            contentRef={contentDiv}
        >
            {children}
        </AnimateHeight>
    );
}