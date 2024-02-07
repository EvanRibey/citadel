import { createMemo, createUniqueId, JSX, Show } from 'solid-js';
import * as tooltip from '@zag-js/tooltip';
import { normalizeProps, useMachine } from '@zag-js/solid';
import { DIRECTION_LTR } from '@/common/constants';
import type { CardProps } from './types';
import './Card.css';

export function EmptyCard(props: CardProps): JSX.Element {
  const [state, send] = useMachine(tooltip.machine({
    id: createUniqueId(),
    positioning: {
      placement: props.direction === DIRECTION_LTR ? 'left' : 'right',
    },
  }));

  const api = createMemo(() => tooltip.connect(state, send, normalizeProps));
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const divProps: any = api().triggerProps;

  return (
    <>
      <div {...divProps} class="card-game-card" style={props.style}>
        <img
          alt={`${props.data.value} of ${props.data.suit}`}
          class="card-image"
          src={props.data.image}
          draggable="false"
        />
      </div>
      <Show when={api().isOpen}>
        <div {...api().positionerProps}>
          <div {...api().contentProps}>
            <div class="card-game-card-tooltip">
              <img class="suit" src={props.data.suitImage} alt={props.data.suit} />
              {props.data.shortValue}
            </div>
          </div>
        </div>
      </Show>
    </>
  );
}
