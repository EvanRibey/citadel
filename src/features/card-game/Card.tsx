import { JSX } from 'solid-js';
import { Draggable } from '@/features/common';
import type { CardProps } from './types';
import './Card.css';

export function Card(props: CardProps): JSX.Element {
  return (
    <Draggable
      isDraggable={props.isDraggable}
      onDragStart={props.onDragStart}
      onDragEnd={props.onDragEnd}
    >
      <div class="card-game-card" style={props.style}>
        <img
          alt={`${props.data.value} of ${props.data.suit}`}
          class="card-image"
          src={props.data.image}
          draggable="false"
        />
      </div>
    </Draggable>
  );
}
