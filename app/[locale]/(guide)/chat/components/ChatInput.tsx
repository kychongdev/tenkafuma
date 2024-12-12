"use client";

import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "../store/User";
import { Imessage, useMessage } from "../store/Message";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/supabase/client";

const ChatInput = () => {
  const user = useUser((state) => state.user);
  const addMessage = useMessage((state) => state.addMessage);
  const setOptimisticIds = useMessage((state) => state.setOptimisticIds);
  const supabase = createClient();
  console.log("test", user);
  const handleSendMessage = async (text: string) => {
    if (text.trim()) {
      const id = uuidv4();
      const newMessage = {
        id,
        text,
        sent_by: {
          id: user?.id,
          avatar: user?.user_metadata.avatar,
          created_at: new Date().toISOString(),
          name: user?.user_metadata.name,
        },
        is_edit: false,
        created_at: new Date().toISOString(),
      };
      console.log("test2", user);

      addMessage(newMessage as Imessage);
      setOptimisticIds(newMessage.id);
      const { error } = await supabase.from("cn_chat").insert({ text, id });
      if (error) {
        toast.error("Sorry, this message couldn't be delivered.");
      }
    } else {
      toast.error("Message can not be empty!!");
    }
  };

  return (
    <div className="p-5 border-t">
      <Textarea
        className="resize-none ring-2 ring-primary-foreground"
        placeholder="Send Message 💬🚀"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSendMessage(e.currentTarget.value);
            e.currentTarget.value = "";
          }
        }}
      />
    </div>
  );
};

export default ChatInput;
