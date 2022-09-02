import { useEffect } from "react";

const useClickTarget = (ref: any, toggle: boolean, handleToggle: any) => {
    const handleUserClick = (event: any) => {
        if (ref.current && !ref.current.contains(event.target)) {
            handleToggle();
        }
    };
    useEffect(() => {
        if (toggle) {
            document.addEventListener('click', handleUserClick);
            return () => document.removeEventListener('click', handleUserClick);
        }
    });
}

export default useClickTarget;