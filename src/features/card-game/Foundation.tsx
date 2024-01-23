import { For } from 'solid-js';
import { FoundationProps } from './types';
import { Card } from '.';
import './Foundation.css';

export function Foundation(props: FoundationProps) {
  return (
    <div class="card-game-foundation">
      <For each={props.cards}>
        {item => (
          <Card
            data={item}
            isDraggable={item.value !== 'Ace'}
            onDragEnd={props.onDragEnd}
            onDragStart={props.onDragStart(item)}
          />
        )}
      </For>
    </div>
  );
}
