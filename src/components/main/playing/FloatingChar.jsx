import { useEffect, useRef } from "react";

export default function FloatingChar({ char, from, to, onAnimationEnd }) {
  const ref = useRef();

  useEffect(() => {
    if (!ref.current || !from || !to) return;

    ref.current.style.transform = `translate(${from.x}px, ${from.y}px)`;
    ref.current.style.transition = "none";

    requestAnimationFrame(() => {
      if (!ref.current) return;
      ref.current.style.transition = "transform 0.1s";
      ref.current.style.transform = `translate(${to.x}px, ${to.y}px)`;
      ref.current.style.borderRadius = "50%";
      ref.current.style.fontSize = "40px";
      ref.current.style.fontWeight = "bold";
      ref.current.style.color = "#017355";
    });

    const handler = () => onAnimationEnd();
    ref.current.addEventListener("transitionend", handler, { once: true });

    return () => {
      if (ref.current) {
        ref.current.removeEventListener("transitionend", handler);
      }
    };
  }, [from, to, onAnimationEnd]);

  return (
    <div
      ref={ref}
      className="floating-char"
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        fontSize: "40px",
        color: "#017355",
        pointerEvents: "none",
        zIndex: 5,
      }}
    >
      {char}
    </div>
  );
}
