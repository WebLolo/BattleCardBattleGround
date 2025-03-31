import "@/styles/PlayerDeck.css";
import  Card  from "@/components/Card";

export default function PlayerDeck({ cards }) {
  return (
    <div className="playerDeck">
      {cards.map((card, index) => (
        <Card key={card.id} card={card} index={index} />
      ))}
    </div>

  );
}