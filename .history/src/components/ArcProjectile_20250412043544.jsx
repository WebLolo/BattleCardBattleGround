export default function ArcProjectile({ startX, startY, endX, endY }) {
    const controlX = (startX + endX) / 2;
    const controlY = Math.min(startY, endY) - 150;
  
    const pathId = "projectile-path"; // identifiant pour <mpath>
    const path = `M ${startX},${startY} Q ${controlX},${controlY} ${endX},${endY}`;
  
    return (
      <svg className="projectile-svg">
        <defs>
          <linearGradient id="projGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="cyan" />
            <stop offset="100%" stopColor="blue" />
          </linearGradient>
        </defs>
  
        <path
          id={pathId}
          d={path}
          stroke="url(#projGradient)"
          strokeWidth={4}
          fill="none"
          strokeLinecap="round"
          style={{ filter: "drop-shadow(0 0 6px cyan)" }}
        />
  
        {/* 🌟 Le projectile animé qui suit le chemin */}
        <circle r="6" fill="white">
          <animateMotion dur="0.6s" fill="freeze">
            <mpath xlinkHref={`#${pathId}`} />
          </animateMotion>
        </circle>
      </svg>
    );
  }
  