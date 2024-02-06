import { createMemo, createUniqueId } from 'solid-js';
import * as dialog from '@zag-js/dialog';
import { useMachine, normalizeProps } from '@zag-js/solid';
import { useRedeal } from '@/app/ShouldRedeal';
import { HowToPlayButton, HowToPlayModal, RestartButton } from '.';
import './Toolbar.css';

export function Toolbar() {
  const { willRedeal } = useRedeal() || {};

  const [machineState, machineSend] = useMachine(dialog.machine({ id: createUniqueId() }));
  const howTodialogMachine = createMemo(() => dialog.connect(machineState, machineSend, normalizeProps));

  const clickHowToPlayHandler = () => {
    howTodialogMachine()?.open();
  };

  const clickRestartHandler = () => {
    willRedeal && willRedeal();
  };

  return (
    <>
      <div class="toolbar">
        <RestartButton onClick={clickRestartHandler} />
        <HowToPlayButton onClick={clickHowToPlayHandler} />
      </div>
      <HowToPlayModal machine={howTodialogMachine} />
    </>
  );
}
