"use client";

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { type ComponentProps } from "react";
import { useFormStatus } from "react-dom";

type Props = ComponentProps<typeof Button> & {
  pendingText?: string;
};

export function SubmitButton({
  children,
  pendingText = "Submitting",
  ...props
}: Props) {
  const t = useTranslations("LoginPage");
  const { pending } = useFormStatus();

  return (
    <Button type="submit" aria-disabled={pending} {...props}>
      {pending
        ? t(pendingText) +
          "..."
        : children}
    </Button>
  );
}
