import { CardValue, Suit } from '@/common/types';
import cardImages from '@/assets/cards';

export class Card {
  suit: Suit;
  value: CardValue;
  image: string;

  constructor(suit: Suit, value: CardValue) {
    this.suit = suit;
    this.value = value;
    this.image = this.getImage(suit, value);
  }

  private getImage(suit: Suit, value: string): string {
    return cardImages[suit + value];
  }

  isLesser(card: Card) {
    return (this.numericalValue() + 1) ===  card.numericalValue();
  }

  isSameSuit(card: Card) {
    return this.suit === card.suit;
  }

  numericalValue(): number {
    switch(this.value) {
      case 'Ace':
        return 1;

      case 'Jack':
        return 11;

      case 'Queen':
        return 12;

      case 'King':
        return 13;

      default:
        return Number(this.value);
    }
  }
}
