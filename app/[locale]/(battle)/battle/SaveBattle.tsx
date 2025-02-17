"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createClient } from "@/supabase/client";
import toast from "react-hot-toast";
import { useGameState } from "../_core/GameState";
import { Save } from "lucide-react";

import _ from "lodash";

export function SaveBattle() {
  console.log("SaveBattle");
  const supabase = createClient();
  const { stage, select, action, client_id } = useGameState();

  const saveBattle = async () => {
    if (!select) {
      toast.error("Could not find the team.");
      return;
    }
    const team = [
      select[0].id,
      select[1].id,
      select[2].id,
      select[3].id,
      select[4].id,
    ];
    const newMessage = {
      stage,
      select,
      action,
      client_id,
      team,
    };
    console.log("newMessage", newMessage);

    const { error } = await supabase.from("stage_team").insert(newMessage);
    console.log("error", error);
    if (error) {
      toast.error("Sorry, could not save this battle.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="p-2 bg-white text-black rounded">
        <Save />
      </DialogTrigger>
      <DialogContent className="w-[300px]">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            Do you want to save this battle?
          </DialogDescription>
        </DialogHeader>
        <DialogClose
          asChild
          onClick={() => {
            saveBattle();
          }}
        >
          <Button>
            Save
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
