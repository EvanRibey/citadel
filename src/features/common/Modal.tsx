import { Show } from 'solid-js';
import { Portal } from 'solid-js/web';
import { close } from '@/assets/icons';
import type { ModalProps } from './types';
import './Modal.css';

export function Modal(props: ModalProps) {
  return (
    <Show when={props.machine().isOpen}>
      <Portal>
        <div {...props.machine().backdropProps} />
        <div {...props.machine().positionerProps}>
          <div {...props.machine().contentProps} class={`modal ${props.contentClass ? props.contentClass : ''}`}>
            {props.children}
            <Show when={props.showClose}>
              <button {...props.machine().closeTriggerProps} aria-label="close">
                <img class="img" src={close} alt="close" />
              </button>
            </Show>
          </div>
        </div>
      </Portal>
    </Show>
  );
}
