import Card from "@/components/Card";
import "@/styles/Board.css";

export default function Board({ cards }) {
  return (
    <div className="board te">
      {cards.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  );
}
