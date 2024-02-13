import type { PopoverProps } from './types';

export function Popover(props: PopoverProps) {
  return (
    <div {...props.machine().positionerProps}>
      <div {...props.machine().contentProps}>
        {props.children}
      </div>
    </div>
  );
}
