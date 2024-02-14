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

export interface DealerProviderProps {
  shouldRedeal: boolean;
  shouldUndo: boolean;
  children: JSX.Element;
}

export interface DealerProvider {
  shouldRedeal: Accessor<boolean> | (() => boolean);
  shouldUndo: Accessor<boolean> | (() => boolean);
  willRedeal: VoidFunction; 
  clearRedeal: VoidFunction;
  willUndo: VoidFunction;
  clearUndo: VoidFunction;
}

export interface StatisticsDisplayProps {
  isVisible: boolean;
}
