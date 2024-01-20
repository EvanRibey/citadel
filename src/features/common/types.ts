import { JSX } from 'solid-js';
import { VoidFunction } from '@/common/types/types';

export interface DraggableProps {
  children: JSX.Element,
  onDrag: VoidFunction,
}

export interface DroppableProps {
  children: JSX.Element,
  isDroppable: boolean,
  onDrop: VoidFunction,
  onDragOver: VoidFunction,
}
