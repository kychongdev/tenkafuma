'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { useRouter } from '@/app/i18n/routing';
import { useLocalStorage } from '@uidotdev/usehooks';
import { CharacterTeam } from '@/types/Select';
import { CharTeamCard } from './CharTeamCard';

export default function Team() {
  const router = useRouter();
  const t = useTranslations('Team');
  const [teams] = useLocalStorage<CharacterTeam[]>('team', []);
  return (
    <div className="w-full max-w-[420px] p-2 mx-auto font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col gap-3">
        <Button onClick={() => router.push('/team/build')}>
          {t('header')}
        </Button>
        {teams.map((char, index) => {
          return <CharTeamCard key={index} index={index} team={char} />;
        })}
      </div>
    </div>
  );
}
