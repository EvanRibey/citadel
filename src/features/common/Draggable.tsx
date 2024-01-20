import { JSX } from 'solid-js';
import type { DraggableProps } from './types';

export function Draggable(props: DraggableProps): JSX.Element {
  const handleDrop = () => {
    props.onDrag();
  };

  return (
    <div draggable onDrag={handleDrop}>
      {props.children}
    </div>
  );
}
