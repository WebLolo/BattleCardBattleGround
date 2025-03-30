import { useDraggable } from "@dnd-kit/core";

export default function DraggableCard({ card, origin = "shop" }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `shop-${card.id}`,
    data: {
      source: "shop",
      card,
    },
  });

  const style = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
    cursor: "grab",
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <img src={card.imgMinia} alt={card.name} width={80} />
    </div>
  );
}
