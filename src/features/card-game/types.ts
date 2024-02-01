import { Accessor, JSX } from 'solid-js';
import type { Api } from '@zag-js/dialog';
import { Card } from '@/common/classes/Card';
import type { Direction, VoidFunction } from '@/common/types';

export interface CardPileProps {
  cards: Card[];
  direction: Direction;
  id: string;
  type: string;
}

export interface CardProps {
  data: Card;
  style?: JSX.CSSProperties;
}

export interface FoundationProps {
  cards: Card[],
  id: string;
  isAnimating?: boolean;
  type: string;
}

export interface PlayAgainModalProps {
  machine: Accessor<Api>;
  onReset: VoidFunction;
}
