import { useDraggable } from "@dnd-kit/core";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

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

  const [isAttacking, setIsAttacking] = useState(false);
  const [isHit, setIsHit] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [degatsAffiches, setDegatsAffiches] = useState(null);

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    cursor: "grab",
    zIndex: isAttacking ? 10 : 1,
    position: "relative",
  };

  // Animation attaque + impact
  useEffect(() => {
    if (phase === "combat" && card.id === carteAttaquantId) {
      const attacker = document.querySelector(`[data-id='${carteAttaquantId}']`);
      const defender = document.querySelector(`[data-id='${carteDefenseurId}']`);

      if (attacker && defender) {
        const aRect = attacker.getBoundingClientRect();
        const dRect = defender.getBoundingClientRect();

        const deltaX = (dRect.left - aRect.left) * 0.6;
        const deltaY = (dRect.top - aRect.top) * 0.6;

        setOffset({ x: deltaX, y: deltaY });
        setIsAttacking(true);

        if (card.id === carteDefenseurId) {
          setIsHit(true);
          setTimeout(() => setIsHit(false), 300);
        }

        setTimeout(() => {
          setIsAttacking(false);
          setOffset({ x: 0, y: 0 });
        }, 400);
      }
    }
  }, [carteAttaquantId, carteDefenseurId, phase, card.id]);

  // Affichage des dégâts
  useEffect(() => {
    if (
      phase === "combat" &&
      card.id === carteDefenseurId &&
      card.degatsRecus > 0
    ) {
      setDegatsAffiches(card.degatsRecus);
      setTimeout(() => setDegatsAffiches(null), 600);
    }
  }, [carteDefenseurId, phase, card.id, card.degatsRecus]);

  return (
    <motion.div
    layout
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      data-id={card.id}
      data-fullimg={card.img}
      onDoubleClick={() => onPreview?.(card)}
      className="cardfight player content-card"
      animate={
        isAttacking
          ? { x: offset.x, y: offset.y }
          : isHit
          ? { x: [0, -10, 10, -6, 6, -2, 2, 0] }
          : { x: 0, y: 0 }
      }
      transition={
        isAttacking
          ? { duration: 0.4, ease: [0.2, 0.0, 0.8, 1] }
          : isHit
          ? { duration: 0.4 }
          : { duration: 0.3, ease: "easeOut" }
      }
    >
      <img className="cardimg" src={card.imgMinia} alt={card.nom} />
      <p className="hudIntAtk">{card.atk}</p>
      <p className={`hudIntPv ${phase === "combat" && card.hp < card.baseHp ? "pv-damaged" : ""}`}>
        {card.hp}
      </p>

      {degatsAffiches !== null && (
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.6 }}
          className="degats-popup"
        >
          -{degatsAffiches} PV
        </motion.div>
      )}
    </motion.div>
  );
}
