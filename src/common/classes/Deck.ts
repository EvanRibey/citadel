import { Card } from './Card';
import type { CardValue, Suit } from '@/common/types';

const suits = ['hearts', 'diamonds', 'spades', 'clubs'] as Suit[];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'] as CardValue[];

export class Deck {
  private cards: Card[];

  constructor() {
    this.cards = suits.flatMap((suit) => {
      return values.map(value => new Card(suit, value));
    });
  }

  shuffle() {
    let currentIndex = this.cards.length;
    let randomIndex;

    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [this.cards[currentIndex], this.cards[randomIndex]] =
        [this.cards[randomIndex], this.cards[currentIndex]];
    }
  }

  deal() {
    return this.cards.pop();
  }

  length() {
    return this.cards.length;
  }
}
