import { JSX } from 'solid-js';
import { DroppableProps } from './types';

export function Droppable(props: DroppableProps): JSX.Element {
  const handleDrop = () => props.isDroppable ? props.onDrop : undefined;
  const handleDragOver = () => props.isDroppable ? props.onDragOver : undefined;

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {props.children}
    </div>
  );
}
