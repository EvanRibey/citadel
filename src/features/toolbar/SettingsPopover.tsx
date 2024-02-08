import { Popover } from '@/features/common';
import { useSettings } from '@/app/Settings';
import './SettingsPopover.css';
import type { SettingsPopoverProps } from './types';

export function SettingsPopover(props: SettingsPopoverProps) {
  const settings = useSettings() || {};
  console.log(settings);

  return (
    <Popover machine={props.machine}>
      <div class="toolbar-settings"></div>
    </Popover>
  );
}
