import "@/styles/PlayerDeck.css";
import  DeckCard  from "@/components/DeckCard";

export default function PlayerDeck({ cards }) {
  return (
    <div className="playerDeck">
      {cards.map((card, index) => (
        <DeckCard key={card.id} card={card} index={index} />
      ))}
    </div>

  );
}