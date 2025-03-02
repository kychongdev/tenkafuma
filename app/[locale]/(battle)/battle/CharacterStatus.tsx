import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGameState } from "@/core/GameState";
import { parseSkillName } from "../_core/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CharacterStats } from "./CharacterStats";

export function CharacterStatus({ position }: { position: number }) {
  const character = useGameState((state) => state.characters[position]);
  const charBuff = useGameState((state) => state.characters[position].buff);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="py-0 h-6 my-1 w-full">狀態</Button>
      </DialogTrigger>
      <DialogContent className="p-3 sm:max-w-[425px]">
        <DialogHeader hidden>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="account" className="w-full">
          <TabsContent value="buff" className="">
            <ScrollArea className="grid gap-1 h-96">
              {character.buff.map((buff, index) => {
                return (
                  <div
                    key={buff.id + index}
                    className="grid grid-cols-10"
                    onClick={() => {
                      console.log(buff);
                    }}
                  >
                    <Card className="p-2 align-middle  text-sm col-span-9">
                      {parseSkillName(buff, charBuff)}
                    </Card>
                    <Card className="p-2 text-sm text-center">
                      {buff.duration === 100 ? "-" : buff.duration}
                    </Card>
                  </div>
                );
              })}
            </ScrollArea>
          </TabsContent>
          <TabsContent value="stat">
            <CharacterStats character={character} />
          </TabsContent>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="buff">Buff</TabsTrigger>
            <TabsTrigger value="stat">Status</TabsTrigger>
          </TabsList>
        </Tabs>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
