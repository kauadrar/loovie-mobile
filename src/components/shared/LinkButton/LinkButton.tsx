import { ComponentProps } from 'react';
import { Button } from '../Button/Button';
import { Link } from 'expo-router';

export function LinkButton({
  children,
  style,
  ...props
}: ComponentProps<typeof Link>) {
  return (
    <Link asChild {...props}>
      <Button>{children}</Button>
    </Link>
  );
}
