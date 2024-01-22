import { JSX } from 'solid-js';
import { Card } from '@/common/classes/Card';
import type { Direction, VoidFunction } from '@/common/types';

export interface CardPileProps {
  cards: Card[];
  direction: Direction;
  onDragStart: (arg0: Card) => VoidFunction;
  onDragEnd: VoidFunction;
}

export interface CardProps {
  data: Card;
  isDraggable: boolean;
  onDragStart: VoidFunction;
  onDragEnd: VoidFunction;
  style?: JSX.CSSProperties;
}

export interface FoundationProps {
  cards: Card[],
  onDragStart: (arg0: Card) => VoidFunction,
  onDragEnd: VoidFunction,
}
