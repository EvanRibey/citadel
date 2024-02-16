import { Show } from 'solid-js';
import type { TooltipProps } from './types';

export function Tooltip(props: TooltipProps) {
  return (
    <Show when={props.isVisible}>
      <div {...props.machine().positionerProps}>
        <div {...props.machine().contentProps}>
          {props.children}
        </div>
      </div>
    </Show>
  );
}
