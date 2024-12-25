import { useEffect, useState } from "react";

function useSticky() {
    const [sticky, setSticky] = useState(false);

    useEffect(() => {
        const scrollHandler = () => {
            let scrollBase = window.innerWidth > 767 ? 50 : 0;
            const scrollPos = window.scrollY;
            if (scrollPos > scrollBase) {
                setSticky(true);
            }

            if (scrollPos < scrollBase) {
                setSticky(false);
            }
        };

        window.addEventListener("scroll", scrollHandler);
        return () => {
            window.removeEventListener("scroll", scrollHandler);
        };
    }, [sticky]);

    return {
        sticky
    };
}

export default useSticky;