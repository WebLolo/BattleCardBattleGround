import "@/styles/PlayerBoard.css";
import  Card  from "@/components/Card";

export default function PlayerBoard({ cards, origin }) {
  return (
    <div className="playerBoard">
      {cards.map((card, index) => (
        <Card key={card.id} card={card} origin={origin} index={index} />
      ))}
    </div>

  );
}