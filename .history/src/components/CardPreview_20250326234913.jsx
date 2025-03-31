import "@/styles/CardPreview.css";

export default function CardPreview({ card, onClose }) {
  if (!card) return null;

  return (
    <div className="preview-overlay" onClick={onClose}>
      <div className="preview-content" onClick={(e) => e.stopPropagation()}>
        <img src={card.img} alt={card.nom} />
      </div>
    </div>
  );
}
