import Card from "@/components/Card";
import "@/styles/Board.css";

export default function Board({ cards, onSell, isPlayerBoard }) {
  return (
    <div className="boardTopContainer">
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          onSell={onSell}
          isPlayerBoard={isPlayerBoard}
        />
      ))}
    </div>
  );
}
