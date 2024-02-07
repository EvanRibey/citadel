import { Api as DialogApi } from '@zag-js/dialog';
import { Api as PopoverApi } from '@zag-js/popover';
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

export interface IconButtonProps {
  ariaLabel: string;
  attributes?: JSX.HTMLAttributes<HTMLButtonElement>;
  icon: string;
  iconAlt: string;
  onClick?: VoidFunction;
}

export interface ModalProps {
  children: JSX.Element;
  machine: Accessor<DialogApi>;
  showClose?: boolean;
}

export interface PopoverProps {
  children: JSX.Element;
  machine: Accessor<PopoverApi>;
}
