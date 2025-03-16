'use client';

import { ClientOnly } from '@/components/ClientOnly';
import Stats from './Stats';

export default function BattlePage() {
  return (
    <ClientOnly>
      <Stats />
    </ClientOnly>
  );
}
