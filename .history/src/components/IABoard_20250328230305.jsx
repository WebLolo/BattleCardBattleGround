import "@/styles/IABoard.css";
import  Card  from "@/components/Card";

export default function IABoard({ cards, onPreview, carteAttaquantId, carteDefenseurId }) {
  return (
    <div className="iaBoard">
      {cards.map((card, index) => (
        <Card key={card.id} card={card} index={index} onPreview={onPreview} carteAttaquantId={carteAttaquantId} carteDefenseurId={carteDefenseurId} />
      ))}
    </div>

  );
}