import { Api as DialogApi } from '@zag-js/dialog';
import { Api as PopoverApi } from '@zag-js/popover';
import { Accessor } from 'solid-js';
import { Setting } from '@/app/types';

export interface HowToPlayModalProps {
  machine: Accessor<DialogApi>;
}

export interface RestartPopoverProps {
  machine: Accessor<PopoverApi>;
  onRestart: VoidFunction;
}

export interface SettingsPopoverProps {
  machine: Accessor<PopoverApi>;
}

export interface SettingSwitchProps {
  setting: Setting;
  onSwitch: (arg0: string, arg1: boolean) => void;
}
