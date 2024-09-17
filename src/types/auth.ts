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
  first_name: string;
  last_name: string;
  birth_date: Date;
  password: string;
};

export type AuthResponse = AxiosResponse & {
  headers: {
    'access-token': string;
  } & AxiosResponseHeaders;
};
