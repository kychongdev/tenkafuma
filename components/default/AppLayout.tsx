import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSideBar';
import { useTranslations } from 'next-intl';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const t = useTranslations('AppSidebar');
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <main className="flex min-h-screen flex-1 flex-col bg-background">
        <div className="flex h-16 shrink-0 items-center gap-2 border-b px-4 w-full">
          <SidebarTrigger className="[&_svg]:size-8 w-12 h-12" />
          <div className="font-extrabold">{t('header-title')}</div>
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
}
