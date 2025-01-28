import { SvgProps } from '@/types';
import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export function LooviePlay({ size = 36, ...props }: SvgProps) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 667 667"
      fill="none"
      {...props}
    >
      <Path
        d="M269.067 230.933c-10 5.867-9.6 1.867-9.6 99.867-.134 83.467 0 87.6 2.4 93.067 1.733 3.866 4.133 6.4 7.333 8.133 4.533 2.267 5.067 2.267 12.267 0 4.133-1.2 14-6.133 22-10.933 11.866-7.067 70.8-41.334 127.733-74.134 8-4.666 10.933-7.066 12.4-10.666 4.267-10.267-2-18.134-24.267-30.134-14.533-7.866-103.466-56.933-126.666-69.866-15.2-8.534-17.334-9.067-23.6-5.334z"
        fill="#9C140C"
      />
    </Svg>
  );
}
