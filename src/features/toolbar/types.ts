import { Api as DialogApi } from '@zag-js/dialog';
import { Api as PopoverApi } from '@zag-js/popover';
import { Accessor, JSX } from 'solid-js';

export interface HowToPlayModalProps {
  machine: Accessor<DialogApi>;
}

export interface HowToPlayButtonProps {
  onClick: VoidFunction;
}

export interface RestartButtonProps {
  attributes: JSX.HTMLAttributes<HTMLButtonElement>;
}

export interface RestartPopoverProps {
  machine: Accessor<PopoverApi>;
  onRestart: VoidFunction;
}
