import 'solid-js';
import { Tableau } from '@/features/card-game';
import type { Droppable, Draggable } from '@/common/types';
import './App.css';

declare module 'solid-js' {
  namespace JSX {
    interface DirectiveFunctions {
      droppable: Droppable;
      draggable: Draggable;
    }
  }
}

function App() {
  return (
    <Tableau />
  );
}

export default App;
