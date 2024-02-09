import { For, Show } from 'solid-js';
import { Droppable } from '@/features/common';
import { SETTING_FOUNDATION_MOVE } from '@/features/settings/constants';
import { isSettingEnabled } from '@/features/settings/utils';
import type { FoundationProps } from './types';
import { Card, EmptyCard } from '.';
import './Foundation.css';

export function Foundation(props: FoundationProps) {
  const isFoundationMoveEnabled = isSettingEnabled(SETTING_FOUNDATION_MOVE);

  return (
    <Droppable id={props.id} type={props.type}>
      <div class={`card-game-foundation ${props.isAnimating ? 'animate' : ''}`}>
        <For each={props.cards}>
          {(item, index) => (
            <Show
              when={isFoundationMoveEnabled() && index() !== 0}
              fallback={(
                <EmptyCard
                  data={item}
                  showTooltip={false}
                />
              )}
            >
              <Card
                data={item}
              />
            </Show>
          )}
        </For>
      </div>
    </Droppable>
  );
}
