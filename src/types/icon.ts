import { StyleProp } from 'react-native';
import { SvgProps } from 'react-native-svg';

declare module 'lucide-react-native' {
  export interface LucideProps extends SvgProps {
    size?: string | number;
    absoluteStrokeWidth?: boolean;
    'data-testid'?: string;
    style?: StyleProp<any>;
  }
}
