import type { SwitchProps } from './types';

export function Switch(props: SwitchProps) {
  return (
    <label {...props.machine().rootProps}>
      <input {...props.machine().hiddenInputProps} aria-labelledby={props.ariaLabel} />
      <span {...props.machine().controlProps}>
        <span {...props.machine().thumbProps} />
      </span>
    </label>
  );
}
