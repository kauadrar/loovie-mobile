import { Link } from 'expo-router';
import { ComponentProps } from 'react';

export type LinkButtonProps = {
  label: string;
} & ComponentProps<typeof Link>;
