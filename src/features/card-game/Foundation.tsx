import { For } from 'solid-js';
import { Droppable } from '@/features/common';
import { FoundationProps } from './types';
import { Card } from '.';
import './Foundation.css';

export function Foundation(props: FoundationProps) {
  return (
    <Droppable id={props.id} type={props.type}>
      <div class={`card-game-foundation ${props.isAnimating ? 'animate' : ''}`}>
        <For each={props.cards}>
          {item => (
            <Card
              data={item}
            />
          )}
        </For>
      </div>
    </Droppable>
  );
}
