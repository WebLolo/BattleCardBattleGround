import Card from "@/components/Card";
import "@/styles/Board.css";

export default function Board({ cards }) {
  return (
    <div className="boardTopContainer ">
      {cards.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  );
}
