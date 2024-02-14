import 'solid-js';
import { Tableau } from '@/features/card-game';
import { Toolbar } from '@/features/toolbar';
import type { Droppable, Draggable } from '@/common/types';
import { SettingsProvider, StatisticsProvider } from '@/features/settings';
import { DealerProvider } from '@/features/toolbar';
import './App.css';
import './zag.css';

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
    <StatisticsProvider moveCount={0}>
      <SettingsProvider>
        <DealerProvider shouldUndo={false} shouldRedeal={false}>
          <>
            <Tableau />
            <Toolbar />
          </>
        </DealerProvider>
      </SettingsProvider>
    </StatisticsProvider>
  );
}

export default App;
