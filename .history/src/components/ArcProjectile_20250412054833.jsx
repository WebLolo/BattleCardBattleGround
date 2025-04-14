export default function ArcProjectile({ startX, startY, endX, endY }) {
    const controlX = (startX + endX) / 2;
    const controlY = Math.min(startY, endY) - 150;
  
    const pathId = "arc-path"; // ID statique si un seul projectile à l’écran
    const path = `M ${startX},${startY} Q ${controlX},${controlY} ${endX},${endY}`;
  
    return (
      <svg className="projectile-svg">
        {/* Courbe invisible */}
        <path id={pathId} d={path} fill="none" stroke="none" />
  
        {/* Boule brillante qui suit la trajectoire */}
        <circle r="6" fill="url(#glow)">
          <animateMotion dur="0.5s" fill="freeze">
            <mpath href={`#${pathId}`} />
          </animateMotion>
        </circle>
  
        {/* Glow bleu */}
        <defs>
          <radialGradient id="glow" r="50%" cx="50%" cy="50%">
            <stop offset="0%" stopColor="white" />
            <stop offset="100%" stopColor="cyan" />
          </radialGradient>
        </defs>
      </svg>
    );
  }
  