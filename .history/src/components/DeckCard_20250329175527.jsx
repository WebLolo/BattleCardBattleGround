import { useDraggable } from "@dnd-kit/core";
export default function DeckCard({ card, origin, index, onPreview }) {
        const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
            id: `${origin}-${card.id}`,
            data: { source: origin, card },
          });
        
          const style = {
            transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
            cursor: "grab",
            zIndex: isDragging ? 999 : 1,
          };
    return (
        
        <div         
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes} 
            id={ card.id }
            onDoubleClick={() => {
                console.log("Double clic détecté sur", card.nom); // 👈 à voir dans la console
                onPreview?.(card);
              }}
            className={`cardInDeck${index} text-white`} 
            data-fullimg={ card.img }
        >
            <img className="fullCard" data-id={ card.id }  src={ card.img } alt={ card.nom }/>
        </div>
    );
}



