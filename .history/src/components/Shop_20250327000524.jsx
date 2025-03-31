import DraggableCard from "@/components/DraggableCard";
import "@/styles/Shop.css";

export default function Shop({ cards, origin, setPreviewCard }) {
  return (
    <div className="shop">
      {cards.map((card) => (
        <div key={card.id} className="shop-card">
          <DraggableCard card={card} origin={origin} onPreview={setPreviewCard} />
        </div>
      ))}
    </div>
  );
}
