import type { JSX} from 'solid-js';
import { createMemo, createUniqueId, mergeProps } from 'solid-js';
import * as tooltip from '@zag-js/tooltip';
import { normalizeProps, useMachine } from '@zag-js/solid';
import { DIRECTION_LTR } from '@/common/constants';
import { useSettings } from '@/features/settings';
import { SETTING_DARK_MODE } from '@/features/settings/constants';
import { Tooltip } from '@/features/common';
import type { EmptyCardProps } from './types';
import './Card.css';
import { EMPTY_CARD_DEFAULT_PROPS } from './constants';

export function EmptyCard(props: EmptyCardProps): JSX.Element {
  const mergedProps = mergeProps(EMPTY_CARD_DEFAULT_PROPS, props);

  const { isModuleEnabled } = useSettings();
  const isDarkModeEnabled = isModuleEnabled(SETTING_DARK_MODE);

  const [state, send] = useMachine(tooltip.machine({
    id: createUniqueId(),
    closeDelay: 100,
    openDelay: 300,
    positioning: {
      placement: mergedProps.direction === DIRECTION_LTR ? 'left' : 'right',
    },
  }));

  const api = createMemo(() => tooltip.connect(state, send, normalizeProps));
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const divProps: any = () => api().triggerProps;

  return (
    <>
      <div {...divProps()} class="card-game-card" style={props.style}>
        <img
          alt={`${mergedProps.data.value} of ${mergedProps.data.suit}`}
          class="card-image"
          src={isDarkModeEnabled() ? props.data.imageDark : props.data.image}
          draggable="false"
        />
      </div>
      <Tooltip isVisible={Boolean(api().isOpen && mergedProps.showTooltip)} machine={api}>
        <div class="card-game-card-tooltip">
          <img class="suit" src={isDarkModeEnabled() ? mergedProps.data.suitImageDark : mergedProps.data.suitImage} alt={mergedProps.data.suit} />
          {mergedProps.data.shortValue}
        </div>
      </Tooltip>
    </>
  );
}
