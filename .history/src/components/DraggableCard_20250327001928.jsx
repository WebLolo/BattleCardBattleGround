import { useDraggable } from "@dnd-kit/core";

export default function DraggableCard({ card, origin, setPreviewCard }) {
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
      onDoubleClick={() => onPreview?.(card)}
    >
      <img src={card.imgMinia} alt={card.nom} width={80} />
    </div>
  );
}
