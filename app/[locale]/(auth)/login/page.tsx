import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInAction } from "../actions";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { createClient } from "@/supabase/server";
import { redirect } from "@/app/i18n/routing";
import { getLocale, getTranslations } from "next-intl/server";

type Message = { success: string } | { error: string } | { message: string };

export default async function LoginForm(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  const locale = await getLocale();
  const supabase = await createClient();
  const t = await getTranslations("LoginPage");

  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log(user);

  if (user) {
    return redirect({ href: "/", locale });
  }
  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <Card className="mx-auto max-w-sm min-w-[300px]">
        <CardHeader>
          <CardTitle className="text-2xl">{t("Login")}</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">{t("Email")}</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">{t("Password")}</Label>
                  <Link
                    href="/forgot-password"
                    className="ml-auto inline-block text-sm underline"
                  >
                    {t("Forgot Password")}
                  </Link>
                </div>
                <Input id="password" type="password" name="password" required />
              </div>
              <Button
                formAction={signInAction}
                type="submit"
                className="w-full"
              >
                {t("Login")}
              </Button>
              {"error" in searchParams
                ? (
                  <Alert className="bg-red-500">
                    <AlertDescription>{searchParams.error}</AlertDescription>
                  </Alert>
                )
                : null}
            </div>
            <div className="mt-4 text-center text-sm">
              <Link href="/register" className="underline">
                {t("Register")}
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
