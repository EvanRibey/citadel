import type { Accessor, JSX } from 'solid-js';
import type { Api } from '@zag-js/dialog';
import type { Card } from '@/common/classes/Card';
import type { Direction } from '@/common/types';

export interface CardPileProps {
  cards: Card[];
  direction: Direction;
  id: string;
  onDoubleClick?: (arg0: Card) => void;
  type: string;
}

export interface CardProps {
  data: Card;
  onDoubleClick?: (argo: Card) => void;
  style?: JSX.CSSProperties;
  direction?: string;
}

export interface EmptyCardProps extends CardProps {
  showTooltip?: boolean;
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
