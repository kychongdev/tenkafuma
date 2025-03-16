'use client';

import { ClientOnly } from '@/components/ClientOnly';
import Stage from './stage';

export default function StagePage() {
  return (
    <ClientOnly>
      <Stage />
    </ClientOnly>
  );
}
