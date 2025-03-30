import DraggableCard from "@/components/DraggableCard";
import "@/styles/Shop.css";

export default function Shop({ cards, origin, onPreview  }) {
  return (

      {cards.map((card) => (
        <div key={card.id} className="shop-card">
          <DraggableCard card={card} origin={origin} onPreview={onPreview } />
        </div>
      ))}

  );
}
