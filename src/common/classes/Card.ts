import type { CardValue, Suit } from '@/common/types';
import cardImages from '@/assets/cards';
import darkCardImages from '@/assets/different-cards';
import {
  clubs,
  clubsDark,
  diamonds,
  diamondsDark,
  hearts,
  heartsDark,
  spades,
  spadesDark,
} from '@/assets/icons';

export class Card {
  id: string;
  suit: Suit;
  value: CardValue;
  shortValue: string;
  image: string;
  imageDark: string;
  suitImage: string;
  suitImageDark: string;

  constructor(suit: Suit, value: CardValue) {
    this.id = `${suit}${value}`;
    this.suit = suit;
    this.value = value;
    this.shortValue = this.getShortValue(value);
    this.image = this.getImage(suit, value);
    this.imageDark = this.getDarkImage(suit, value);
    this.suitImage = this.getSuitImage(suit);
    this.suitImageDark = this.getDarkSuitImage(suit);
  }

  private getImage(suit: Suit, value: string): string {
    return cardImages[suit + value];
  }

  private getDarkImage(suit: Suit, value: CardValue) {
    return darkCardImages[suit + value] || cardImages[suit + value];
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

  private getDarkSuitImage(suit: Suit): string {
    switch (suit) {
      case 'clubs':
        return clubsDark;
      case 'spades':
        return spadesDark;
      case 'hearts':
        return heartsDark;
      case 'diamonds':
        return diamondsDark;
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
