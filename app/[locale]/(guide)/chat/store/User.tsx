//import { User } from "@supabase/supabase-js";
import { create } from "zustand";

interface UserState {
  user:
    | {
        id: string;
        avatar: string;
        created_at: string;
        name: string;
      }
    | undefined;
}

export const useUser = create<UserState>()((set) => ({
  user: undefined,
}));
