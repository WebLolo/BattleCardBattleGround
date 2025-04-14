import '@/styles/PlayerBoard.css';
import Card from '@/components/Card';
import {
  SortableContext,
  useSortable,
  arrayMove,
  rectSortingStrategy
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function SortableCardWrapper({ card, index, origin, onPreview, phase, carteAttaquantId, carteDefenseurId }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: card.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: "none",
  };

  return (
    <div
      id={`board-${card.id}`} // 👈 très important !
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <Card
        card={card}
        origin={origin}
        index={index}
        onPreview={onPreview}
        phase={phase}
        carteAttaquantId={carteAttaquantId}
        carteDefenseurId={carteDefenseurId}
      />
    </div>
  );
}

export default function PlayerBoard({ cards, origin, onPreview, phase, carteAttaquantId, carteDefenseurId }) {
  return (
    <div className="playerBoard">
      <SortableContext items={cards.map((card) => card.id)} strategy={rectSortingStrategy}>
        {cards.map((card, index) => (
          <SortableCardWrapper
            key={card.id}
            card={card}
            index={index}
            origin={origin}
            onPreview={onPreview}
            phase={phase}
            carteAttaquantId={carteAttaquantId}
            carteDefenseurId={carteDefenseurId}
          />
        ))}
      </SortableContext>
    </div>
  );
}
