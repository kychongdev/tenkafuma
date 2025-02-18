import { FormMessage, Message } from "@/components/FormMessage";
import { SubmitButton } from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { resetPasswordAction } from "../../actions";
import { getTranslations } from "next-intl/server";

export default async function ResetPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  const t = await getTranslations("LoginPage");
  return (
    <form className="flex-1 flex flex-col w-full gap-2 text-foreground [&>input]:mb-6 min-w-64 max-w-72 mx-auto mt-8">
      <h1 className="text-2xl font-medium">{t("Reset Password")}</h1>
      <p className="text-sm text-foreground/60">
        {t("Please enter your new password below")}
      </p>
      <Label htmlFor="password">{t("New password")}</Label>
      <Input
        type="password"
        name="password"
        required
      />
      <Label htmlFor="confirmPassword">{t("Confirm password")}</Label>
      <Input
        type="password"
        name="confirmPassword"
        required
      />
      <SubmitButton formAction={resetPasswordAction}>
        {t("Reset Password")}
      </SubmitButton>
      <FormMessage message={searchParams} />
    </form>
  );
}
