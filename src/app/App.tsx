import 'solid-js';
import { Tableau } from '@/features/card-game';
import { Toolbar } from '@/features/toolbar';
import type { Droppable, Draggable } from '@/common/types';
import { DealerProvider, SettingsProvider, StatisticsProvider } from '@/features/settings';
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
    <StatisticsProvider>
      <SettingsProvider>
        <DealerProvider>
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
