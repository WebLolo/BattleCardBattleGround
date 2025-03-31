import { useDroppable } from "@dnd-kit/core";

export default function DropZone({ id, children, className = "", style = {} }) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={className}
      style={{
        border: isOver ? "2px dashed #8ef" : "2px dashed transparent",
        transition: "border 0.2s",
        minHeight: "80px",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
