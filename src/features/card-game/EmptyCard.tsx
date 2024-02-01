import { JSX } from 'solid-js';
import type { CardProps } from './types';
import './Card.css';

export function EmptyCard(props: CardProps): JSX.Element {
  return (
    <div class="card-game-card" style={props.style}>
      <img
        alt={`${props.data.value} of ${props.data.suit}`}
        class="card-image"
        src={props.data.image}
        draggable="false"
      />
    </div>
  );
}
