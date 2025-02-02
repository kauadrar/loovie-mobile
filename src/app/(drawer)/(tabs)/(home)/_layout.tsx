import { Header } from '@/components/home/Header/Header';
import { Slot } from 'expo-router';
import React from 'react';

export default function HomeLayout() {
  return (
    <>
      <Header />
      <Slot />
    </>
  );
}
