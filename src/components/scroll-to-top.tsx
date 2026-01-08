import { useEffect } from "react";
import { useLocation } from "wouter";

export default function ScrollToTop() {
    const [pathname] = useLocation();

    useEffect(() => {
        // Immediate scroll reset
        window.scrollTo(0, 0);

        // If Lenis or other smooth scroll libraries are interfering, 
        // we might need to dispatch a custom event or force it slightly later, 
        // but usually window.scrollTo(0,0) is sufficient if done on route change.
        // For good measure in a heavy app:
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;

    }, [pathname]);

    return null;
}
