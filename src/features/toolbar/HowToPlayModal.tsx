import { Modal } from '@/features/common';
import type { HowToPlayModalProps } from './types';
import { isSettingEnabled } from '@/features/settings/utils';
import { SETTING_BESIEGED_CASTLE } from '@/features/settings/constants';
import { Show } from 'solid-js';

export function HowToPlayModal(props: HowToPlayModalProps) {
  const isBesiegedCastleEnabled = isSettingEnabled(SETTING_BESIEGED_CASTLE);
  const gameName = () => isBesiegedCastleEnabled() ? 'Besieged Castle' : 'Citadel';
  
  return (
    <Modal
      machine={props.machine}
      showClose
    >
      <h2 {...props.machine().titleProps}>How to Play</h2>
      <p {...props.machine().descriptionProps}>Similar to other solitaire games, the goal of {gameName()} is to move all cards from the outside piles to the suited foundations in the middle.</p>
      <p {...props.machine().descriptionProps}>In order to find cards to put on to the foundation, you will need to move cards between the card piles to expose lower value cards. You can move cards between piles by moving a card of a lower value to a card of a value one higher than it anywhere in the tableaux, regardless of the suit. So moving a Jack of Clubs from one pile to a Queen of Spades in another pile is allowed, but moving a 10 of Spades on top of a 9 of Clubs is not allowed.</p>
      <p {...props.machine().descriptionProps}>Unlike Patience or regular solitaire, you can only move the last card in each pile. You cannot move more than one at a time. For example, if you have a sequence of Queen through 9 on one pile, you cannot drag those four cards over to an exposed King in another pile. Once a card starts to become buried, it is stuck until you can expose it again as an end card.</p>
      <p {...props.machine().descriptionProps}>When a card pile is empty, any card can be placed there, it does not need to be just a King. Use this to open up other card piles to your advantage.</p>
      <p {...props.machine().descriptionProps}>Cards can be moved from the Foundations in the middle back out to the card piles, should it help during the play. To make this harder, you can opt not to move cards from the middle out again in the options menu.</p>
      <Show when={isBesiegedCastleEnabled()}
        fallback={(
          <p {...props.machine().descriptionProps}>Lastly, in {gameName()} during the deal, if a card can be placed on the foundation it is done so. By default you will see some foundations already have more cards than others, and some card piles will have less cards because of this rule. In the variation Besieged Castle or Beleaguered Castle, all cards are dealt and none are placed on the foundations during the deal.</p>
        )}
      >
        <p {...props.machine().descriptionProps}>Lastly, in {gameName()} during the deal, all cards are dealt to the tableaux. In the game Citadel, during the deal, if a card can be placed on the foundation it is done so automatically. In playing {gameName()}, a bit more strategy is required as you will need to move all 48 cards from the card piles instead of the lesser amount you would see while playing Citadel.</p>
      </Show>
    </Modal>
  );
}
