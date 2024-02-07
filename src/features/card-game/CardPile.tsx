import { For, Show } from 'solid-js';
import { DIRECTION_LTR, DIRECTION_RTL } from '@/common/constants';
import { Droppable } from '@/features/common';
import { Card as CardClass } from '@/common/classes/Card';
import { Card, EmptyCard } from '.';
import type { CardPileProps } from './types';
import './CardPile.css';

export function CardPile(props: CardPileProps) {
  const getOffset = (index: number) => `${index * 20}px`;

  const doubleClickCardHandler = (card: CardClass) => {
    if (!props.onDoubleClick) return undefined;
    return props.onDoubleClick(card);
  };

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
                  direction={props.direction}
                />
              )}
            >
              <Card
                data={item}
                onDoubleClick={doubleClickCardHandler(item)}
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
