import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { useState } from 'react';
import _ from 'lodash';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';

export const BattleControlDrawer = () => {
  const [open, setOpen] = useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <div className="flex flex-col justify-center items-center">
          <Button
            onClick={() => setOpen(true)}
            className="w-full text-bold text-black"
          >
            Control
          </Button>
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm ">
          <DrawerHeader>
            <DrawerTitle
              hidden
              className="mb-2 flex items-center justify-center"
            ></DrawerTitle>
            <div className="flex flex-col gap-2 ">
              <div className="flex items-center space-x-2">
                <Checkbox />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Disable Enemy Turn
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Enemy Deal Damage to All
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Enemy Deal Damage to Random
                </label>
              </div>
              <Separator className="my-1" />
            </div>
          </DrawerHeader>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
