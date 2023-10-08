import { useEffect, useState } from "react";

type TWindowSize = {
    width: number;
    height: number;
}

export const useWindowSize = () => {
    const [size, setSize] = useState<TWindowSize>({
        height: window.innerHeight,
        width: window.innerWidth
    });

    useEffect(() => {
        const handleWindowSizeChange = () => {
            setSize({width: window.innerWidth, height: window.innerHeight});
        }

        window.addEventListener('resize', handleWindowSizeChange);

        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    return size;
}