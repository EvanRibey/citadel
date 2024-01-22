import { Accessor, Setter, createEffect, createSignal } from 'solid-js';
import { DIRECTION_LTR, DIRECTION_RTL } from '@/common/constants';
import { Card } from '@/common/classes/Card';
import { Droppable } from '@/features/common';
import { CardPile, Foundation } from '.';
import './Tableau.css';
import { Deck } from '@/common/classes/Deck';

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

  const lastCardAndSetter: () => [Card | undefined, Setter<Card[]>][] = () => [
    [cardPile1()[cardPile1().length - 1], setCardPile1],
    [cardPile2()[cardPile2().length - 1], setCardPile2],
    [cardPile3()[cardPile3().length - 1], setCardPile3],
    [cardPile4()[cardPile4().length - 1], setCardPile4],
    [cardPile5()[cardPile5().length - 1], setCardPile5],
    [cardPile6()[cardPile6().length - 1], setCardPile6],
    [cardPile7()[cardPile7().length - 1], setCardPile7],
    [cardPile8()[cardPile8().length - 1], setCardPile8],
    [foundationPile1()[foundationPile1().length - 1], setFoundationPile1],
    [foundationPile2()[foundationPile2().length - 1], setFoundationPile2],
    [foundationPile3()[foundationPile3().length - 1], setFoundationPile3],
    [foundationPile4()[foundationPile4().length - 1], setFoundationPile4],
  ];

  const [draggedCard, setDraggedCard] = createSignal<null | Card>(null);
  const [moveToPile, setMoveToPile] = createSignal<[Card | null, Setter<Card[]> | null, Setter<Card[]> | null]>([null, null, null]);
  const [moveToFoundation, setMoveToFoundation] = createSignal<[Card | null, Setter<Card[]> | null, Setter<Card[]> | null]>([null, null, null]);

  setCardPile1((cards) => [...cards, new Card('clubs', '10')]);
  setCardPile1((cards) => [...cards, new Card('diamonds', '6')]);
  setCardPile1((cards) => [...cards, new Card('hearts', 'Queen')]);
  setCardPile1((cards) => [...cards, new Card('spades', '8')]);

  setCardPile2((cards) => [...cards, new Card('clubs', 'Queen')]);
  setCardPile2((cards) => [...cards, new Card('diamonds', 'Jack')]);
  setCardPile2((cards) => [...cards, new Card('hearts', '10')]);
  setCardPile2((cards) => [...cards, new Card('spades', '9')]);

  setCardPile3((cards) => [...cards, new Card('hearts', '2')]);

  const addCard = (nextCard: Card) => (cards: Card[]) => [...cards, nextCard];

  const dragStartHandler = (playingCard: Card) => () => {
    setDraggedCard(playingCard);
  };

  const dragEndHandler = () => {
    setDraggedCard(null);
  };

  const dropHandler = (cardPile: Accessor<Card[]>, cardPileSetter: Setter<Card[]>) => () => {
    const [, setter] = lastCardAndSetter().find(([card]) => card === draggedCard()) || [];
    const lastCard = cardPile()[cardPile().length - 1];
    const card = draggedCard();

    if (setter && card && (lastCard === undefined || card.isOneLesser(lastCard))) {
      setMoveToPile([draggedCard(), cardPileSetter, setter]);
    }
  };

  const dropFoundationHandler = (cardPile: Accessor<Card[]>, cardPileSetter: Setter<Card[]>) => () => {
    const [, setter] = lastCardAndSetter().find(([card]) => card === draggedCard()) || [];
    const lastCard = cardPile()[cardPile.length - 1];
    const card = draggedCard();

    if (setter && card !== null &&
      (lastCard === undefined || 
        (lastCard.isOneLesser(card) && lastCard.isSameSuit(card))
      )
    ) {
      setMoveToFoundation([draggedCard(), cardPileSetter, setter]);
    }
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

        pileCounter += 1;
        card = deck.deal();

        if (pileCounter === 8) pileCounter = 0;
      }
    }
  });

  createEffect(() => {
    const [droppedCard, to, from] = moveToPile();
    if (droppedCard && from && to) {
      from((cards: Card[]) => cards.slice(0, cards.length - 1));
      to(addCard(droppedCard));
      setMoveToPile([null, null, null]);
    }
  });

  createEffect(() => {
    const [droppedCard, to, from] = moveToFoundation();
    if (droppedCard && from && to) {
      from((cards: Card[]) => cards.slice(0, cards.length - 1));
      to(addCard(droppedCard));
      setMoveToFoundation([null, null, null]);
    }
  });

  return (
    <div class="card-game-tableau">
      <Droppable isDroppable onDrop={dropHandler(cardPile1, setCardPile1)}>
        <CardPile
          cards={cardPile1()}
          direction={DIRECTION_RTL}
          onDragStart={dragStartHandler}
          onDragEnd={dragEndHandler}
        />
      </Droppable>
      <Droppable isDroppable onDrop={dropFoundationHandler(foundationPile1, setFoundationPile1)}>
        <Foundation
          cards={foundationPile1()}
          onDragStart={dragStartHandler}
          onDragEnd={dragEndHandler}
        />
      </Droppable>
      <Droppable isDroppable onDrop={dropHandler(cardPile2, setCardPile2)}>
        <CardPile
          cards={cardPile2()}
          direction={DIRECTION_LTR}
          onDragStart={dragStartHandler}
          onDragEnd={dragEndHandler}
        />
      </Droppable>
      <Droppable isDroppable onDrop={dropHandler(cardPile3, setCardPile3)}>
        <CardPile
          cards={cardPile3()}
          direction={DIRECTION_RTL}
          onDragStart={dragStartHandler}
          onDragEnd={dragEndHandler}
        />
      </Droppable>
      <Droppable isDroppable onDrop={dropFoundationHandler(foundationPile2, setFoundationPile2)}>
        <Foundation
          cards={foundationPile2()}
          onDragStart={dragStartHandler}
          onDragEnd={dragEndHandler}
        />
      </Droppable>
      <Droppable isDroppable onDrop={dropHandler(cardPile4, setCardPile4)}>
        <CardPile
          cards={cardPile4()}
          direction={DIRECTION_LTR}
          onDragStart={dragStartHandler}
          onDragEnd={dragEndHandler}
        />
      </Droppable>
      <Droppable isDroppable onDrop={dropHandler(cardPile5, setCardPile5)}>
        <CardPile
          cards={cardPile5()}
          direction={DIRECTION_RTL}
          onDragStart={dragStartHandler}
          onDragEnd={dragEndHandler}
        />
      </Droppable>
      <Droppable isDroppable onDrop={dropFoundationHandler(foundationPile3, setFoundationPile3)}>
        <Foundation
          cards={foundationPile3()}
          onDragStart={dragStartHandler}
          onDragEnd={dragEndHandler}
        />
      </Droppable>
      <Droppable isDroppable onDrop={dropHandler(cardPile6, setCardPile6)}>
        <CardPile
          cards={cardPile6()}
          direction={DIRECTION_LTR}
          onDragStart={dragStartHandler}
          onDragEnd={dragEndHandler}
        />
      </Droppable>
      <Droppable isDroppable onDrop={dropHandler(cardPile7, setCardPile7)}>
        <CardPile
          cards={cardPile7()}
          direction={DIRECTION_RTL}
          onDragStart={dragStartHandler}
          onDragEnd={dragEndHandler}
        />
      </Droppable>
      <Droppable isDroppable onDrop={dropFoundationHandler(foundationPile4, setFoundationPile4)}>
        <Foundation
          cards={foundationPile4()}
          onDragStart={dragStartHandler}
          onDragEnd={dragEndHandler}
        />
      </Droppable>
      <Droppable isDroppable onDrop={dropHandler(cardPile8, setCardPile8)}>
        <CardPile
          cards={cardPile8()}
          direction={DIRECTION_LTR}
          onDragStart={dragStartHandler}
          onDragEnd={dragEndHandler}
        />
      </Droppable>
    </div>
  );
}
