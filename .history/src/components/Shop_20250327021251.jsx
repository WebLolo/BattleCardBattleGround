import DraggableCard from "@/components/DraggableCard";
import "@/styles/Shop.css";

export default function Shop({ cards, origin, onPreview  }) {
  return (
    <div className="shop">
      {cards.map((card) => (
        <div key={card.id} className="shop-card">
          <DraggableCard card={card} origin={origin} onPreview={onPreview } />
        </div>
      ))}
    </div>
  );
}
