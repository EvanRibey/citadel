import { JSX } from 'solid-js';
import type { DraggableProps } from './types';

export function Draggable(props: DraggableProps): JSX.Element {
  const handleDragStart = () => {
    props.onDragStart && props.onDragStart();
  };

  const handleDragEnd = () => {
    props.onDragEnd && props.onDragEnd();
  };

  return (
    <div
      draggable={props.isDraggable}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {props.children}
    </div>
  );
}
