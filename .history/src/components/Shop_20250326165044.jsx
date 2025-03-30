import "@/styles/Shop.css";

export default function Shop({ cards }) {
  return (
    <div className="shop-container">
      {cards.map((card) => (
        <div key={card.id} className="shop-card">
          <img src={card.imgMinia} alt={card.name} />
          <p>{card.name}</p>
          <button>💰 Acheter</button>
        </div>
      ))}
    </div>
  );
}
