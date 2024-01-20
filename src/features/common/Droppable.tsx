import { JSX } from 'solid-js';
import { DroppableProps } from './types';

export function Droppable(props: DroppableProps): JSX.Element {
  const handleDrop = () => {
    props.onDrop();
  };

  const handleDragOver = () => {
    props.onDragOver();
  };

  const conditionalDrop = () => props.isDroppable ? handleDrop : undefined;
  const conditionalDragOver = () => props.isDroppable ? handleDragOver : undefined;

  return (
    <div
      onDrop={conditionalDrop}
      onDragOver={conditionalDragOver}
    >
      {props.children}
    </div>
  );
}
