import "@/styles/ShopBoard.css";
import  Card  from "@/components/Card";

export default function ShopBoard({ cards }) {
  return (
    <div className="shopBoard">
      {cards.map((card, index) => (
        <Card key={card.id} card={card} index={index} />
      ))}
    </div>

  );
}