import { createMemo, createUniqueId, JSX, mergeProps, Show } from 'solid-js';
import * as tooltip from '@zag-js/tooltip';
import { normalizeProps, useMachine } from '@zag-js/solid';
import { DIRECTION_LTR } from '@/common/constants';
import type { EmptyCardProps } from './types';
import './Card.css';
import { EMPTY_CARD_DEFAULT_PROPS } from './constants';

export function EmptyCard(props: EmptyCardProps): JSX.Element {
  const mergedProps = mergeProps(EMPTY_CARD_DEFAULT_PROPS, props);

  const [state, send] = useMachine(tooltip.machine({
    id: createUniqueId(),
    positioning: {
      placement: mergedProps.direction === DIRECTION_LTR ? 'left' : 'right',
    },
  }));

  const api = createMemo(() => tooltip.connect(state, send, normalizeProps));
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const divProps: any = api().triggerProps;

  return (
    <>
      <div {...divProps} class="card-game-card" style={props.style}>
        <img
          alt={`${mergedProps.data.value} of ${mergedProps.data.suit}`}
          class="card-image"
          src={mergedProps.data.image}
          draggable="false"
        />
      </div>
      <Show when={api().isOpen && mergedProps.showTooltip}>
        <div {...api().positionerProps}>
          <div {...api().contentProps}>
            <div class="card-game-card-tooltip">
              <img class="suit" src={mergedProps.data.suitImage} alt={mergedProps.data.suit} />
              {mergedProps.data.shortValue}
            </div>
          </div>
        </div>
      </Show>
    </>
  );
}
