import type { JSX } from 'solid-js';
import { createDraggable } from '@thisbeyond/solid-dnd';
import type { Draggable } from '@/common/types';
import type { DraggableProps } from './types';

export function Draggable(props: DraggableProps): JSX.Element {
  // @ts-expect-error: Directive used below
  const draggable = createDraggable(props.id);

  return (
    <div use:draggable class={props.class}>
      {props.children}
    </div>
  );
}
