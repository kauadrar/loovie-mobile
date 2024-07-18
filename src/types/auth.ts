export type LoginParams = {
  password: string;
} & ({
  email: string;
  username: never;
} | {
  username: string;
  email: never;
});

export type SignUpParams = {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
};
