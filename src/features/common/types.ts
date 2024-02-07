import { Api } from '@zag-js/dialog';
import { Accessor, JSX } from 'solid-js';

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

export interface ModalProps {
  machine: Accessor<Api>;
  children: JSX.Element;
  showClose?: boolean;
}
