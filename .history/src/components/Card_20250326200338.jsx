import { useDraggable } from "@dnd-kit/core";
import "@/styles/Card.css";

export default function Card({ card, origin }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `${origin}-${card.id}`, // 👉 Important pour handleDragEnd
    data: { card },
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    touchAction: "none",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="card"
    >
      <img src={card.imgMinia} alt={card.name} />
      <div className="stats">
        <span className="atk">⚔ {card.atk}</span>
        <span className="hp">❤️ {card.hp}</span>
      </div>
    </div>
  );
}
