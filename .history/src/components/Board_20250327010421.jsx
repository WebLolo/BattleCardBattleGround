import DraggableCard from "@/components/DraggableCard";
import "@/styles/Board.css";

export default function Board({ cards, origin, onPreview }) {
  return (
    <div className="boardTopContainer">
      {cards.map((card) => (
        <DraggableCard key={card.id} card={card} origin={origin} onPreview={onPreview} />
      ))}
    </div>
  );
}
