import { createClient } from "@/supabase/server";
import InitUser from "./store/InitUser";
import ChatMessages from "./components/ChatMessage";
import ChatInput from "./components/ChatInput";

export default async function Page() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (data) {
  }
  console.log(data);
  if (!data.user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="max-w-3xl md:py-10 h-screen">
        <div className="h-full border rounded-xl flex flex-col relative shadow-2xl shadow-primary-foreground">
          {data.user ? (
            <>
              <ChatMessages />
              <ChatInput />
            </>
          ) : null}
        </div>
        <InitUser user={data.user} />
      </div>
    </>
  );
}
