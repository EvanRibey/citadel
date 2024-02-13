import { Setting } from './types';

export const SETTING_BESIEGED_CASTLE = 'besiegedCastle';
export const SETTING_DOUBLECLICK_CARD = 'doubleClickCard';
export const SETTING_FOUNDATION_MOVE = 'foundationMove';
export const SETTING_MOVE_COUNT = 'moveCount';

export const DEFAULT_SETTINGS: Record<string, boolean> = {
  [SETTING_BESIEGED_CASTLE]: false,
  [SETTING_DOUBLECLICK_CARD]: true,
  [SETTING_FOUNDATION_MOVE]: true,
  [SETTING_MOVE_COUNT]: false,
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
  [SETTING_FOUNDATION_MOVE]: {
    name: 'Move From Foundations',
    description: 'Allow movement from foundations to outside card piles',
  },
  [SETTING_MOVE_COUNT]: {
    name: 'Move Count',
    description: 'Show a total count of how many moves made during the game',
  },
};

export const STORAGE_KEY_SETTINGS = 'settingsStorage';
