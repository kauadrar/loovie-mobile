import {
  signUpFirstStepSchema,
  signUpSecondStepSchema,
  signUpThirdStepSchema,
} from '@/validators';
import { AxiosResponse, AxiosResponseHeaders } from 'axios';

export type LoginParams = {
  password: string;
} & (
  | {
      email: string;
      username: never;
    }
  | {
      username: string;
      email: never;
    }
);

export type SignUpValues = typeof signUpFirstStepSchema.__outputType &
  typeof signUpSecondStepSchema.__outputType &
  typeof signUpThirdStepSchema.__outputType;

export type SignUpParams = {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  birthday: Date;
  password: string;
};

export type AuthResponse = AxiosResponse & {
  headers: {
    'access-token': string;
  } & AxiosResponseHeaders;
};
