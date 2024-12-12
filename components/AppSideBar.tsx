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
  useSidebar,
} from "@/components/ui/sidebar";
import { Hourglass, Podcast, SwordsIcon, TowerControl } from "lucide-react";
import NavigationLink from "./default/NavigationLink";
import { getTranslations } from "next-intl/server";
import { createClient } from "@/supabase/server";
import { NavUser } from "./NavUser";
import { ButtonGroup } from "./ButtonGroup";

export async function AppSidebar() {
  const t = await getTranslations("AppSidebar");
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", data.user?.id)
    .single();

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t("menu-title")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavigationLink href="/team">
                    <SwordsIcon />
                    <span>{t("menu1")}</span>
                  </NavigationLink>
                </SidebarMenuButton>
                <SidebarMenuButton asChild>
                  <NavigationLink href="/battle">
                    <SwordsIcon />
                    <span>{t("menu2")}</span>
                  </NavigationLink>
                </SidebarMenuButton>
                <SidebarMenuButton asChild>
                  <NavigationLink href="/simulate">
                    <SwordsIcon />
                    <span>{t("menu3")}</span>
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
                  <NavigationLink href="/chat">
                    <Podcast />
                    <span>大廳</span>
                  </NavigationLink>
                </SidebarMenuButton>
                <SidebarMenuButton asChild>
                  <NavigationLink href="/spire">
                    <TowerControl />
                    <span>魔獄塔</span>
                  </NavigationLink>
                </SidebarMenuButton>
                <SidebarMenuButton asChild>
                  <NavigationLink href="/rift">
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
        {profile ? <NavUser user={profile} /> : <ButtonGroup />}
      </SidebarFooter>
    </Sidebar>
  );
}
