import { createClient } from "@/supabase/server";
import InitUser from "./store/InitUser";
import ChatMessages from "./components/ChatMessage";
import ChatInput from "./components/ChatInput";
import { getLocale } from "next-intl/server";
import { redirect } from "@/app/i18n/routing";
import { ScrollArea } from "@/components/ui/scroll-area";

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
      <div className="w-full mx-auto md:max-w-[600px] font-[family-name:var(--font-geist-sans)] overscroll-none">
        {data.user
          ? (
            <>
              <ScrollArea className="w-full h-[80vh]">
                <ChatMessages />
              </ScrollArea>
              <ChatInput />
            </>
          )
          : null}
        {profile ? <InitUser user={profile} /> : null}
      </div>
    </>
  );
}
