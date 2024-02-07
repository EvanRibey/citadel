import {
  Accessor,
  Setter,
  createEffect,
  createMemo,
  createSignal,
  createUniqueId,
  onMount,
} from 'solid-js';
import { DragDropProvider, DragDropSensors, DragEventHandler } from '@thisbeyond/solid-dnd';
import * as dialog from '@zag-js/dialog';
import { useMachine, normalizeProps } from '@zag-js/solid';
import {
  DIRECTION_LTR,
  DIRECTION_RTL,
  SUIT_CLUBS,
  SUIT_DIAMONDS,
  SUIT_HEARTS,
  SUIT_SPADES,
} from '@/common/constants';
import { Card } from '@/common/classes/Card';
import { Deck } from '@/common/classes/Deck';
import { useRedeal } from '@/app/ShouldRedeal';
import { CardPile, Foundation, PlayAgainModal } from '.';
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
  const {shouldRedeal, willNotRedeal } = useRedeal() || {};
  const [machineState, machineSend] = useMachine(dialog.machine({ id: createUniqueId() }));
  const playAgainDialog = createMemo(() => dialog.connect(machineState, machineSend, normalizeProps));

  const [cardPile1, setCardPile1] = createSignal<Card[]>([]);
  const [cardPile2, setCardPile2] = createSignal<Card[]>([]);
  const [cardPile3, setCardPile3] = createSignal<Card[]>([]);
  const [cardPile4, setCardPile4] = createSignal<Card[]>([]);
  const [cardPile5, setCardPile5] = createSignal<Card[]>([]);
  const [cardPile6, setCardPile6] = createSignal<Card[]>([]);
  const [cardPile7, setCardPile7] = createSignal<Card[]>([]);
  const [cardPile8, setCardPile8] = createSignal<Card[]>([]);

  const [foundationPile1, setFoundationPile1] = createSignal<Card[]>([]);
  const [foundationPile2, setFoundationPile2] = createSignal<Card[]>([]);
  const [foundationPile3, setFoundationPile3] = createSignal<Card[]>([]);
  const [foundationPile4, setFoundationPile4] = createSignal<Card[]>([]);

  const [moveToPile, setMoveToPile] = createSignal<[Card | null, Setter<Card[]> | null, Setter<Card[]> | null]>([null, null, null]);

  const addCard = (nextCard: Card) => (cards: Card[]) => [...cards, nextCard];
  const lastCard = (cards: Accessor<Card[]>): Card => cards()[cards().length - 1];

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

  const suitHash: () => Record<string, [Accessor<Card[]>, Setter<Card[]>]> = () => ({
    [SUIT_HEARTS]: [foundationPile1, setFoundationPile1],
    [SUIT_DIAMONDS]: [foundationPile2, setFoundationPile2],
    [SUIT_CLUBS]: [foundationPile3, setFoundationPile3],
    [SUIT_SPADES]: [foundationPile4, setFoundationPile4],
  });

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

  const initTableaux = () => {
    const tempPile1 = [];
    const tempPile2 = [];
    const tempPile3 = [];
    const tempPile4 = [];
    const tempPile5 = [];
    const tempPile6 = [];
    const tempPile7 = [];
    const tempPile8 = [];
    const heartsFoundation = [new Card('hearts', 'Ace')];
    const diamondsFoundation = [new Card('diamonds', 'Ace')];
    const clubsFoundation = [new Card('clubs', 'Ace')];
    const spadesFoundation = [new Card('spades', 'Ace')];

    const deck = new Deck();
    deck.shuffle();

    let card = deck.deal();
    let pileCounter = 0;

    while(card !== undefined) {
      let foundationPile = null;

      switch(card.suit) {
        case 'hearts':
          foundationPile = heartsFoundation;
          break;
        case 'diamonds':
          foundationPile = diamondsFoundation;
          break;
        case 'clubs':
          foundationPile = clubsFoundation;
          break;
        case 'spades':
          foundationPile = spadesFoundation;
          break;
      }

      const lastCard = foundationPile[foundationPile.length - 1];

      if (!lastCard.isOneLesser(card)) {
        switch(pileCounter) {
          case 0:
            tempPile1.push(card);
            break;
          case 1:
            tempPile2.push(card);
            break;
          case 2:
            tempPile3.push(card);
            break;
          case 3:
            tempPile4.push(card);
            break;
          case 4:
            tempPile5.push(card);
            break;
          case 5:
            tempPile6.push(card);
            break;
          case 6:
            tempPile7.push(card);
            break;
          case 7:
            tempPile8.push(card);
            break;
        }
      } else {
        foundationPile.push(card);
      }

      pileCounter += 1;
      card = deck.deal();

      if (pileCounter === 8) pileCounter = 0;
    }

    setFoundationPile1(heartsFoundation);
    setFoundationPile2(diamondsFoundation);
    setFoundationPile3(clubsFoundation);
    setFoundationPile4(spadesFoundation);
    setCardPile1(tempPile1);
    setCardPile2(tempPile2);
    setCardPile3(tempPile3);
    setCardPile4(tempPile4);
    setCardPile5(tempPile5);
    setCardPile6(tempPile6);
    setCardPile7(tempPile7);
    setCardPile8(tempPile8);
  };

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

  const doubleClickCardHandler = (card: Card) => () => {
    const [, currentPileSetter] = lastCardHash()[card.id] || [];
    const [foundationPile, foundationPileSetter] = suitHash()[card.suit] || [];

    if (!foundationPile || !foundationPileSetter || !currentPileSetter) return;

    const lastFoundationCard = lastCard(foundationPile);
    if (lastFoundationCard.isOneLesser(card) && lastFoundationCard.isSameSuit(card)) {
      setMoveToPile([card, foundationPileSetter, currentPileSetter]);
    }
  };

  const resetTableauxHandler = () => {
    playAgainDialog()?.close();
    initTableaux();
  };

  onMount(() => {
    initTableaux();
  });

  createEffect(() => {
    if (shouldRedeal && shouldRedeal()) {
      initTableaux();
      willNotRedeal && willNotRedeal();
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
          playAgainDialog()?.open();
        });
      }, (areFoundationsAnimating().length - 2) * VICTORY_ANIMATION_REMOVAL_TIME);
    }
  });

  return (
    <>
      <DragDropProvider onDragEnd={dragEndHandler} onDragStart={dragStartHandler}>
        <DragDropSensors />
        <div class="card-game-tableau">
          <CardPile
            cards={cardPile1()}
            direction={DIRECTION_RTL}
            id={CARD_PILE_1}
            onDoubleClick={doubleClickCardHandler}
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
            onDoubleClick={doubleClickCardHandler}
            type={DROPPABLE_TYPE_CARDPILE}
          />
          <CardPile
            cards={cardPile2()}
            direction={DIRECTION_RTL}
            id={CARD_PILE_2}
            onDoubleClick={doubleClickCardHandler}
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
            onDoubleClick={doubleClickCardHandler}
            type={DROPPABLE_TYPE_CARDPILE}
          />
          <CardPile
            cards={cardPile3()}
            direction={DIRECTION_RTL}
            id={CARD_PILE_3}
            onDoubleClick={doubleClickCardHandler}
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
            onDoubleClick={doubleClickCardHandler}
            type={DROPPABLE_TYPE_CARDPILE}
          />
          <CardPile
            cards={cardPile4()}
            direction={DIRECTION_RTL}
            id={CARD_PILE_4}
            onDoubleClick={doubleClickCardHandler}
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
            onDoubleClick={doubleClickCardHandler}
            type={DROPPABLE_TYPE_CARDPILE}
          />
        </div>
      </DragDropProvider>
      <PlayAgainModal
        onReset={resetTableauxHandler}
        machine={playAgainDialog}
      />
    </>
  );
}
