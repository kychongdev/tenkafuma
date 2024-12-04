'use client';

import { redirect } from '@/app/i18n/routing';
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from '@/components/ui/chat/chat-bubble';
import { ChatInput } from '@/components/ui/chat/chat-input';
import { ChatMessageList } from '@/components/ui/chat/chat-message-list';
import { createClient } from '@/supabase/client';
import { useLocale } from 'next-intl';

export default function Page() {
  // const supabase = createClient();
  // const locale = useLocale();
  // const user = await supabase.auth.getUser();
  // if (!user) {
  //   return redirect({ href: '/register', locale });
  // }
  // const { data } = await supabase.from('chat').select('id,content,profile(*) ');
  return (
    <>
      <ChatMessageList>
        <ChatBubble variant="sent">
          <ChatBubbleAvatar fallback="US" />
          <ChatBubbleMessage variant="sent">
            Hello, how has your day been? I hope you are doing well.
          </ChatBubbleMessage>
        </ChatBubble>
        <ChatBubble variant="received">
          <ChatBubbleAvatar fallback="AI" />
          <ChatBubbleMessage variant="received">
            Hi, I am doing well, thank you for asking. How can I help you today?
          </ChatBubbleMessage>
        </ChatBubble>
        <ChatBubble variant="received">
          <ChatBubbleAvatar fallback="AI" />
          <ChatBubbleMessage isLoading />
        </ChatBubble>
      </ChatMessageList>
      <ChatInput placeholder="Type your message here..." />
    </>
  );
}
