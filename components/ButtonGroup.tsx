"use client";

import { redirect } from "@/app/i18n/routing";
import { Button } from "./ui/button";
import { useLocale, useTranslations } from "next-intl";
import { useSidebar } from "./ui/sidebar";

export const ButtonGroup = () => {
  const locale = useLocale();
  const { toggleSidebar } = useSidebar();
  const t = useTranslations("AppSidebar");
  return (
    <Button
      onClick={() => {
        toggleSidebar();
        redirect({ href: "/login", locale });
      }}
    >
      {t("sign-in-button")}
    </Button>
  );
};
