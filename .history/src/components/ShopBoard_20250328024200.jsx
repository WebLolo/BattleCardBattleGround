import "@/styles/ShopBoard.css";
import  Card  from "@/components/Card";

export default function ShopBoard({ cards, origin }) {
  return (
    <div className="shopBoard">
      {cards.map((card, index) => (
        <Card key={card.id} card={card} origin={origin} index={index} />
      ))}
    </div>

  );
}