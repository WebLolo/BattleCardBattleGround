// ProjectileImage.jsx
import { useEffect, useRef } from "react";

export default function ProjectileImage({ startX, startY, endX, endY, onEnd }) {
  const ref = useRef();

  useEffect(() => {
    const dx = endX - startX;
    const dy = endY - startY;

    const distance = Math.sqrt(dx * dx + dy * dy);
    const duration = distance * 1.2; // Ajuste la vitesse ici

    const el = ref.current;
    if (el) {
      el.style.transition = `transform ${duration}ms ease-out`;
      el.style.transform = `translate(${dx}px, ${dy}px)`;

      const handle = setTimeout(() => {
        onEnd?.();
      }, duration);

      return () => clearTimeout(handle);
    }
  }, [startX, startY, endX, endY, onEnd]);

  return (
    <img
      ref={ref}
      src="/img/projectile.png" // place ton PNG ici
      alt="Projectile"
      className="projectile-img"
      style={{
        position: "absolute",
        top: startY,
        left: startX,
        width: "32px",
        height: "32px",
        pointerEvents: "none",
        zIndex: 1000,
        transform: "translate(0, 0)",
      }}
    />
  );
}
