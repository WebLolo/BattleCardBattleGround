import { motion } from "framer-motion";

export default function ArcProjectile({ startX, startY, endX, endY }) {
  const controlX = (startX + endX) / 2;
  const controlY = Math.min(startY, endY) - 150; // arc vers le haut

  const path = `M ${startX},${startY} Q ${controlX},${controlY} ${endX},${endY}`;

  return (
    <svg className="projectile-svg">
      {/* Dégradé pour le trait */}
      <defs>
        <linearGradient id="projGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="cyan" />
          <stop offset="100%" stopColor="blue" />
        </linearGradient>
      </defs>

      {/* Le trait courbé */}
      <motion.path
        d={path}
        stroke="url(#projGradient)"
        strokeWidth={4}
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ filter: "drop-shadow(0 0 6px cyan)" }}
      />

      {/* 💫 Un point qui suit la trajectoire */}
      <motion.circle
        r="6"
        fill="white"
        initial={{ offsetDistance: "0%" }}
        animate={{ offsetDistance: "100%" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <animateMotion dur="0.5s" fill="freeze">
          <mpath xlinkHref="#path" />
        </animateMotion>
      </motion.circle>
    </svg>
  );
}
