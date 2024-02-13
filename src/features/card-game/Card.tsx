import type { JSX } from 'solid-js';
import { createDraggable } from '@thisbeyond/solid-dnd';
import type { CardProps } from './types';
import './Card.css';

export function Card(props: CardProps): JSX.Element {
  // @ts-expect-error: Directive used below
  const draggable = createDraggable(props.data.id);

  const doubleClickHandler = () => {
    props.onDoubleClick && props.onDoubleClick();
  };

  return (
    <div
      use:draggable
      class="card-game-card"
      onDblClick={doubleClickHandler}
      style={props.style}
    >
      <img
        alt={`${props.data.value} of ${props.data.suit}`}
        class="card-image"
        src={props.data.image}
        draggable="false"
      />
    </div>
  );
}
