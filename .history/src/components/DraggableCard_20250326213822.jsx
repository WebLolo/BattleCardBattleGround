import { useDraggable } from "@dnd-kit/core";

export default function DraggableCard({ card, origin }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `${origin}-${card.id}`,
    data: {
      source: origin,
      card,
    },
  });

  const style = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
    cursor: "grab",
  };

  // 👇 On utilise l'image complète dans le deck, sinon la miniature
  const imageSrc = origin === "deck" ? card.img : card.imgMinia;

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <img src={imageSrc} alt={card.nom} width={80} />
    </div>
  );
}
