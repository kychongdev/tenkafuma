"use client";
import { Imessage, useMessage } from "../store/Message";
import React, { useEffect, useRef, useState } from "react";
import Message from "./Message";
import { DeleteAlert, EditAlert } from "./MessageAction";
import { toast } from "sonner";
import { ArrowDown } from "lucide-react";
import LoadMoreMessages from "./LoadMoreMessage";
import { createClient } from "@/supabase/client";

const MessagesList = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [userScrolled, setUserScrolled] = useState(false);
  const [notification, setNotification] = useState(0);
  const {
    messages,
    addMessage,
    optimisticIds,
    optimisticDeleteMessage,
    optimisticUpdateMessage,
  } = useMessage((state) => state);
  const supabase = createClient();

  useEffect(() => {
    const channel = supabase
      .channel("cn_chat")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "cn_chat" },
        async (payload) => {
          console.log(payload);
          console.log(optimisticIds);
          if (!optimisticIds.includes(payload.new.id)) {
            const { error, data } = await supabase
              .from("profiles")
              .select("*")
              .eq("id", payload.new.sent_by)
              .single();
            if (error) {
              toast.error(error.message);
            } else {
              console.log("success", data);
              const newMessage = {
                ...payload.new,
                users: data,
              };
              addMessage(newMessage as unknown as Imessage);
            }
          }
          const scrollContainer = scrollRef.current;
          if (
            scrollContainer.scrollTop <
            scrollContainer.scrollHeight - scrollContainer.clientHeight - 10
          ) {
            setNotification((current) => current + 1);
          }
        },
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "cn_chat" },
        (payload) => {
          optimisticDeleteMessage(payload.old.id);
        },
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "cn_chat" },
        (payload) => {
          optimisticUpdateMessage(payload.new as Imessage);
        },
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer && !userScrolled) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  const handleOnScroll = () => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      const isScroll =
        scrollContainer.scrollTop <
        scrollContainer.scrollHeight - scrollContainer.clientHeight - 10;
      setUserScrolled(isScroll);
      if (
        scrollContainer.scrollTop ===
        scrollContainer.scrollHeight - scrollContainer.clientHeight
      ) {
        setNotification(0);
      }
    }
  };
  const scrollDown = () => {
    setNotification(0);
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  };

  return (
    <>
      <div
        className="flex-1 flex flex-col p-5 h-full overflow-y-auto"
        ref={scrollRef}
        onScroll={handleOnScroll}
      >
        <div className="flex-1 pb-5 ">
          <LoadMoreMessages />
        </div>
        <div className=" space-y-7">
          {messages.map((value, index) => {
            return <Message key={index} message={value} />;
          })}
        </div>

        <DeleteAlert />
        <EditAlert />
      </div>
      {userScrolled && (
        <div className="absolute bottom-32 w-full">
          {notification ? (
            <div
              className="mx-auto w-fit text-sm font-semibold bg-secondary p-2 rounded-full ring-2 ring-current cursor-pointer"
              onClick={scrollDown}
            >
              <h1>
                {notification} new {notification > 1 ? "messages!" : "message!"}
              </h1>
            </div>
          ) : (
            <div
              className="w-10 h-10 bg-background rounded-full justify-center items-center flex mx-auto ring-2 ring-current cursor-pointer hover:scale-110 transition-all"
              onClick={scrollDown}
            >
              <ArrowDown />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default MessagesList;
