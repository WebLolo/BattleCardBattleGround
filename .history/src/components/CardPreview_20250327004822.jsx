// CardPreview.jsx
import "@/styles/CardPreview.css";

export default function CardPreview({ card, onClose }) {
  if (!card) return null; // 👈 Si card est null, rien ne s'affiche

  return (
    <div className="preview-overlay" onClick={onClose}>
      <div className="preview-content" onClick={(e) => e.stopPropagation()}>
        <img src={card.img} alt={card.nom} />
      </div>
    </div>
  );
}
