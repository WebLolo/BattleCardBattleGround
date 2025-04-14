import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function ProjectileImage({ startX, startY, endX, endY, onEnd }) {
  const ref = useRef();

  useEffect(() => {
    const dx = endX - startX;
    const dy = endY - startY;

    const el = ref.current;
    if (el) {
      el.style.transition = "transform 600ms ease-out";
      el.style.transform = `translate(${dx}px, ${dy}px) rotate(720deg)`;

      const timer = setTimeout(() => {
        onEnd?.();
      }, 600);

      return () => clearTimeout(timer);
    }
  }, [startX, startY, endX, endY, onEnd]);

  const content = (
    <img
      ref={ref}
      src="img/projectile.png"
      alt="Projectile"
      className="projectile-img"
      style={{
        position: "absolute",
        top: startY,
        left: startX,
        width: "64px",
        height: "64px",
        pointerEvents: "none",
        zIndex: 1000,
        transform: "translate(0, 0) rotate(0deg)",
      }}
    />
  );

  return createPortal(content, document.getElementById("projectile-root"));
}
