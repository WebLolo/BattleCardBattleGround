export default function Card({ card, onDragStart }) {
  return (
    <div
      className="card"
      draggable
      onDragStart={(e) => onDragStart(e, card, "shop")}
    >
      <img src={card.imgMinia} alt={card.name} />
      <div className="stats">
        <span className="atk">⚔ {card.atk}</span>
        <span className="hp">❤️ {card.hp}</span>
      </div>
    </div>
  );
}
