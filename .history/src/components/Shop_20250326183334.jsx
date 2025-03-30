export default function Shop({ cards, onBuy, onDragStart }) {
  return (
    <div className="shop">
      {cards.map((card) => (
        <div key={card.id} className="shop-card">
          <Card card={card} onDragStart={onDragStart} />
        </div>
      ))}
    </div>
  );
}
