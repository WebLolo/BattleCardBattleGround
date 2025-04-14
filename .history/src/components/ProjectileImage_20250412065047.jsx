// ProjectileImage.jsx
import { useEffect, useRef } from "react";

export default function ProjectileImage({ startX, startY, endX, endY, onEnd }) {
  const ref = useRef();

  useEffect(() => {
    const dx = endX - startX;
    const dy = endY - startY;

    const distance = Math.sqrt(dx * dx + dy * dy);
    const duration = distance * 1.2; // Vitesse ajustable

    const el = ref.current;
    if (el) {
      el.style.transform = "translate(0, 0)"; // Reset au départ

      // Déclenche au prochain frame
      requestAnimationFrame(() => {
        el.style.transition = `transform ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
        el.style.transform = `translate(${dx}px, ${dy}px) rotate(720deg)`; // Mouvement + rotation
      });

      const handle = setTimeout(() => {
        onEnd?.();
      }, duration);

      return () => clearTimeout(handle);
    }
  }, [startX, startY, endX, endY, onEnd]);

  return (
    <img
      ref={ref}
      src="img/projectile.png" // ton PNG personnalisé ici
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
