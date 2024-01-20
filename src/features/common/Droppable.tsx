import { JSX } from 'solid-js';
import { DroppableProps } from './types';

export function Droppable({
  children,
  isDroppable,
  onDrop,
  onDragOver,
}: DroppableProps): JSX.Element {
  return (
    <div
      onDrop={isDroppable ? onDrop : undefined}
      onDragOver={isDroppable ? onDragOver: undefined}
    >
      {children}
    </div>
  );
}
