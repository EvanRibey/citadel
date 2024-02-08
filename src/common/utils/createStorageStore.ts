import { createEffect } from 'solid-js';
import { SetStoreFunction, Store, createStore } from 'solid-js/store';

export function createStorageStore<T>(storageKey: string, initialValue: T): [Store<T>, SetStoreFunction<T>] {
  let parsedStorageValue;
  const initialStorageValue = localStorage.getItem(storageKey);

  if (initialStorageValue) {
    parsedStorageValue = JSON.parse(initialStorageValue);
  } else {
    parsedStorageValue = initialValue;
  }

  const [store, setStore] = createStore(parsedStorageValue);

  createEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(store));
  });

  return [store, setStore];
}
