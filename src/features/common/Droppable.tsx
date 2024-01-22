import { JSX } from 'solid-js';
import { DroppableProps } from './types';

export function Droppable(props: DroppableProps): JSX.Element {
  const handleDrop = (event: DragEvent) => {
    event.preventDefault();
    props.isDroppable && props.onDrop && props.onDrop();
  };

  const handleDragOver = (event: DragEvent) => {
    event.preventDefault();
    props.isDroppable && props.onDragOver && props.onDragOver();
  };

  const handleDragEnd = (event: DragEvent) => {event.preventDefault();};

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      {props.children}
    </div>
  );
}
