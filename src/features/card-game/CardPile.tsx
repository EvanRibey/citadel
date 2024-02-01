import { For, Show } from 'solid-js';
import { DIRECTION_LTR, DIRECTION_RTL } from '@/common/constants';
import { CardPileProps } from './types';
import { Droppable } from '@/features/common';
import { Card, EmptyCard } from '.';
import './CardPile.css';

export function CardPile(props: CardPileProps) {
  const getOffset = (index: number) => `${index * 20}px`;

  return (
    <Droppable id={props.id} type={props.type}>
      <div class={`card-game-card-pile ${props.direction}`}>
        <For each={props.cards}>
          {(item, index) => (
            <Show
              when={index() === (props.cards.length - 1)}
              fallback={(
                <EmptyCard
                  data={item}
                  style={{
                    left: props.direction === DIRECTION_LTR ? getOffset(index()) : 'auto',
                    right: props.direction === DIRECTION_RTL ? getOffset(index()) : 'auto',
                  }}
                />
              )}
            >
              <Card
                data={item}
                style={{
                  left: props.direction === DIRECTION_LTR ? getOffset(index()) : 'auto',
                  right: props.direction === DIRECTION_RTL ? getOffset(index()) : 'auto',
                }}
              />
            </Show>
          )}
        </For>
      </div>
    </Droppable>
  );
}
