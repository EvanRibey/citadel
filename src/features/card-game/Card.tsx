import type { JSX } from 'solid-js';
import { createDraggable } from '@thisbeyond/solid-dnd';
import { isSettingEnabled } from '@/features/settings/utils';
import { SETTING_DARK_MODE } from '@/features/settings/constants';
import type { CardProps } from './types';
import './Card.css';

export function Card(props: CardProps): JSX.Element {
  // @ts-expect-error: Directive used below
  const draggable = createDraggable(props.data.id);
  const isDarkModeEnabled = isSettingEnabled(SETTING_DARK_MODE);

  const doubleClickHandler = () => {
    props.onDoubleClick && props.onDoubleClick();
  };

  return (
    <div
      use:draggable
      class="card-game-card"
      onDblClick={doubleClickHandler}
      style={props.style}
    >
      <img
        alt={`${props.data.value} of ${props.data.suit}`}
        class="card-image"
        src={isDarkModeEnabled() ? props.data.imageDark : props.data.image}
        draggable="false"
      />
    </div>
  );
}
