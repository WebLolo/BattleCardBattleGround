import { useEffect, useState } from "react";
export default function FusionAnimation({ fusionAnim, onFinish }) {
    const [start, setStart] = useState(false);
  
    useEffect(() => {
      if (fusionAnim) {
        setStart(true);
        const timer = setTimeout(() => {
          setStart(false);
          onFinish();
        }, 1600); // Durée totale
        return () => clearTimeout(timer);
      }
    }, [fusionAnim]);
  
    if (!fusionAnim || !start) return null;
  
    return (
      <div className="fusion-anim-overlay">
        {fusionAnim.cartes.slice(0, 3).map((card, index) => (
          <img
            key={card.id}
            src={card.imgMinia}
            className={`fusion-card fusion-from-${index + 1}`}
            alt={card.nom}
          />
        ))}
        <img
          src={fusionAnim.carteResultat.imgMinia}
          className="fusion-result"
          alt={fusionAnim.carteResultat.nom}
        />
      </div>
    );
  }
  