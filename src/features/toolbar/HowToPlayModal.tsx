import { Show } from 'solid-js';
import { Portal } from 'solid-js/web';
import { close } from '@/assets/icons';
import type { HowToPlayModalProps } from './types';
import './HowToPlayModal.css';

export function HowToPlayModal(props: HowToPlayModalProps) {
  return (
    <Show when={props.machine().isOpen}>
      <Portal>
        <div {...props.machine().backdropProps} class="howto-play-modal-backdrop" />
        <div {...props.machine().positionerProps} class="howto-play-modal">
          <div {...props.machine().contentProps} class="content">
            <button {...props.machine().closeTriggerProps} class="close">
              <img class="img" src={close} alt="close" />
            </button>
            <h2 class="title">How to Play</h2>
            <p class="paragraph">Similar to other solitaire games, the goal of Citadel is to move all cards from the outside piles to the suited foundations in the middle.</p>
            <p class="paragraph">In order to find cards to put on to the foundation, you will need to move cards between the card piles to expose lower value cards. You can move cards between piles by moving a card of a lower value to a card of a value one higher than it anywhere in the tableaux, regardless of the suit. So moving a Jack of Clubs from one pile to a Queen of Spades in another pile is allowed, but moving a 10 of Spades on top of a 9 of Clubs is not allowed.</p>
            <p class="paragraph">Unlike common solitaire, you can only move the last card in each pile. You cannot move more than one at a time. For example, if you have a sequence of Queen through 9 on one pile, you cannot drag those four cards over to an exposed King in another pile. Once a card starts to become buried, it is stuck there until you can expose it again as an end card.</p>
            <p class="paragraph">When a card pile is empty, any card can be placed there, it does not need to be just a King. Use this to open up other card piles to your advantage.</p>
            <p class="paragraph">Cards can be moved from the Foundations in the middle back out to the card piles, should it help during the play. To make this harder, you can opt not to move cards from the middle out again (later to be an option).</p>
            <p class="paragraph">Lastly, in Citadel during the deal, if a card can be placed on the foundation it is done so. By default you will see some foundations already have more cards than others, and some card piles will have less cards because of this rule. In the variation "Besieged Castle" or "Beleaguered Castle" (coming soon), all cards are dealt and none are placed on the foundations during the deal.</p>
          </div>
        </div>
      </Portal>
    </Show>
  );
}
