import { createSignal, createContext, useContext } from 'solid-js';
import type { RedealProviderProps, RedealerProvider } from './types';

const RedealContext = createContext<RedealerProvider>();

export function RedealProvider(props: RedealProviderProps) {
  const [shouldRedeal, setShouldRedeal] = createSignal<boolean>(props.shouldRedeal || false);
  const redealer = {
    shouldRedeal,
    willRedeal: () => {
      setShouldRedeal(true);
    },
    willNotRedeal: () => {
      setShouldRedeal(false);
    },
  };

  return (
    <RedealContext.Provider value={redealer}>
      {props.children}
    </RedealContext.Provider>
  );
}

export function useRedeal() { return useContext(RedealContext) }
