export default function Board({ cards, onSell, isPlayerBoard = false }) {
    return (
      <div className="d-flex justify-content-center gap-3 mt-3 flex-wrap">
        {cards.map((card) => (
          <div key={card.id} className="text-center">
            <img
              src={card.imgMinia}
              alt={card.name}
              title={card.name}
              style={{ width: "90px", height: "auto" }}
            />
            <div>{card.atk} ⚔️ / {card.hp} ❤️</div>
            {isPlayerBoard && (
              <button className="btn btn-sm btn-danger mt-1" onClick={() => onSell(card)}>
                Vendre +1💰
              </button>
            )}
          </div>
        ))}
      </div>
    );
  }
  