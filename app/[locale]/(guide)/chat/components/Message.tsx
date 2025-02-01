import { Imessage, useMessage } from "../store/Message";
import React from "react";
import Image from "next/image";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useUser } from "../store/User";

const CurrentUserMessage = ({ message }: { message: Imessage }) => {
  return (
    <div className="flex gap-2">
      <div className="flex-1 overflow-x-hidden">
        <div className="flex items-center justify-between">
          <h1 className="flex text-xs text-secondary-foreground gap-2">
            <div className="flex items-center">
              {new Date(message.created_at).toLocaleString() + " " +
                (message.is_edit ? "Edited" : "")}
            </div>

            <MessageMenu message={message} />
          </h1>
          <h1 className="font-bold text-right">{message.sent_by?.name}</h1>
        </div>
        <p className="break-words font-medium border border-primary rounded-3xl px-2 ml-auto w-fit bg-white text-black">
          {message.text}
        </p>
      </div>
      <div>
        <Image
          src={message.sent_by?.avatar ?? "/icons/enemy.png"}
          alt={message.sent_by?.name! ?? "unknown"}
          width={40}
          height={40}
          className="rounded-full shadow-xl"
        />
      </div>
    </div>
  );
};

const Message = ({ message }: { message: Imessage }) => {
  const user = useUser((state) => state.user);
  const name = message.sent_by?.name
    ? message.sent_by?.name
    : message.users?.name ?? "Can't Load";
  const image = message.sent_by?.avatar
    ? message.sent_by?.avatar
    : message.users?.avatar ?? "/icons/enemy.png";

  return (
    <>
      {message.sent_by?.id === user?.id
        ? <CurrentUserMessage message={message} />
        : (
          <div className="flex gap-2">
            <div>
              <Image
                src={image}
                alt={name}
                width={40}
                height={40}
                className="rounded-full shadow-xl"
              />
            </div>
            <div className="flex-1 overflow-x-hidden">
              <div className="flex items-center justify-between">
                <h1 className="font-bold">
                  {name}
                </h1>
                <h1 className="text-xs text-secondary-foreground">
                  {new Date(message.created_at).toLocaleString() + " " +
                    (message.is_edit ? "Edited" : "")}
                </h1>
              </div>
              <p className="break-words font-medium border border-primary rounded-3xl px-2 w-fit bg-white text-black">
                {message.text}
              </p>
            </div>
          </div>
        )}
    </>
  );
};

const MessageMenu = ({ message }: { message: Imessage }) => {
  const setActionMessage = useMessage((state) => state.setActionMessage);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreHorizontal />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Action</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            document.getElementById("trigger-edit")?.click();
            setActionMessage(message);
          }}
        >
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            document.getElementById("trigger-delete")?.click();
            setActionMessage(message);
          }}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Message;
