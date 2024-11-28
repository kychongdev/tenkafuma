import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useGameState } from '@/core/GameState';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BookA } from 'lucide-react';

export function BattleLog() {
  const battleLog = useGameState((state) => state.battle_log);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">
          <BookA />
        </Button>
      </DialogTrigger>
      <DialogContent className="p-3 sm:max-w-[425px]">
        <DialogHeader hidden>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <ScrollArea className="grid gap-1 h-96">
          {battleLog.map((log, index) => {
            return (
              <div key={log + index} className="grid ">
                <Card className="p-2 text-sm ">{log}</Card>
              </div>
            );
          })}
        </ScrollArea>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
