import { Setting } from './types';

export const SETTING_BESIEGED_CASTLE = 'besiegedCastle';
export const SETTING_DOUBLECLICK_CARD = 'doubleClickCard';

export const DEFAULT_SETTINGS: Record<string, boolean> = {
  [SETTING_BESIEGED_CASTLE]: false,
  [SETTING_DOUBLECLICK_CARD]: true,
};

export const SETTING_DESCRIPTORS: Record<string, Partial<Setting>> = {
  [SETTING_BESIEGED_CASTLE]: {
    name: 'Besieged Castle',
    description: 'Cards are not placed on foundations during the deal',
  },
  [SETTING_DOUBLECLICK_CARD]: {
    name: 'Double Click',
    description: 'Clicking a card twice will move it to the foundation (if it can)',
  },
};

export const STORAGE_KEY_SETTINGS = 'settingsStorage';
