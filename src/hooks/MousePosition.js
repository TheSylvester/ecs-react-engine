import { useEffect, useRef } from "react";

export default function useMousePosition() {

  const position = useRef({ x: 0, y: 0 });

  useEffect(() => {
    document.addEventListener("mousemove", (event) => {
      position.current = { x: event.clientX, y: event.clientY };
    });
  }, []);

  return position;
}

