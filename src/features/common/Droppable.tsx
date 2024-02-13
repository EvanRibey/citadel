import type { JSX } from 'solid-js';
import { createDroppable } from '@thisbeyond/solid-dnd';
import type { DroppableProps } from './types';
import type { Droppable } from '@/common/types';

export function Droppable(props: DroppableProps): JSX.Element {
  // @ts-expect-error: Directive used below
  const droppable = createDroppable(props.id);

  return (
    <div use:droppable>
      {props.children}
    </div>
  );
}
