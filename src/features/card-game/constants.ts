import type { EmptyCardProps } from './types';

export const DROPPABLE_TYPE_CARDPILE = 'cardPile';
export const DROPPABLE_TYPE_FOUNDATION = 'foundation';

export const CARD_PILE_1 = 'pile1';
export const CARD_PILE_2 = 'pile2';
export const CARD_PILE_3 = 'pile3';
export const CARD_PILE_4 = 'pile4';
export const CARD_PILE_5 = 'pile5';
export const CARD_PILE_6 = 'pile6';
export const CARD_PILE_7 = 'pile7';
export const CARD_PILE_8 = 'pile8';
export const FOUNDATION_PILE_1 = 'foundation1';
export const FOUNDATION_PILE_2 = 'foundation2';
export const FOUNDATION_PILE_3 = 'foundation3';
export const FOUNDATION_PILE_4 = 'foundation4';

export const FOUNDATION_PILES = [
  FOUNDATION_PILE_1,
  FOUNDATION_PILE_2,
  FOUNDATION_PILE_3,
  FOUNDATION_PILE_4,
];

export const VICTORY_ANIMATION_DELAY = 100;
export const VICTORY_ANIMATION_REMOVAL_TIME = 800;

export const WINNING_PILE_LENGTH = 13;

export const EMPTY_CARD_DEFAULT_PROPS: Partial<EmptyCardProps> = {
  showTooltip: true,
};
