// src/components/DropZone.jsx
import { useDroppable } from "@dnd-kit/core";

export default function DropZone({ id, onDrop, children, className = "" }) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`${className} drop-zone ${isOver ? "over" : ""}`}
      style={{
        border: isOver ? "2px dashed limegreen" : "2px dashed transparent",
        padding: "20px",
        minHeight: "100px",
        transition: "0.2s",
      }}
    >
      {children}
    </div>
  );
}
