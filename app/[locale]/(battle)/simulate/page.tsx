'use client';

import { ClientOnly } from '@/components/ClientOnly';
import SimulateTeam from './SimulateTeam';

export default function SimulatePage() {
  return (
    <ClientOnly>
      <SimulateTeam />
    </ClientOnly>
  );
}
