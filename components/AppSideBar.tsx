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
import { Hourglass, Podcast, SwordsIcon, TowerControl } from 'lucide-react';
import NavigationLink from './default/NavigationLink';
import { useTranslations } from 'next-intl';
import { NavUser } from './NavUser';

export function AppSidebar() {
  const t = useTranslations('AppSidebar');
  const data = {
    user: {
      name: 'shadcn',
      email: 'm@example.com',
      avatar: '/avatars/shadcn.jpg',
    },
  };
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
                <SidebarMenuButton asChild>
                  <NavigationLink href="/simulate">
                    <SwordsIcon />
                    <span>{t('menu3')}</span>
                  </NavigationLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>

          <SidebarGroupLabel>魔王城</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavigationLink href="/team">
                    <Podcast />
                    <span>大廳</span>
                  </NavigationLink>
                </SidebarMenuButton>
                <SidebarMenuButton asChild>
                  <NavigationLink href="/battle">
                    <TowerControl />
                    <span>魔獄塔</span>
                  </NavigationLink>
                </SidebarMenuButton>
                <SidebarMenuButton asChild>
                  <NavigationLink href="/simulate">
                    <Hourglass />
                    <span>時裂</span>
                  </NavigationLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
