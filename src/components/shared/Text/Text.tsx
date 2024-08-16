import { forwardRef } from 'react';
import { Text as RNText } from 'react-native';
import { TextProps } from './Text.types';

export const Text = forwardRef<RNText, TextProps>(function Text(
  { family = 'Urbanist', weight = 'Regular', style, children },
  ref,
) {
  const fontFamily = `${family}-${weight}`;
  return (
    <RNText ref={ref} style={[{ fontFamily }, style]}>
      {children}
    </RNText>
  );
});
