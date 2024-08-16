import { FunctionComponent } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { ButtonProps } from '../Button/Button.types';

export type PairComponent = FunctionComponent<PairProps> & {
  Button: FunctionComponent<ButtonProps>;
};

export type PairProps = {
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
};
