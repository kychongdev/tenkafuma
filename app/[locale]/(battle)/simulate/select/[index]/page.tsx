'use client';

import { ClientOnly } from '@/components/ClientOnly';
import SelectSimulateTeam from './SelectSimulateTeam';
import { useParams } from 'next/navigation';
import { isString } from 'lodash';
import { useSimulateTeamState } from '@/core/SimulateTeamState';
export default function SimulateSelect() {
  const { index } = useParams();
  if (!index || !isString(index)) {
    return <div>Wrong Parameter</div>;
  }
  const hasHydrated = useSimulateTeamState((state) => state._hasHydrated);

  console.log('index', hasHydrated);
  if (!hasHydrated) {
    return <p>Loading...</p>;
  }

  return (
    <ClientOnly>
      <SelectSimulateTeam index={parseInt(index)} />
    </ClientOnly>
  );
}
