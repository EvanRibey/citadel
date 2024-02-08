import { Accessor, JSX } from 'solid-js';

export interface RedealProviderProps {
  shouldRedeal: boolean;
  children: JSX.Element;
}

export interface RedealerProvider {
  shouldRedeal: Accessor<boolean>;
  willRedeal: VoidFunction; 
  willNotRedeal: VoidFunction;
}

export interface Setting {
  module: string;
  enabled: boolean;
}

export interface SettingsProviderProps {
  children: JSX.Element;
}

export interface SettingsProvider {
  settings: Setting[];
  enableSetting: (arg0: string) => void;
  disableSetting: (arg0: string) => void;
}
