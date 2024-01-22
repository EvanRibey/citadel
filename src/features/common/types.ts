import { JSX } from 'solid-js';
import { VoidFunction } from '@/common/types';

export interface DraggableProps {
  children: JSX.Element;
  isDraggable: boolean;
  onDragStart?: VoidFunction;
  onDragEnd?: VoidFunction;
}

export interface DroppableProps {
  children: JSX.Element;
  isDroppable?: boolean;
  onDragOver?: VoidFunction;
  onDrop?: VoidFunction;
}
