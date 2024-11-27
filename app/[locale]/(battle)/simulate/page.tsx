'use client';

import { ClientOnly } from '@/components/ClientOnly';
import Simulate from './Simulate';

export default function SimulatePage() {
  return (
    <ClientOnly>
      <Simulate />
    </ClientOnly>
  );
}
