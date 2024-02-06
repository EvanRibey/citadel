import { createMemo, createUniqueId } from 'solid-js';
import * as dialog from '@zag-js/dialog';
import { useMachine, normalizeProps } from '@zag-js/solid';
import { HowToPlayButton, HowToPlayModal } from '.';
import './Toolbar.css';

export function Toolbar() {
  const [machineState, machineSend] = useMachine(dialog.machine({ id: createUniqueId() }));
  const howTodialogMachine = createMemo(() => dialog.connect(machineState, machineSend, normalizeProps));

  const clickHowToPlayHandler = () => {
    howTodialogMachine()?.open();
  };

  return (
    <>
      <div class="toolbar">
        <HowToPlayButton onClick={clickHowToPlayHandler} />
      </div>
      <HowToPlayModal machine={howTodialogMachine} />
    </>
  );
}
