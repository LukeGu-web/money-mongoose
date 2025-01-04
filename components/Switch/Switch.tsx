import { Switch as RNSwitch } from 'react-native';
import { useSettingStore } from 'core/stateHooks';

type SwitchProps = {
  value: boolean;
  onValueChange: (value?: boolean) => void;
};

export default function Switch({ value, onValueChange }: SwitchProps) {
  const theme = useSettingStore((state) => state.theme);
  const switchColors =
    theme === 'dark'
      ? {
          trackColor: { false: '#334155', true: '#075985' },
          thumbColor: '#27272a',
        }
      : {
          trackColor: { false: '#cbd5e1', true: '#60a5fa' },
          thumbColor: '#f4f4f5',
        };
  return (
    <RNSwitch
      trackColor={switchColors.trackColor}
      thumbColor={switchColors.thumbColor}
      ios_backgroundColor={switchColors.trackColor.false}
      onValueChange={onValueChange}
      value={value}
    />
  );
}
