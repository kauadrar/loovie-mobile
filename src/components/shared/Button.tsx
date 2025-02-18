import { forwardRef } from 'react';
import { TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { Text } from './Text';

export const Button = forwardRef<View, TouchableOpacityProps>(function Button(
  { children, style, className, ...props },
  ref,
) {
  return (
    <TouchableOpacity
      ref={ref}
      className={`w-full border border-gray-500 bg-background justify-center items-center p-4 rounded-2xl ${className}`}
      {...props}
    >
      {typeof children === 'string' ? (
        <Text className="text-gray-500 text-base">{children}</Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
});
