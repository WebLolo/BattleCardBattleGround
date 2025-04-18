// Ajoute ce composant dans Game1v1.jsx (ou un fichier séparé si tu veux le rendre réutilisable)
import { useEffect, useState } from "react";

export default function FusionAnimation({ fusionAnimation, onFinish }) {
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (fusionAnimation) {
      setStart(true);
      const timer = setTimeout(() => {
        setStart(false);
        onFinish();
      }, 1600); // Durée totale
      return () => clearTimeout(timer);
    }
  }, [fusionAnimation]);

  if (!fusionAnimation || !start) return null;

  return (
    <div className="fusion-anim-overlay">
      {fusionAnimation.cartes.slice(0, 3).map((card, index) => (
        <img
          key={card.id}
          src={card.imgMinia}
          className={`fusion-card fusion-from-${index + 1}`}
          alt={card.nom}
        />
      ))}
      <img
        src={fusionAnimation.carteResultat.imgMinia}
        className="fusion-result"
        alt={fusionAnimation.carteResultat.nom}
      />
    </div>
  );
}
