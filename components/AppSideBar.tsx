import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { SwordsIcon } from 'lucide-react';
import NavigationLink from './default/NavigationLink';
import { useTranslations } from 'next-intl';

export function AppSidebar() {
  const t = useTranslations('AppSidebar');
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t('menu-title')}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavigationLink href="/team">
                    <SwordsIcon />
                    <span>{t('menu1')}</span>
                  </NavigationLink>
                </SidebarMenuButton>
                <SidebarMenuButton asChild>
                  <NavigationLink href="/battle">
                    <SwordsIcon />
                    <span>{t('menu2')}</span>
                  </NavigationLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
