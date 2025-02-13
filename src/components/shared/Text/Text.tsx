import { forwardRef } from 'react';
import { Text as RNText, TextProps } from 'react-native';
import { twMerge } from 'tailwind-merge';

export const Text = forwardRef<RNText, TextProps>(function Text(
  { children, className, ...props },
  ref,
) {
  return (
    <RNText
      ref={ref}
      {...props}
      className={twMerge('text-white font-urbanist-regular', className)}
    >
      {children}
    </RNText>
  );
});
