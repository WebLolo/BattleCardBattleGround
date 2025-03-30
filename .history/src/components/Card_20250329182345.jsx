import { useDraggable } from "@dnd-kit/core";
import { motion, useAnimation } from "framer-motion";
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
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `${origin}-${card.id}`,
    data: { source: origin, card },
  });

  const controls = useAnimation();
  const [degatsAffiches, setDegatsAffiches] = useState(null);
  const isAttaquant = phase === "combat" && card.id === carteAttaquantId;
  // 💡 Style inline pour le drag
  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    cursor: "grab",
    zIndex: isDragging || isAttaquant ? 999 : 1, // 👉 ici !
    position: "relative",
  };

  // ✅ Animation d’entrée
  useEffect(() => {
    const timeout = setTimeout(() => setShouldAnimate(false), 1000);
    return () => clearTimeout(timeout);
  }, []);

  // ✅ Animation d’attaque
  useEffect(() => {
    if (phase !== "combat" || card.id !== carteAttaquantId) return;

    const attacker = document.querySelector(`[data-id='${carteAttaquantId}']`);
    const defender = document.querySelector(`[data-id='${carteDefenseurId}']`);
    if (!attacker || !defender) return;

    const aRect = attacker.getBoundingClientRect();
    const dRect = defender.getBoundingClientRect();

    const deltaX = (dRect.left - aRect.left) * 0.6;
    const deltaY = (dRect.top - aRect.top) * 0.6;

    controls.start({
      x: deltaX,
      y: deltaY,
      transition: { duration: 0.4, ease: [0.4, 0.2, 0.8, 1] }, // ⚡ Accéléré
    }).then(() => {
      controls.start({
        x: 0,
        y: 0,
        transition: { duration: 0.25, ease: "easeOut" },
      });
    });
  }, [carteAttaquantId, carteDefenseurId, phase, card.id, controls]);

  // ✅ Dégâts reçus (secouement + popup)
  useEffect(() => {
    if (
      phase === "combat" &&
      card.id === carteDefenseurId &&
      card.degatsRecus > 0
    ) {
      controls.start({
        x: [0, -10, 10, -6, 6, -2, 2, 0],
        transition: { duration: 0.4 },
      });

      setDegatsAffiches(card.degatsRecus);
      setTimeout(() => setDegatsAffiches(null), 600);
    }
  }, [carteDefenseurId, card.degatsRecus, phase, card.id, controls]);

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
    >
      <motion.div
        animate={controls}
        className={`cardfight player content-card ${
          shouldAnimate ? "animate__animated animate__backInLeft" : ""
        }`}
        data-id={card.id}
        data-fullimg={card.img}
        onDoubleClick={() => onPreview?.(card)}
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
    </div>
  );
}
