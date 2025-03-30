import DraggableCard from "@/components/DraggableCard";
import "@/styles/Shop.css";

export default function Shop({ cards, origin }) {
  const shopRef = useRef(null);
  return (
    <div className="shop">
      {cards.map((card) => (
        <div key={card.id} className="shop-card">
          <DraggableCard card={card} origin={origin} />
        </div>
      ))}
    </div>
  );
}

