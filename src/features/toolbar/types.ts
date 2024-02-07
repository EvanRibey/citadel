import { Api as DialogApi } from '@zag-js/dialog';
import { Api as PopoverApi } from '@zag-js/popover';
import { Accessor } from 'solid-js';

export interface HowToPlayModalProps {
  machine: Accessor<DialogApi>;
}

export interface RestartPopoverProps {
  machine: Accessor<PopoverApi>;
  onRestart: VoidFunction;
}
