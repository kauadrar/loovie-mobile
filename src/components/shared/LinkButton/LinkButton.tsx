import { Link } from 'expo-router';
import { ComponentProps } from 'react';
import { withUnistyles } from 'react-native-unistyles';
import { Button } from '../Button/Button';

export const LinkButton = withUnistyles(function LinkButton({
  children,
  style,
  ...props
}: ComponentProps<typeof Link>) {
  return (
    <Link asChild {...props}>
      <Button>{children}</Button>
    </Link>
  );
});
