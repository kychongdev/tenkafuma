import { Suspense } from "react";
import MessagesList from "./MessageList";
import InitMessages from "../store/InitMessage";
import { LIMIT_MESSAGE } from "../Constants";
import { createClient } from "@/supabase/client";
import { getLocale } from "next-intl/server";

const ChatMessages = async () => {
  const supabase = createClient();
  const locale = await getLocale();
  const { data } = await supabase
    .from(`${locale}_chat`)
    .select("*,sent_by(*)")
    .range(0, LIMIT_MESSAGE)
    .order("created_at", { ascending: false });

  return (
    <Suspense fallback={"Loading..."}>
      <InitMessages messages={data?.reverse() || []} />
      <MessagesList />
    </Suspense>
  );
};

export default ChatMessages;
