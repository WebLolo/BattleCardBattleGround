import Card from "@/components/Card";
import "@/styles/Board.css";

export default function Board({ cards }) {
  return (
    <div className="board ">
      {cards.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  );
}
