'use client';
import { useRouter } from '@/app/i18n/routing';
import { useTranslations } from 'next-intl';
import { Button } from '../ui/button';

export const HeaderButton = () => {
  const t = useTranslations('AppSidebar');
  const router = useRouter();
  return (
    <Button
      variant={'ghost'}
      className="font-extrabold"
      onClick={() => {
        router.push('/');
      }}
    >
      {t('header-title')}
    </Button>
  );
};
