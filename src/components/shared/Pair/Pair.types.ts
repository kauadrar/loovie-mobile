import { FunctionComponent } from 'react';
import { TouchableOpacityProps } from 'react-native';
import { InputProps } from '../Input/Input.types';

export type PairComponent = FunctionComponent<PairProps> & {
  Input: FunctionComponent<InputProps>;
  Button: FunctionComponent<TouchableOpacityProps>;
};

export type PairProps = {
  className?: string;
  children: React.ReactNode;
};
