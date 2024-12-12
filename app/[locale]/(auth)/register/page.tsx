import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInAction, signUpAction } from "../actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { createClient } from "@/supabase/server";
import { redirect } from "@/app/i18n/routing";
import { getLocale } from "next-intl/server";

type Message = { success: string } | { error: string } | { message: string };

export default async function RegisterForm(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  const locale = await getLocale();
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log(user);

  //if (!user) {
  //  return redirect({ href: "/login", locale });
  //}
  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>
            Enter your info below to register an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" type="text" name="name" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
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
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" name="password" required />
              </div>
              <Button
                formAction={signUpAction}
                type="submit"
                className="w-full"
              >
                Register
              </Button>
              {"error" in searchParams ? (
                <Alert className="bg-red-500">
                  <AlertDescription>{searchParams.error}</AlertDescription>
                </Alert>
              ) : null}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
