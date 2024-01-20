import { JSX } from 'solid-js';

export interface DraggableProps {
  children: JSX.Element,
  onDrag: JSX.EventHandlerUnion<HTMLDivElement, DragEvent>,
}

export interface DroppableProps {
  children: JSX.Element,
  isDroppable: boolean,
  onDrop: JSX.EventHandlerUnion<HTMLDivElement, DragEvent>,
  onDragOver: JSX.EventHandlerUnion<HTMLDivElement, DragEvent>,
}
