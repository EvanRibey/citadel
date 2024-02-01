import { Accessor, Setter, createEffect, createSignal } from 'solid-js';
import { DragDropProvider, DragDropSensors, DragEventHandler } from '@thisbeyond/solid-dnd';
import { DIRECTION_LTR, DIRECTION_RTL } from '@/common/constants';
import { Card } from '@/common/classes/Card';
import { Deck } from '@/common/classes/Deck';
import { CardPile, Foundation } from '.';
import {
  DROPPABLE_TYPE_CARDPILE,
  DROPPABLE_TYPE_FOUNDATION,
  CARD_PILE_1,
  CARD_PILE_2,
  CARD_PILE_3,
  CARD_PILE_4,
  CARD_PILE_5,
  CARD_PILE_6,
  CARD_PILE_7,
  CARD_PILE_8,
  FOUNDATION_PILE_1,
  FOUNDATION_PILE_2,
  FOUNDATION_PILE_3,
  FOUNDATION_PILE_4,
  FOUNDATION_PILES,
  VICTORY_ANIMATION_REMOVAL_TIME,
  VICTORY_ANIMATION_DELAY,
  WINNING_PILE_LENGTH,
} from './constants';
import './Tableau.css';

export function Tableau() {
  const [cardPile1, setCardPile1] = createSignal<Card[]>([]);
  const [cardPile2, setCardPile2] = createSignal<Card[]>([]);
  const [cardPile3, setCardPile3] = createSignal<Card[]>([]);
  const [cardPile4, setCardPile4] = createSignal<Card[]>([]);
  const [cardPile5, setCardPile5] = createSignal<Card[]>([]);
  const [cardPile6, setCardPile6] = createSignal<Card[]>([]);
  const [cardPile7, setCardPile7] = createSignal<Card[]>([]);
  const [cardPile8, setCardPile8] = createSignal<Card[]>([]);

  const [foundationPile1, setFoundationPile1] = createSignal<Card[]>([new Card('hearts', 'Ace')]);
  const [foundationPile2, setFoundationPile2] = createSignal<Card[]>([new Card('diamonds', 'Ace')]);
  const [foundationPile3, setFoundationPile3] = createSignal<Card[]>([new Card('clubs', 'Ace')]);
  const [foundationPile4, setFoundationPile4] = createSignal<Card[]>([new Card('spades', 'Ace')]);

  const [moveToPile, setMoveToPile] = createSignal<[Card | null, Setter<Card[]> | null, Setter<Card[]> | null]>([null, null, null]);

  const addCard = (nextCard: Card) => (cards: Card[]) => [...cards, nextCard];
  const lastCard = (cards: Accessor<Card[]>) => cards()[cards().length - 1];

  const lastCardHash: () => Record<string, [Accessor<Card[]>, Setter<Card[]>]> = () => ({
    [lastCard(cardPile1)?.id]: [cardPile1, setCardPile1],
    [lastCard(cardPile2)?.id]: [cardPile2, setCardPile2],
    [lastCard(cardPile3)?.id]: [cardPile3, setCardPile3],
    [lastCard(cardPile4)?.id]: [cardPile4, setCardPile4],
    [lastCard(cardPile5)?.id]: [cardPile5, setCardPile5],
    [lastCard(cardPile6)?.id]: [cardPile6, setCardPile6],
    [lastCard(cardPile7)?.id]: [cardPile7, setCardPile7],
    [lastCard(cardPile8)?.id]: [cardPile8, setCardPile8],
    [lastCard(foundationPile1)?.id]: [foundationPile1, setFoundationPile1],
    [lastCard(foundationPile2)?.id]: [foundationPile2, setFoundationPile2],
    [lastCard(foundationPile3)?.id]: [foundationPile3, setFoundationPile3],
    [lastCard(foundationPile4)?.id]: [foundationPile4, setFoundationPile4],
  });

  const pilesHash: () => Record<string, [Accessor<Card[]>, Setter<Card[]>]> = () => ({
    [CARD_PILE_1]: [cardPile1, setCardPile1],
    [CARD_PILE_2]: [cardPile2, setCardPile2],
    [CARD_PILE_3]: [cardPile3, setCardPile3],
    [CARD_PILE_4]: [cardPile4, setCardPile4],
    [CARD_PILE_5]: [cardPile5, setCardPile5],
    [CARD_PILE_6]: [cardPile6, setCardPile6],
    [CARD_PILE_7]: [cardPile7, setCardPile7],
    [CARD_PILE_8]: [cardPile8, setCardPile8],
    [FOUNDATION_PILE_1]: [foundationPile1, setFoundationPile1],
    [FOUNDATION_PILE_2]: [foundationPile2, setFoundationPile2],
    [FOUNDATION_PILE_3]: [foundationPile3, setFoundationPile3],
    [FOUNDATION_PILE_4]: [foundationPile4, setFoundationPile4],
  });

  const lastFoundationCardAndSetter: () => [Card, Setter<Card[]>][] = () => [
    [foundationPile1()[foundationPile1().length - 1], setFoundationPile1],
    [foundationPile2()[foundationPile2().length - 1], setFoundationPile2],
    [foundationPile3()[foundationPile3().length - 1], setFoundationPile3],
    [foundationPile4()[foundationPile4().length - 1], setFoundationPile4],
  ];

  const [isFoundation1Animating, setIsFoundation1Animating] = createSignal<boolean>(false);
  const [isFoundation2Animating, setIsFoundation2Animating] = createSignal<boolean>(false);
  const [isFoundation3Animating, setIsFoundation3Animating] = createSignal<boolean>(false);
  const [isFoundation4Animating, setIsFoundation4Animating] = createSignal<boolean>(false);

  const areFoundationsAnimating = () => [
    setIsFoundation4Animating,
    setIsFoundation3Animating,
    setIsFoundation2Animating,
    setIsFoundation1Animating,
  ];

  const dragEndHandler: DragEventHandler = ({ draggable, droppable }) => {
    if (!draggable || !droppable) return;

    draggable.node.classList.remove('dragging');

    const [originalPileGetter, originalPileSetter] = lastCardHash()[draggable.id] || [];
    const [newPileGetter, newPileSetter] = pilesHash()[droppable.id] || [];

    if (!originalPileGetter
      || !originalPileSetter
      || !newPileGetter
      || !newPileSetter
      || originalPileGetter === newPileGetter
    ) return;

    const card = lastCard(originalPileGetter);
    const newPileLastCard = lastCard(newPileGetter);

    if (
      FOUNDATION_PILES.includes(String(droppable.id))
      && card !== null
      && newPileLastCard !== undefined
      && newPileLastCard.isOneLesser(card)
      && newPileLastCard.isSameSuit(card)
    ) {
      setMoveToPile([card, newPileSetter, originalPileSetter]);
    } else if (card && (newPileLastCard === undefined || card.isOneLesser(newPileLastCard))) {
      setMoveToPile([card, newPileSetter, originalPileSetter]);
    }
  };

  const dragStartHandler: DragEventHandler = ({ draggable }) => {
    draggable.node.classList.add('dragging');
  };

  createEffect(() => {
    if (
      foundationPile1().length === 1 &&
      foundationPile2().length === 1 &&
      foundationPile3().length === 1 &&
      foundationPile4().length === 1 &&
      cardPile1().length === 0 &&
      cardPile2().length === 0 &&
      cardPile3().length === 0 &&
      cardPile4().length === 0 &&
      cardPile5().length === 0 &&
      cardPile6().length === 0 &&
      cardPile7().length === 0 &&
      cardPile8().length === 0
    ) {
      const deck = new Deck();
      deck.shuffle();

      let card = deck.deal();
      let pileCounter = 0;

      while(card !== undefined) {
        const [, setter] = lastFoundationCardAndSetter().find(([lastCard]) => card && lastCard.isOneLesser(card) && lastCard.isSameSuit(card)) || [];
        if (!setter) {
          switch(pileCounter) {
            case 0:
              setCardPile1(addCard(card));
              break;
            case 1:
              setCardPile2(addCard(card));
              break;
            case 2:
              setCardPile3(addCard(card));
              break;
            case 3:
              setCardPile4(addCard(card));
              break;
            case 4:
              setCardPile5(addCard(card));
              break;
            case 5:
              setCardPile6(addCard(card));
              break;
            case 6:
              setCardPile7(addCard(card));
              break;
            case 7:
              setCardPile8(addCard(card));
              break;
          }
        } else {
          setter && setter(addCard(card));
        }

        pileCounter += 1;
        card = deck.deal();

        if (pileCounter === 8) pileCounter = 0;
      }
    }
  });

  createEffect(() => {
    const [droppedCard, to, from] = moveToPile();
    if (droppedCard && from && to) {
      from(cards => cards.slice(0, cards.length - 1));
      to(addCard(droppedCard));
      setMoveToPile([null, null, null]);
    }
  });

  createEffect(() => {
    if (
      foundationPile1().length === WINNING_PILE_LENGTH &&
      foundationPile2().length === WINNING_PILE_LENGTH &&
      foundationPile3().length === WINNING_PILE_LENGTH &&
      foundationPile4().length === WINNING_PILE_LENGTH &&
      cardPile1().length === 0 &&
      cardPile2().length === 0 &&
      cardPile3().length === 0 &&
      cardPile4().length === 0 &&
      cardPile5().length === 0 &&
      cardPile6().length === 0 &&
      cardPile7().length === 0 &&
      cardPile8().length === 0
    ) {
      areFoundationsAnimating().forEach((setter, index) => {
        setTimeout(() => {
          setter(true);
        }, VICTORY_ANIMATION_DELAY * index);
      });

      setTimeout(() => {
        areFoundationsAnimating().forEach((setter) => {
          setter(false);
        });
      }, areFoundationsAnimating().length * VICTORY_ANIMATION_REMOVAL_TIME);
    }
  });

  return (
    <DragDropProvider onDragEnd={dragEndHandler} onDragStart={dragStartHandler}>
      <DragDropSensors />
      <div class="card-game-tableau">
        <CardPile
          cards={cardPile1()}
          direction={DIRECTION_RTL}
          id={CARD_PILE_1}
          type={DROPPABLE_TYPE_CARDPILE}
        />
        <Foundation
          cards={foundationPile1()}
          id={FOUNDATION_PILE_1}
          isAnimating={isFoundation1Animating()}
          type={DROPPABLE_TYPE_FOUNDATION}
        />
        <CardPile
          cards={cardPile5()}
          direction={DIRECTION_LTR}
          id={CARD_PILE_5}
          type={DROPPABLE_TYPE_CARDPILE}
        />
        <CardPile
          cards={cardPile2()}
          direction={DIRECTION_RTL}
          id={CARD_PILE_2}
          type={DROPPABLE_TYPE_CARDPILE}
        />
        <Foundation
          cards={foundationPile2()}
          id={FOUNDATION_PILE_2}
          isAnimating={isFoundation2Animating()}
          type={DROPPABLE_TYPE_FOUNDATION}
        />
        <CardPile
          cards={cardPile6()}
          direction={DIRECTION_LTR}
          id={CARD_PILE_6}
          type={DROPPABLE_TYPE_CARDPILE}
        />
        <CardPile
          cards={cardPile3()}
          direction={DIRECTION_RTL}
          id={CARD_PILE_3}
          type={DROPPABLE_TYPE_CARDPILE}
        />
        <Foundation
          cards={foundationPile3()}
          id={FOUNDATION_PILE_3}
          isAnimating={isFoundation3Animating()}
          type={DROPPABLE_TYPE_FOUNDATION}
        />
        <CardPile
          cards={cardPile7()}
          direction={DIRECTION_LTR}
          id={CARD_PILE_7}
          type={DROPPABLE_TYPE_CARDPILE}
        />
        <CardPile
          cards={cardPile4()}
          direction={DIRECTION_RTL}
          id={CARD_PILE_4}
          type={DROPPABLE_TYPE_CARDPILE}
        />
        <Foundation
          cards={foundationPile4()}
          id={FOUNDATION_PILE_4}
          isAnimating={isFoundation4Animating()}
          type={DROPPABLE_TYPE_FOUNDATION}
        />
        <CardPile
          cards={cardPile8()}
          direction={DIRECTION_LTR}
          id={CARD_PILE_8}
          type={DROPPABLE_TYPE_CARDPILE}
        />
      </div>
    </DragDropProvider>
  );
}
