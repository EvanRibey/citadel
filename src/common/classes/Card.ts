import { CardValue, Suit } from '@/common/types';
import cardImages from '@/assets/cards';
import { clubs, diamonds, hearts, spades } from '@/assets/icons';

export class Card {
  id: string;
  suit: Suit;
  value: CardValue;
  shortValue: string;
  image: string;
  suitImage: string;

  constructor(suit: Suit, value: CardValue) {
    this.id = `${suit}${value}`;
    this.suit = suit;
    this.value = value;
    this.shortValue = this.getShortValue(value);
    this.image = this.getImage(suit, value);
    this.suitImage = this.getSuitImage(suit);
  }

  private getImage(suit: Suit, value: string): string {
    return cardImages[suit + value];
  }

  private getSuitImage(suit: Suit): string {
    switch (suit) {
      case 'clubs':
        return clubs;
      case 'spades':
        return spades;
      case 'hearts':
        return hearts;
      case 'diamonds':
        return diamonds;
    }
  }

  private getShortValue(value: CardValue): string {
    switch (value) {
      case '10':
        return '10';
      case 'Jack':
        return 'J';
      case 'Queen':
        return 'Q';
      case 'King':
        return 'K';
      case 'Ace':
        return 'A';
      default:
        return value;
    }
  }

  isOneLesser(card: Card) {
    return (this.numericalValue() + 1) === card.numericalValue();
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
