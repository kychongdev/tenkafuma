'use client';
import { useRouter } from '@/app/i18n/routing';
import { useTranslations } from 'next-intl';

export const HeaderButton = () => {
  const t = useTranslations('AppSidebar');
  const router = useRouter();
  return (
    <div
      className="font-extrabold"
      onClick={() => {
        router.push('/');
      }}
    >
      {t('header-title')}
    </div>
  );
};
