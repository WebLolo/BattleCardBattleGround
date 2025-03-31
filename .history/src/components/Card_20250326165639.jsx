import "@/styles/Card.css";

export default function Card({ card }) {
  return (
    <div className="card">
      <img src={card.imgMinia} alt={card.name} />
      <div className="stats">
        <span className="atk">⚔ {card.atk}</span>
        <span className="hp">❤️ {card.hp}</span>
      </div>
    </div>
  );
}
