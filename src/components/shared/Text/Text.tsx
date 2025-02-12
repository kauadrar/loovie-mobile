import { forwardRef } from 'react';
import { Text as RNText, TextProps } from 'react-native';

export const Text = forwardRef<RNText, TextProps>(function Text(
  { children, className, ...props },
  ref,
) {
  return (
    <RNText
      ref={ref}
      className={`color-white font-urbanist-regular ${className}`}
      {...props}
    >
      {children}
    </RNText>
  );
});
