import { useDraggable } from "@dnd-kit/core";
import { motion } from "framer-motion";

export default function Card({
  card,
  origin,
  index,
  onPreview,
  phase,
  carteAttaquantId,
  carteDefenseurId,
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `${origin}-${card.id}`,
    data: { source: origin, card },
  });

  const dragStyle = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    cursor: "grab",
  };

  return (
    <div
      ref={setNodeRef}
      style={dragStyle}
      {...listeners}
      {...attributes}
      onDoubleClick={() => onPreview?.(card)}
      className="cardfight player content-card animate__animated animate__backInLeft"
      data-id={card.id}
      data-fullimg={card.img}
    >
      <motion.div
        animate={
          phase === "combat" && card.id === carteAttaquantId
            ? {
                y: -20,
                scale: 1.2,
                boxShadow: "0 0 10px rgba(255,0,0,0.7)",
              }
            : phase === "combat" && card.id === carteDefenseurId
            ? {
                scale: 1.1,
                boxShadow: "0 0 8px rgba(255,255,0,0.5)",
              }
            : {
                y: 0,
                scale: 1,
                boxShadow: "none",
              }
        }
        transition={{ duration: 0.3 }}
      >
        <img className="cardimg" src={card.imgMinia} alt={card.nom} />
        <p className="hudIntAtk">{card.atk}</p>
        <p
          className={`hudIntPv ${
            phase === "combat" && card.hp < card.baseHp ? "pv-damaged" : ""
          }`}
        >
          {card.hp}
        </p>
      </motion.div>
    </div>
  );
}
