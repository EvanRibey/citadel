import { createSignal, createContext, useContext } from 'solid-js';
import type { DealerProviderProps, DealerProvider } from './types';

const DealerContext = createContext<DealerProvider>({
  shouldRedeal: () => false,
  shouldUndo: () => false,
  willRedeal: () => {},
  clearRedeal: () => {},
  willUndo: () => {},
  clearUndo: () => {},
});

export function DealerProvider(props: DealerProviderProps) {
  const [shouldRedeal, setShouldRedeal] = createSignal<boolean>(false);
  const [shouldUndo, setShouldUndo] = createSignal<boolean>(false);
  const dealerManager = {
    shouldRedeal,
    shouldUndo,
    willRedeal: () => {
      setShouldRedeal(true);
    },
    clearRedeal: () => {
      setShouldRedeal(false);
    },
    willUndo: () => {
      setShouldUndo(true);
    },
    clearUndo: () => {
      setShouldUndo(false);
    },
  };

  return (
    <DealerContext.Provider value={dealerManager}>
      {props.children}
    </DealerContext.Provider>
  );
}

export function useDealer() { return useContext<DealerProvider>(DealerContext) }
