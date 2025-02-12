import { forwardRef } from 'react';
import { Text as RNText } from 'react-native';
import { withUnistyles } from 'react-native-unistyles';
import { styles } from './Text.styles';
import { TextProps } from './Text.types';

export const Text = withUnistyles(
  forwardRef<RNText, TextProps>(function Text(
    { family = 'Urbanist', weight = 'Regular', style, children, ...props },
    ref,
  ) {
    const fontFamily = `${family}-${weight}`;
    return (
      <RNText ref={ref} style={[styles.text, { fontFamily }, style]} {...props}>
        {children}
      </RNText>
    );
  }),
);
