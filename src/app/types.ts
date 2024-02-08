import { Accessor, JSX } from 'solid-js';

export interface RedealProviderProps {
  shouldRedeal: boolean;
  children: JSX.Element;
}

export interface RedealerProvider {
  shouldRedeal: Accessor<boolean> | (() => boolean);
  willRedeal: VoidFunction; 
  willNotRedeal: VoidFunction;
}

export interface Setting {
  module: string;
  enabled: boolean;
  name?: string;
  description?: string;
}

export interface SettingsProviderProps {
  children: JSX.Element;
}

export interface SettingsProvider {
  settings: () => Setting[];
  enableSetting: ((arg0: string) => void) | VoidFunction;
  disableSetting: ((arg0: string) => void) | VoidFunction;
  isModuleEnabled: ((arg0: string) => boolean) | (() => boolean);
}
