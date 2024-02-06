import { Api } from '@zag-js/dialog';
import { Accessor } from 'solid-js';

export interface HowToPlayModalProps {
  machine: Accessor<Api>;
}

export interface HowToPlayButtonProps {
  onClick: VoidFunction;
}

export interface RestartButtonProps {
  onClick: VoidFunction;
}
