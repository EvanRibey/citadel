import { JSX } from 'solid-js';
import { Card } from '@/common/classes/Card';
import type { Direction } from '@/common/types';

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
  type: string;
}
