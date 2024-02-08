import { Setting } from './types';

export const SETTING_NAME_BESIEGED_CASTLE = 'besiegedCastle';
export const SETTING_NAME_DOUBLECLICK_CARD = 'doubleClickCard';

export const DEFAULT_SETTINGS: Setting[] = [
  {
    module: SETTING_NAME_BESIEGED_CASTLE,
    enabled: false,
  },
  {
    module: SETTING_NAME_DOUBLECLICK_CARD,
    enabled: true,
  },
];

export const SETTING_DESCRIPTORS: Record<string, Partial<Setting>> = {
  [SETTING_NAME_BESIEGED_CASTLE]: {
    name: 'Besieged Castle',
    description: 'Cards are not placed on foundations during the deal',
  },
  [SETTING_NAME_DOUBLECLICK_CARD]: {
    name: 'Double Click',
    description: 'Clicking a card twice will move it to the foundation (if it can)',
  },
};

export const STORAGE_KEY_SETTINGS = 'settingsStorage';
