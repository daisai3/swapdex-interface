import { useEffect, useState } from 'react';

// Hook
export const useWindowSize = () => {
    const isClient = typeof window === 'object';

    function getSize(): { width: number; height: number } {
        return {
            width: isClient ? window.innerWidth : 0,
            height: isClient ? window.innerHeight : 0,
        };
    }

    const [windowSize, setWindowSize] = useState(getSize);

    useEffect(() => {
        if (!isClient) {
            return;
        }

        const handleResize = (): void => {
            setWindowSize(getSize());
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []); // Empty array ensures that effect is only run on mount and unmount

    return windowSize;
};
