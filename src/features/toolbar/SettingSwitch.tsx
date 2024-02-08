import * as zagSwitch from '@zag-js/switch';
import { normalizeProps, useMachine } from '@zag-js/solid';
import { createMemo, createUniqueId } from 'solid-js';
import type { SettingSwitchProps } from './types';
import './SettingSwitch.css';

export function SettingSwitch(props: SettingSwitchProps) {
  const [switchState, switchSend] = useMachine(zagSwitch.machine({
    id: createUniqueId(),
    checked: props.setting.enabled,
    onCheckedChange: (details) => {
      props.onSwitch(props.setting.module, details.checked);
    },
  }));
  const switchMachine = createMemo(() => zagSwitch.connect(switchState, switchSend, normalizeProps));

  return (
    <>
      <div class="setting-switch-descriptor">
        <p id={props.setting.module} class="name">{props.setting.name}</p>
        <p class="descriptor">{props.setting.description || ''}</p>
      </div>
      <div class="setting-switch-toggle">
        <label {...switchMachine().rootProps}>
          <input {...switchMachine().hiddenInputProps} aria-labelledby={props.setting.module} />
          <span {...switchMachine().controlProps}>
            <span {...switchMachine().thumbProps} />
          </span>
        </label>
      </div>
    </>
  );
}
