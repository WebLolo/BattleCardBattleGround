import "@/styles/PlayerBoard.css";
import  Card  from "@/components/Card";

export default function PlayerBoard({ cards }) {
  return (
    <div className="playerBoard">
      {cards.map((card, index) => (
        <Card card={card} index={index} />
      ))}
    </div>

  );
}