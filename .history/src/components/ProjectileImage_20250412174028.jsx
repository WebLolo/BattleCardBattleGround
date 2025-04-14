// ProjectileImage.jsx
import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";

export default function ProjectileImage({ startX, startY, endX, endY, onEnd }) {
  const ref = useRef();

  useEffect(() => {
    const dx = endX - startX;
    const dy = endY - startY;

    const duration = 600; //

    const el = ref.current;
    if (el) {
      // 1. Reset position sans transition
      el.style.transition = "none";
      el.style.transform = "translate(0, 0) rotate(0deg)";

      // 2. Forcer DOM à appliquer le style de base AVANT d'ajouter la transition
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          el.style.transition = `transform ${duration}ms ease-out`;
          el.style.transform = `translate(${dx}px, ${dy}px) rotate(720deg)`;
        });
      });

      // 3. Nettoyage après animation
      const handle = setTimeout(() => {
        onEnd?.();
      }, duration);

      return () => clearTimeout(handle);
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
