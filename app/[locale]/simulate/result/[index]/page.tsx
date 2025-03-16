'use client';

import { ClientOnly } from '@/components/ClientOnly';
import { useParams } from 'next/navigation';
import { isString } from 'lodash';
import { useSimulateTeamState } from '@/core/SimulateTeamState';
import { SimulateResult } from './SimulateResult';
export default function SimulateSelect() {
  // if (!index || !isString(index)) {
  //   return <div>Wrong Parameter</div>;
  // }
  // const hasHydrated = useSimulateTeamState((state) => state._hasHydrated);
  //
  // if (!hasHydrated) {
  //   return <p>Loading...</p>;
  // }

  return (
    <ClientOnly>
      <SimulateResult />
    </ClientOnly>
  );
}
