'use client';

import { ClientOnly } from '@/components/ClientOnly';
import Team from './team';

export default function TeamPage() {
  return (
    <ClientOnly>
      <Team />
    </ClientOnly>
  );
}
