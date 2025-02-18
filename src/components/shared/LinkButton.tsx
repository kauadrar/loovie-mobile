import { Link } from 'expo-router';
import { ComponentProps } from 'react';
import { Button } from './Button';

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
