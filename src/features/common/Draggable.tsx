import { JSX } from 'solid-js';
import type { DraggableProps } from './types';

export function Draggable(props: DraggableProps): JSX.Element {
  return (
    <div draggable onDrag={props.onDrag}>
      {props.children}
    </div>
  );
}
