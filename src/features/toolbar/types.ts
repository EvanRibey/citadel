import type { Api as DialogApi } from '@zag-js/dialog';
import type { Api as PopoverApi } from '@zag-js/popover';
import type { Accessor, JSX } from 'solid-js';
import type { Setting } from '@/features/settings/types';

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

export interface RedealProviderProps {
  shouldRedeal: boolean;
  children: JSX.Element;
}

export interface RedealerProvider {
  shouldRedeal: Accessor<boolean> | (() => boolean);
  willRedeal: VoidFunction; 
  willNotRedeal: VoidFunction;
}

export interface StatisticsDisplayProps {
  isVisible: boolean;
}
