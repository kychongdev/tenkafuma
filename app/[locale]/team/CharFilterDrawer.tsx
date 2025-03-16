import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { UseFormReturn } from "react-hook-form";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import characters from "@/data/characters.json";
import _ from "lodash";
import { Toggle } from "@/components/ui/toggle";
import toast from "react-hot-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CharacterTeam } from "../(battle)/types/Select";
import {
  CharacterAttribute,
  CharacterClass,
} from "../(battle)/types/Character";

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

  const [charClass, setCharClass] = useState<CharacterClass[]>([]);
  const [attribute, setAttribute] = useState<CharacterAttribute[]>([]);

  const charListFiltered = _.pickBy(charList, (value) => {
    if (charClass.length === 0 && attribute.length === 0) return true;
    if (charClass.length === 0) return attribute.includes(value.attribute);
    if (attribute.length === 0) return charClass.includes(value.class);
    return (
      charClass.includes(value.class) && attribute.includes(value.attribute)
    );
  });

  const c = _.values(charListFiltered);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <div className="flex flex-col justify-center items-center">
          <Image
            className="rounded-md"
            src={`/characters/square/${
              char !== "" && char !== undefined && char !== null
                ? char
                : "char_nr"
            }.png`}
            width={120}
            height={120}
            alt=""
          />

          <div className="font-bold text-sm text-center dark:text-white">
            {char !== "" &&
            char !== undefined &&
            char !== null &&
            charList[char] !== undefined &&
            charList[char] !== null
              ? charList[char].name
              : ""}
          </div>
        </div>
      </DrawerTrigger>
      <DrawerContent aria-describedby={undefined}>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle className="flex items-center justify-center">
              Select Character
            </DrawerTitle>
            <ScrollArea className="w-full h-72">
              <div className="grid grid-cols-6 gap-1 my-2 gap-y-3">
                {c.map((char) => {
                  if (!char.leader && position === 0) {
                    return null;
                  }
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
            </ScrollArea>
          </DrawerHeader>

          <div className="grid grid-cols-5 w-full mb-3 gap-y-1 px-3 gap-2">
            <Toggle
              pressed={attribute.includes(CharacterAttribute.FIRE)}
              onPressedChange={() => {
                setAttribute((prev) =>
                  prev.includes(CharacterAttribute.FIRE)
                    ? prev.filter((x) => x !== CharacterAttribute.FIRE)
                    : [...prev, CharacterAttribute.FIRE],
                );
              }}
              className="data-[state=on]:bg-red-500 border-white border-solid border rounded p-0"
            >
              <Image src="/icons/fire.jpg" width={30} height={30} alt="fire" />
            </Toggle>
            <Toggle
              pressed={attribute.includes(CharacterAttribute.WATER)}
              onPressedChange={() => {
                setAttribute((prev) =>
                  prev.includes(CharacterAttribute.WATER)
                    ? prev.filter((x) => x !== CharacterAttribute.WATER)
                    : [...prev, CharacterAttribute.WATER],
                );
              }}
              className="data-[state=on]:bg-blue-500 border-white border-solid border rounded p-0"
            >
              <Image
                src="/icons/water.jpg"
                width={30}
                height={30}
                alt="water"
              />
            </Toggle>
            <Toggle
              pressed={attribute.includes(CharacterAttribute.WIND)}
              onPressedChange={() => {
                setAttribute((prev) =>
                  prev.includes(CharacterAttribute.WIND)
                    ? prev.filter((x) => x !== CharacterAttribute.WIND)
                    : [...prev, CharacterAttribute.WIND],
                );
              }}
              className="data-[state=on]:bg-green-500 border-white border-solid border rounded p-0"
            >
              <Image src="/icons/wind.jpg" width={30} height={30} alt="wind" />
            </Toggle>
            <Toggle
              pressed={attribute.includes(CharacterAttribute.DARK)}
              onPressedChange={() => {
                setAttribute((prev) =>
                  prev.includes(CharacterAttribute.DARK)
                    ? prev.filter((x) => x !== CharacterAttribute.DARK)
                    : [...prev, CharacterAttribute.DARK],
                );
              }}
              className="data-[state=on]:bg-purple-500 border-white border-solid border rounded p-0"
            >
              <Image src="/icons/dark.jpg" width={30} height={30} alt="dark" />
            </Toggle>
            <Toggle
              pressed={attribute.includes(CharacterAttribute.LIGHT)}
              onPressedChange={() => {
                setAttribute((prev) =>
                  prev.includes(CharacterAttribute.LIGHT)
                    ? prev.filter((x) => x !== CharacterAttribute.LIGHT)
                    : [...prev, CharacterAttribute.LIGHT],
                );
              }}
              className="data-[state=on]:bg-yellow-500 border-white border-solid border rounded p-0"
            >
              <Image
                src="/icons/light.jpg"
                width={30}
                height={30}
                alt="light"
              />
            </Toggle>

            <Toggle
              pressed={charClass.includes(CharacterClass.ATTACKER)}
              onPressedChange={() => {
                setCharClass((prev) =>
                  prev.includes(CharacterClass.ATTACKER)
                    ? prev.filter((x) => x !== CharacterClass.ATTACKER)
                    : [...prev, CharacterClass.ATTACKER],
                );
              }}
              className="data-[state=on]:bg-zinc-500 border-white border-solid border rounded p-0"
            >
              <Image
                src="/icons/ui_attacker.png"
                width={30}
                height={30}
                alt="attacker"
              />
            </Toggle>
            <Toggle
              pressed={charClass.includes(CharacterClass.OBSTRUCTER)}
              onPressedChange={() => {
                setCharClass((prev) =>
                  prev.includes(CharacterClass.OBSTRUCTER)
                    ? prev.filter((x) => x !== CharacterClass.OBSTRUCTER)
                    : [...prev, CharacterClass.OBSTRUCTER],
                );
              }}
              className="data-[state=on]:bg-zinc-500 border-white border-solid border rounded p-0"
            >
              <Image
                src="/icons/ui_obsructer.png"
                width={30}
                height={30}
                alt="obsructer"
              />
            </Toggle>
            <Toggle
              pressed={charClass.includes(CharacterClass.PROTECTOR)}
              onPressedChange={() => {
                setCharClass((prev) =>
                  prev.includes(CharacterClass.PROTECTOR)
                    ? prev.filter((x) => x !== CharacterClass.PROTECTOR)
                    : [...prev, CharacterClass.PROTECTOR],
                );
              }}
              className="data-[state=on]:bg-zinc-500 border-white border-solid border rounded p-0"
            >
              <Image
                src="/icons/ui_protector.png"
                width={30}
                height={30}
                alt="protector"
              />
            </Toggle>
            <Toggle
              pressed={charClass.includes(CharacterClass.HEALER)}
              onPressedChange={() => {
                setCharClass((prev) =>
                  prev.includes(CharacterClass.HEALER)
                    ? prev.filter((x) => x !== CharacterClass.HEALER)
                    : [...prev, CharacterClass.HEALER],
                );
              }}
              className="data-[state=on]:bg-zinc-500 border-white border-solid border rounded p-0"
            >
              <Image
                src="/icons/ui_healer.png"
                width={30}
                height={30}
                alt="healer"
              />
            </Toggle>
            <Toggle
              pressed={charClass.includes(CharacterClass.SUPPORT)}
              onPressedChange={() => {
                setCharClass((prev) =>
                  prev.includes(CharacterClass.SUPPORT)
                    ? prev.filter((x) => x !== CharacterClass.SUPPORT)
                    : [...prev, CharacterClass.SUPPORT],
                );
              }}
              className="data-[state=on]:bg-zinc-500 border-white border-solid border rounded p-0"
            >
              <Image
                src="/icons/ui_supporter.png"
                width={30}
                height={30}
                alt="supporter"
              />
            </Toggle>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
