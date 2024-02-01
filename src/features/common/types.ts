import { JSX } from 'solid-js';

export interface DraggableProps {
  class?: string;
  children: JSX.Element;
  id: string;
}

export interface DroppableProps {
  children: JSX.Element;
  id: string;
  type: string;
}
