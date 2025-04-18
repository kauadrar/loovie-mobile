import { PlatformPressable } from '@react-navigation/elements';
import { Props as PlatformPressableProps } from '@react-navigation/elements/src/PlatformPressable';
import React, { useEffect, useState } from 'react';
import { Popover } from '../nativewind';
import { Text } from './Text';

type TooltipButtonProps = PlatformPressableProps & {
  label: string;
};

export function TooltipButton({ label, ...props }: TooltipButtonProps) {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  useEffect(() => {
    if (isTooltipVisible) {
      setTimeout(() => setIsTooltipVisible(false), 2000);
    }
  }, [isTooltipVisible]);

  return (
    <Popover
      isVisible={isTooltipVisible}
      arrowSize={{ height: 0, width: 0 }}
      popoverClassName="bg-gray-900 p-1 rounded-md"
      backgroundClassName="bg-black/25"
      from={
        <PlatformPressable
          {...props}
          onLongPress={() => setIsTooltipVisible(true)}
        />
      }
    >
      <Text className="text-sm">{label}</Text>
    </Popover>
  );
}
