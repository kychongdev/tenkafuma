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

export function StagesDrawer() {
  const t = useTranslations("Battle");
  const s = _.values(stages);
  const [open, setOpen] = useState(false);
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
            <Select>
              <SelectTrigger className="">
                <SelectValue placeholder="Select Stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {s.map((stage) => (
                    <SelectItem key={stage.name} value={stage.name}>
                      {stage.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
