import { useEffect, useRef, useState } from "react";

export const useVisibleBooks = (bookIds: string[]) => {
    const [visibleSet, setVisibleSet] = useState<Set<string>>(new Set());
    const rowRefs = useRef<Record<string, IntersectionObserverEntry>>({});

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const updatedSet = new Set(visibleSet);
            entries.forEach(entry => {
                const id = entry.target.getAttribute("data-id")!;
                if (entry.isIntersecting) updatedSet.add(id);
                else updatedSet.delete(id);
            });
            setVisibleSet(updatedSet);
        }, { threshold: 0.5 });

        bookIds.forEach(id => {
            const el = document.querySelector(`[data-id="${id}"]`);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [bookIds]);

    return visibleSet;
}
