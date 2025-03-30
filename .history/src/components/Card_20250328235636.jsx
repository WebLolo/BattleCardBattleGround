import { useDraggable } from "@dnd-kit/core";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
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

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    cursor: "grab",
  };

  const [isAttacking, setIsAttacking] = useState(false);

  useEffect(() => {
    if (phase === "combat" && card.id === carteAttaquantId) {
      setIsAttacking(true);
      const timeout = setTimeout(() => setIsAttacking(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [carteAttaquantId, phase, card.id]);

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onDoubleClick={() => onPreview?.(card)}
      className="cardfight player content-card animate__animated animate__backInLeft"
      data-id={card.id}
      data-fullimg={card.img}
    >
      <motion.div
        animate={
          isAttacking
            ? {
                x: origin === "board" ? 50 : -50,
                y: -20,
                scale: 1.2,
                zIndex: 10,
                boxShadow: "0 0 12px rgba(255, 0, 0, 0.7)",
              }
            : {
                x: 0,
                y: 0,
                scale: 1,
                zIndex: 1,
                boxShadow:
                  phase === "combat" && card.id === carteDefenseurId
                    ? "0 0 8px rgba(255,255,0,0.5)"
                    : "none",
              }
        }
        transition={{ duration: 0.3, type: "spring", bounce: 0.3 }}
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
