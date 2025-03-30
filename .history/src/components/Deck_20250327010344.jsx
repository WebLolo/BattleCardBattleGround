import DraggableCard from "@/components/DraggableCard";
import "@/styles/Deck.css";

export default function Deck({ cards, onPreview  }) {
  return (
    <div className="playerDeck">
      {cards.map((card) => (
        <div key={card.id} className="text-center">
          <DraggableCard card={card} origin="deck" onPreview={onPreview} />
        </div>
      ))}
    </div>
  );
}
