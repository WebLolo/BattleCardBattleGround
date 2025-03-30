import { useDraggable } from "@dnd-kit/core";
export default function DeckCard({ card, origin, index }) {
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
            id={ card.id } 
            className={`cardInDeck${index} text-white`} 
            data-fullimg={ card.img }
        >
            <img className="fullCard" data-id={ card.id }  src={ card.img } alt={ card.nom }/>
        </div>
    );
}



