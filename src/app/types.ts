import { Accessor, JSX } from 'solid-js';

export interface RedealProviderProps {
  shouldRedeal: boolean;
  children: JSX.Element;
}

export interface RedealerProvider {
  shouldRedeal: Accessor<boolean>;
  willRedeal: VoidFunction; 
  willNotRedeal: VoidFunction;
}
