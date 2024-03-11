import { createUniqueId } from 'solid-js';
import type { JSX } from 'solid-js';
import { createDraggable } from '@thisbeyond/solid-dnd';
import { SETTING_DARK_MODE } from '@/features/settings/constants';
import { useSettings } from '@/features/settings';
import type { CardProps } from './types';
import './Card.css';

export function Card(props: CardProps): JSX.Element {
  const { isModuleEnabled } = useSettings();

  // @ts-expect-error: Directive used below
  const draggable = createDraggable(createUniqueId(), props.data);
  const isDarkModeEnabled = isModuleEnabled(SETTING_DARK_MODE);

  const doubleClickHandler = () => {
    props.onDoubleClick && props.onDoubleClick(props.data);
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
