import "@/styles/PlayerBoard.css";
import { Card } from "@/components/Card";

export default function PlayerBoard({ cards }) {
  return (
    <div className="playerBoard">
      {cards.forEach((card, index) => (
        <Card key={card.id} card={card} index={index} />
      ))}
    </div>

  );
}