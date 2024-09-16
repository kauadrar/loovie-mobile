import { FunctionComponent } from 'react';
import { StyleProp, TouchableOpacityProps, ViewStyle } from 'react-native';
import { InputProps } from '../Input/Input.types';

export type PairComponent = FunctionComponent<PairProps> & {
  Input: FunctionComponent<InputProps>;
  Button: FunctionComponent<TouchableOpacityProps>;
};

export type PairProps = {
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
};
