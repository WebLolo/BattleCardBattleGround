// ProjectileImage.jsx
import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";

export default function ProjectileImage({ startX, startY, endX, endY, onEnd }) {
  const ref = useRef();

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;
    const duration = 600; // ✅ Durée bien déclarée ici

    // 1. Réinitialiser les styles
    el.style.transition = "none";
    el.style.transform = "translate(0, 0) rotate(0deg)";

    // 2. Appliquer la transformation avec transition
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.transition = `transform ${duration}ms ease-out`;
        el.style.transform = `translate(${endX - startX}px, ${endY - startY}px) rotate(720deg)`;
      });
    });

    // 3. Appel de onEnd après l'animation
    const handle = setTimeout(() => {
      console.log("🛑 Fin animation, appel de onEnd");
      if (typeof onEnd === "function") onEnd();
    }, duration);

    return () => clearTimeout(handle);
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
