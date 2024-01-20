import { JSX } from 'solid-js';
import type { DraggableProps } from './types';

export function Draggable({ onDrag, children }: DraggableProps): JSX.Element {
  return (
    <div draggable onDrag={onDrag}>
      {children}
    </div>
  );
}
