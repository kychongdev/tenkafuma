import { getFromAndTo } from "../utils/getFromAndTo";
import { useMessage } from "../store/Message";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { createClient } from "@/supabase/client";
import { LIMIT_MESSAGE } from "../Constants";

const LoadMoreMessages = () => {
  const page = useMessage((state) => state.page);
  const setMessages = useMessage((state) => state.setMessages);
  const hasMore = useMessage((state) => state.hasMore);
  const fetchMore = async () => {
    const { from, to } = getFromAndTo(page, LIMIT_MESSAGE);
    const supabase = createClient();
    const { data, error } = await supabase
      .from("cn_chat")
      .select("*,sent_by(*)")
      .range(from, to)
      .order("created_at", { ascending: false });

    if (error) {
      toast.error(error.message);
    } else {
      setMessages(data.reverse());
    }
  };

  if (hasMore) {
    return (
      <Button variant="secondary" className="w-full" onClick={fetchMore}>
        Load More
      </Button>
    );
  }
  return <></>;
};

export default LoadMoreMessages;
