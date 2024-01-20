import { JSX } from 'solid-js';
import { DroppableProps } from './types';

export function Droppable(props: DroppableProps): JSX.Element {
  return (
    <div
      onDrop={props.isDroppable ? props.onDrop : undefined}
      onDragOver={props.isDroppable ? props.onDragOver: undefined}
    >
      {props.children}
    </div>
  );
}
