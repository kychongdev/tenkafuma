import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { UseFormReturn } from 'react-hook-form';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useState } from 'react';
import characters from '@/data/characters.json';
import _ from 'lodash';
import { CharacterTeam } from '@/types/Select';

interface CharFilterDrawerProps {
  position: 0 | 1 | 2 | 3 | 4;
  useForm: UseFormReturn<CharacterTeam>;
  char: string;
}

export const CharFilterDrawer = ({
  useForm,
  position,
  char,
}: CharFilterDrawerProps) => {
  const { setValue } = useForm;
  const [open, setOpen] = useState(false);
  const charList = _.pickBy(characters, (value) => {
    return value.available;
  });

  const c = _.values(charList);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <div className="flex flex-col justify-center items-center">
          <Image
            className="rounded-md"
            src={`/characters/square/${char !== '' && char !== undefined && char !== null ? char : 'char_nr'}.png`}
            width={120}
            height={120}
            alt=""
          />

          <div className="font-bold text-sm text-center dark:text-white">
            {char !== '' &&
            char !== undefined &&
            char !== null &&
            charList[char] !== undefined &&
            charList[char] !== null
              ? charList[char].name
              : ''}
          </div>
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm ">
          <DrawerHeader>
            <DrawerTitle className="mb-2 flex items-center justify-center">
              Select Character
            </DrawerTitle>
            <div className="flex flex-row gap-2 flex-wrap">
              {c.map((char) => {
                return (
                  <Avatar
                    className="w-12 h-12"
                    key={char.id}
                    onClick={() => {
                      setValue(`${position}.id`, char.id.toString());
                      setOpen(false);
                    }}
                  >
                    <AvatarImage
                      src={`/characters/square/${char.id}.png`}
                      alt={char.name}
                    />
                    <AvatarFallback>{char.name}</AvatarFallback>
                  </Avatar>
                );
              })}
            </div>
          </DrawerHeader>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
