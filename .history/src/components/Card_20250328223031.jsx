import { useDraggable } from "@dnd-kit/core";
export default function Card({ card, origin, index, onPreview }) {
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
        onDoubleClick={() => {
          console.log("Double clic détecté sur", card.nom); // 👈 à voir dans la console
          onPreview?.(card);
        }}
        className="cardfight player content-card animate__animated animate__backInLeft" 
        data-id={ card.id } 
        data-fullimg={ card.img }
    >
        <img className="cardimg" src={ card.imgMinia } alt={ card.nom }/>
        <p className={`hudIntPv ${phase === "combat" && card.hp < card.baseHp ? "pv-damaged" : ""}`}>{ card.atk }</p>
        <p className="hudIntPv">{ card.hp }</p>                    
    </div>

  );
}