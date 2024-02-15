import type { Accessor, JSX } from 'solid-js';

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

export interface StatisticsProviderProps {
  children: JSX.Element;
}

export interface StatisticsProvider {
  moveCount: Accessor<number> | (() => number);
  gameTimer: Accessor<number> | (() => number);
  addMove: VoidFunction;
  resetGameTimer: VoidFunction;
  resetMoveCount: VoidFunction;
  startGameTimer: VoidFunction;
  stopGameTimer: VoidFunction;
}

export interface DealerProviderProps {
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
