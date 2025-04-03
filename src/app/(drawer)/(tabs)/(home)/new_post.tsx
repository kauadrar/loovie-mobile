import { Container, TextArea } from '@/components/shared';
import { postSchema } from '@/validators';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';

export default function NewPost() {
  const { control } = useForm({
    resolver: yupResolver(postSchema),
  });

  return (
    <Container className="pt-safe-offset-16 px-4">
      <Controller
        control={control}
        name="content"
        render={({ field: { onChange, ...field } }) => (
          <TextArea
            label="Post"
            placeholder="Teste"
            onChangeText={onChange}
            {...field}
          />
        )}
      />
    </Container>
  );
}
