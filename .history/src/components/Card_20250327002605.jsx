import { useDraggable } from "@dnd-kit/core";
import "@/styles/Card.css";

export default function Card({ card, origin, setPreviewCard }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `${origin}-${card.id}`,
    data: { source: origin, card },
  });

  const style = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
    cursor: "grab",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="card"
      onMouseEnter={() => setPreviewCard?.(card)}
      onMouseLeave={() => setPreviewCard?.(null)}
    >
      <img src={card.imgMinia} alt={card.nom} />
      <div className="stats">
        <span className="atk">⚔ {card.atk}</span>
        <span className="hp">❤️ {card.hp}</span>
      </div>
    </div>
  );
}
