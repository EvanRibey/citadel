import type { IconButtonProps } from './types';
import './IconButton.css';

export function IconButton(props: IconButtonProps) {
  const clickHandler = () => {
    props.onClick && props.onClick();
  };

  return (
    <button
      onClick={clickHandler}
      {...(props.attributes || [])}
      class="icon-button"
      aria-label={props.ariaLabel}
    >
      <img class="img" src={props.icon} alt={props.iconAlt} />
    </button>
  );
}
