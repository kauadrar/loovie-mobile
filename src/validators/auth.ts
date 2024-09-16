import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email_or_username: yup
    .string()
    .required('O e-mail ou nome de usuário é obrigatório.'),
  password: yup
    .string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres.')
    .required('A senha é obrigatória.'),
});

export const signUpFirstStepSchema = yup.object().shape({
  email: yup
    .string()
    .email('O e-mail está invalido.')
    .required('O e-mail é obrigatório.'),
  username: yup.string().required('O nome de usuário é obrigatório.'),
});

export const signUpSecondStepSchema = yup.object().shape({
  first_name: yup.string().required('O nome é obrigatório.'),
  last_name: yup.string().required('O sobrenome é obrigatório.'),
  birth_date: yup.date().required('A data de nascimento é obrigatória.'),
});

export const signUpThirdStepSchema = yup.object().shape({
  password: yup
    .string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres.')
    .required('A senha é obrigatória.'),
  confirmation_password: yup
    .string()
    .oneOf([yup.ref('password')], 'As senhas devem ser iguais.'),
});
