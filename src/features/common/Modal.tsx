import { Show } from 'solid-js';
import { Portal } from 'solid-js/web';
import { close, closeDark } from '@/assets/icons';
import { isSettingEnabled } from '@/features/settings/utils';
import { SETTING_DARK_MODE } from '@/features/settings/constants';
import { IconButton } from '.';
import type { ModalProps } from './types';
import './Modal.css';

export function Modal(props: ModalProps) {
  const isDarkModeEnabled = isSettingEnabled(SETTING_DARK_MODE);

  return (
    <Show when={props.machine().isOpen}>
      <Portal>
        <div {...props.machine().backdropProps} />
        <div {...props.machine().positionerProps}>
          <div {...props.machine().contentProps} class="modal">
            {props.children}
            <Show when={props.showClose}>
              <Show when={isDarkModeEnabled()} fallback={(
                <IconButton
                  attributes={props.machine().closeTriggerProps}
                  ariaLabel="close"
                  icon={close}
                  iconAlt="close"
                />
              )}>
                <IconButton
                  attributes={props.machine().closeTriggerProps}
                  ariaLabel="close"
                  icon={closeDark}
                  iconAlt="close"
                />
              </Show>
            </Show>
          </div>
        </div>
      </Portal>
    </Show>
  );
}
