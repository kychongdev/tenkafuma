import { SubmitButton } from "@/components/SubmitButton";
import { forgotPasswordAction } from "../actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { FormMessage, Message } from "@/components/FormMessage";
import { getTranslations } from "next-intl/server";

export default async function ForgotPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  const t = await getTranslations("LoginPage");
  return (
    <>
      <form className="flex-1 flex flex-col w-full gap-2 text-foreground [&>input]:mb-6 min-w-64 max-w-72 mx-auto mt-8">
        <div>
          <h1 className="text-2xl font-medium">{t("Reset Password")}</h1>
          <p className="text-sm text-secondary-foreground">
            {t("Already have an account")}?{" "}
            <Link className="text-primary underline" href="/login">
              {t("Login")}
            </Link>
          </p>
        </div>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="email">{t("Email")}</Label>
          <Input name="email" placeholder="you@example.com" required />
          <SubmitButton formAction={forgotPasswordAction}>
            {t("Reset Password")}
          </SubmitButton>
          <FormMessage message={searchParams} />
        </div>
      </form>
    </>
  );
}
