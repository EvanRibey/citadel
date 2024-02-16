import type { Api as DialogApi } from '@zag-js/dialog';
import type { Api as PopoverApi } from '@zag-js/popover';
import type { Api as SwitchApi } from '@zag-js/switch';
import type { Api as TooltipApi } from '@zag-js/tooltip';
import type { Accessor, JSX } from 'solid-js';

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

export interface SwitchProps {
  ariaLabel: string;
  machine: Accessor<SwitchApi>;
}

export interface TooltipProps {
  children: JSX.Element;
  isVisible: boolean;
  machine: Accessor<TooltipApi>;
}
