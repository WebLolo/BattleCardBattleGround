import "@/styles/PlayerDeck.css";
import  DeckCard  from "@/components/DeckCard";

export default function PlayerDeck({ cards, origin, onDeck }) {
  return (
    <div className="playerDeck">
      {cards.map((card, index) => (
        <DeckCard key={card.id} card={card} origin={origin} onDeck={onDeck} index={index} />
      ))}
    </div>

  );
}