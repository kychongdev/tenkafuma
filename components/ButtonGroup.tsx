"use client";

import { redirect } from "@/app/i18n/routing";
import { Button } from "./ui/button";
import { useLocale } from "next-intl";
import { useSidebar } from "./ui/sidebar";

export const ButtonGroup = () => {
  const locale = useLocale();
  const { toggleSidebar } = useSidebar();
  return (
    <div className="grid grid-cols-2 gap-2">
      <Button
        onClick={() => {
          toggleSidebar();
          redirect({ href: "/login", locale });
        }}
      >
        Sign In
      </Button>
      <Button
        onClick={() => {
          toggleSidebar();
          redirect({ href: "/register", locale });
        }}
      >
        Register
      </Button>
    </div>
  );
};
