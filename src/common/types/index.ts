export type VoidFunction = () => void;
export type Direction = 'rtl' | 'ltr';

export type Suit = 'diamonds' | 'hearts' | 'spades' | 'clubs';
export type CardValue = 'Ace' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'Jack' | 'Queen' | 'King';

export interface Card {
  value: CardValue,
  suit: Suit,
  image?: string,
}
