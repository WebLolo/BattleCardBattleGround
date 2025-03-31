import "@/styles/Deck.css";
export default function Deck({ cards, onPlay }) {
    return (
      <div className="playerDeck ">
        {cards.map((card) => (
          <div key={card.id} className="text-center">
            <img
              src={card.imgMinia}
              alt={card.name}
              title={card.name}
              style={{ width: "80px", height: "auto" }}
            />
            <button className="btn btn-sm btn-success mt-1" onClick={() => onPlay(card)}>
              Jouer
            </button>
          </div>
        ))}
      </div>
    );
  }
  