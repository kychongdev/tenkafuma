import { createClient } from "@/supabase/server";
import InitUser from "./store/InitUser";
import ChatMessages from "./components/ChatMessage";
import ChatInput from "./components/ChatInput";
import { getLocale } from "next-intl/server";
import { redirect } from "@/app/i18n/routing";

export default async function Page() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", data.user?.id)
    .single();
  const locale = await getLocale();
  //if (data) {
  //}
  console.log(data);
  if (!data.user) {
    redirect({ href: "/login", locale });
    return <div>Redirecting to Login...</div>;
  }

  return (
    <>
      <div className="w-full mx-auto md:max-w-[600px] font-[family-name:var(--font-geist-sans)]">
        <div className="h-full border rounded-xl flex flex-col relative shadow-2xl shadow-primary-foreground">
          {data.user ? (
            <>
              <ChatMessages />
              <ChatInput />
            </>
          ) : null}
        </div>
        {profile ? <InitUser user={profile} /> : null}
      </div>
    </>
  );
}
