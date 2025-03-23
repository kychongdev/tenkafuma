import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import _ from "lodash";
import stages from "../(battle)/data/stage.json";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { useGameState } from "../(battle)/GameState";

interface Stage {
  name: string;
  value: string;
  available: boolean;
}

export function StagesDrawer() {
  const t = useTranslations("Battle");
  const s = _.values(stages);
  const initStage = useGameState((stage) => stage.initStage);
  const [open, setOpen] = useState(false);
  const [selectedStage, setSelectedStage] = useState("");
  return (
    <Drawer open={open} onOpenChange={setOpen} autoFocus={open}>
      <DrawerTrigger asChild>
        <div className="flex flex-col justify-center items-center">
          <Button
            onClick={() => setOpen(true)}
            className="w-full text-bold text-black"
          >
            {t("Stages")}
          </Button>
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm ">
          <DrawerHeader className="pt-4 pb-2">
            <DrawerTitle className="flex items-center justify-center">
              Stages
            </DrawerTitle>
          </DrawerHeader>
          <div className="p-4">
            <Select
              value={selectedStage}
              onValueChange={(v) => {
                setSelectedStage(v);
              }}
            >
              <SelectTrigger className="">
                <SelectValue placeholder="Select Stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {s.map((stage) => (
                    <SelectItem key={stage.id} value={stage.id}>
                      {stage.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {
            //@ts-ignore
            stages[selectedStage]?.stages.map((stage: Stage) => (
              <div key={stage.value} className="px-4 pb-2">
                <Button
                  onClick={() => {
                    initStage(stage.value);
                    setOpen(false);
                  }}
                  className="w-full text-bold text-black"
                >
                  {stage.name}
                </Button>
              </div>
            ))
          }
        </div>
      </DrawerContent>
    </Drawer>
  );
}
