import { Suspense } from "react";
import MessagesList from "./MessageList";
import InitMessages from "../store/InitMessage";
import { LIMIT_MESSAGE } from "../Constants";
import { createClient } from "@/supabase/client";

const ChatMessages = async () => {
  const supabase = createClient();
  const { data } = await supabase
    .from("cn_chat")
    .select("*,sent_by(*)")
    .range(0, LIMIT_MESSAGE)
    .order("created_at", { ascending: false });

  //.range(0, LIMIT_MESSAGE)
  //.order("created_at", { ascending: false });
  console.log(data);

  return (
    <Suspense fallback={"Loading..."}>
      <MessagesList />
      <InitMessages messages={data?.reverse() || []} />
    </Suspense>
  );
};

export default ChatMessages;
