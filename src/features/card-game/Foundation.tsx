import { For, Show, createEffect, createSignal } from 'solid-js';
import { Droppable } from '@/features/common';
import type { FoundationProps } from './types';
import { Card, EmptyCard } from '.';
import './Foundation.css';
import { useSettings } from '../settings';
import { SETTING_FOUNDATION_MOVE } from '../settings/constants';

export function Foundation(props: FoundationProps) {
  const { isModuleEnabled } = useSettings();
  const [isFoundationMoveEnabled, setIsFoundationMoveEnabled] = createSignal<boolean>(isModuleEnabled(SETTING_FOUNDATION_MOVE));

  createEffect(() => {
    setIsFoundationMoveEnabled(isModuleEnabled(SETTING_FOUNDATION_MOVE));
  });

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
