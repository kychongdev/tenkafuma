'use client';

import { ClientOnly } from '@/components/ClientOnly';
import Build from './Build';

export default function TeamPage() {
  return (
    <ClientOnly>
      <Build />
    </ClientOnly>
  );
}
