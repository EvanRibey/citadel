import type { Accessor, Setter} from 'solid-js';
import { createEffect, createSignal } from 'solid-js';

export function createStorageSignal<T>(storageKey: string, initialValue: T): [Accessor<T>, Setter<T>] {
  let parsedStorageValue;
  const initialStorageValue = localStorage.getItem(storageKey);

  if (initialStorageValue) {
    parsedStorageValue = JSON.parse(initialStorageValue);
  } else {
    parsedStorageValue = initialValue;
  }

  const [store, setStore] = createSignal(parsedStorageValue);

  createEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(store()));
  });

  return [store, setStore];
}
