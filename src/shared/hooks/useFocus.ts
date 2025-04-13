import { useRef, useEffect } from "react";

export const useFocus = <T extends HTMLElement>(dependency?: string) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    return ref.current?.focus();
  }, [dependency]);

  return ref;
};
