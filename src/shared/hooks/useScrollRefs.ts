import { useEffect, useRef } from "react";

// Scrolls to the element every time our list.length changes

export function useScrollRefs(itemsLength: number) {
  const itemsRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const elementRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    itemsRefs.current = itemsRefs.current.slice(0, itemsLength);

    if (itemsRefs.current.length > 1) {
      elementRef.current?.scrollIntoView();
    }
  }, [itemsLength]);

  return { itemsRefs, elementRef };
}
