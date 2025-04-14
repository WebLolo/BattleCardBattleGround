// ProjectileImage.jsx
import { motion } from "framer-motion";

export default function ProjectileImage({ startX, startY, endX, endY, onEnd }) {
    const distanceX = endX - startX;
    const distanceY = endY - startY;
  
    return (
      <motion.img
        src={projectileImage}
        alt="projectile"
        className="projectile-img"
        initial={{
          x: startX,
          y: startY,
          opacity: 1,
          position: "fixed",
          width: "30px",
          height: "30px",
          zIndex: 9999,
          pointerEvents: "none",
        }}
        animate={{
          x: endX,
          y: endY,
          opacity: 0,
        }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
        }}
      />
    );
  }
