import { useEffect, useLayoutEffect, useRef, useState } from "react";
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

  const ref = useRef(null);
  const [isAttacking, setIsAttacking] = useState(false);
  const [attackCoords, setAttackCoords] = useState({ x: 0, y: 0 });

  useLayoutEffect(() => {
    if (phase === "combat" && card.id === carteAttaquantId) {
      const attacker = ref.current;
      const defender = document.querySelector(`[data-id="${carteDefenseurId}"]`);

      if (attacker && defender) {
        const attackerRect = attacker.getBoundingClientRect();
        const defenderRect = defender.getBoundingClientRect();

        const deltaX = defenderRect.left - attackerRect.left;
        const deltaY = defenderRect.top - attackerRect.top;

        setAttackCoords({ x: deltaX, y: deltaY });
        setIsAttacking(true);

        const timeout = setTimeout(() => {
          setIsAttacking(false);
          setAttackCoords({ x: 0, y: 0 });
        }, 300);

        return () => clearTimeout(timeout);
      }
    }
  }, [carteAttaquantId, carteDefenseurId, phase, card.id]);

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
        ref={ref}
        className="card-inner"
        animate={
          isAttacking
            ? {
                x: attackCoords.x,
                y: attackCoords.y,

                zIndex: 10,
              }
            : {
                x: 0,
                y: 0,

                zIndex: 1,
              }
        }
        transition={{ duration: 0.3, type: "spring", bounce: 0.3 }}
      >
        <img className="cardimg" src={card.imgMinia} alt={card.nom} />
        <div className="hudIntAtk">{card.atk}</div>
        <div
          className={`hudIntPv ${
            phase === "combat" && card.hp < card.baseHp ? "pv-damaged" : ""
          }`}
        >
          {card.hp}
        </div>
      </motion.div>
    </div>
  );
}
