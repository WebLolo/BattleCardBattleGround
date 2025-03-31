import "@/styles/PlayerDeck.css";
import  DeckCard  from "@/components/DeckCard";

export default function PlayerDeck({ cards, origin }) {
  return (
    <div className="playerDeck">
      {cards.map((card, index) => (
        <DeckCard key={card.id} card={card} origin={origin} index={index} />
      ))}
    </div>

  );
}