import { useDraggable } from "@dnd-kit/core";
export default function Card({ card, origin, index }) {
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
        className="cardfight player content-card animate__animated animate__backInLeft" 
        data-id={ card.id } 
        data-fullimg={ card.img }
    >
        <img className="cardimg" src={ card.imgMinia } alt={ card.nom }/>
        <p className="hudIntAtk">{ card.atk }</p>
        <p className="hudIntPv">{ card.hp }</p>                    
    </div>

  );
}