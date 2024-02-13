import type { Setter } from 'solid-js';

interface Transform {
  x: number;
  y: number;
}

type Listeners = Record<
  string,
  (event: HTMLElementEventMap[keyof HTMLElementEventMap]) => void
>;

export interface Draggable {
  (element: HTMLElement, accessor?: () => { skipTransform?: boolean }): void;
  ref: Setter<HTMLElement | null>;
  get isActiveDraggable(): boolean;
  get dragActivators(): Listeners;
  get transform(): Transform;
}

export interface Droppable {
  (element: HTMLElement, accessor?: () => { skipTransform?: boolean }): void;
  ref: Setter<HTMLElement | null>;
  get isActiveDroppable(): boolean;
  get transform(): Transform;
}
