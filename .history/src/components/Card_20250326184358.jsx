import "@/styles/Card.css";

export default function Card({ card, onSell }) {
  return (
    <div className="card">
      <img src={card.imgMinia} alt={card.name} />
      <div className="stats">
        <span className="atk">⚔ {card.atk}</span>
        <span className="hp">❤️ {card.hp}</span>
      </div>
      {/* Si une fonction onSell est fournie, afficher le bouton "Vendre" */}
      {onSell && (
        <button className="btn btn-danger btn-sm sell-button" onClick={() => onSell(card)}>
          +1 💰
        </button>
      )}
    </div>
  );
}
