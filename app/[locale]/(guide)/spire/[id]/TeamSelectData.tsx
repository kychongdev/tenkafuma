import { Card, CardContent } from "@/components/ui/card";
import { CharacterTeamData } from "./page";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import characters from "@/data/characters.json";
import _ from "lodash";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CharacterAttribute } from "@/app/[locale]/(battle)/types/Character";

export const TeamSelectData = ({ data }: { data: CharacterTeamData }) => {
  const charList = _.pickBy(characters, (value) => {
    return value;
  });
  const actionList = _.chunk(data.action, 5);
  console.log(actionList);
  return (
    <div className="mb-2">
      <div className="text-sm flex justify-between px-2">
        <div>{data.profiles.name}</div>

        <div>
          {new Date(data.created_at).toLocaleDateString()}{" "}
          {new Date(data.created_at).toLocaleTimeString()}
        </div>
      </div>

      <Dialog>
        <DialogTrigger className="">
          <Card>
            <CardContent className="p-2 w-full flex items-center">
              <div className="grid grid-cols-5 gap-2">
                <div className="relative">
                  <Image
                    className="h-full rounded-md"
                    src={`/characters/square/${data.select[0].id}.png`}
                    width={70}
                    height={70}
                    alt={data.select[0].id}
                    priority
                  />
                  <div className="absolute right-1 bottom-1 font-bold bg-red-500 px-1 text-sm">
                    {data.select[0].bond}
                  </div>
                </div>

                <div className="relative">
                  <Image
                    className="h-full rounded-md"
                    src={`/characters/square/${data.select[1].id}.png`}
                    width={70}
                    height={70}
                    alt={data.select[1].id}
                    priority
                  />
                  <div className="absolute right-1 bottom-1 font-bold bg-red-500 px-1 text-sm">
                    {data.select[1].bond}
                  </div>
                </div>
                <div className="relative">
                  <Image
                    className="h-full rounded-md"
                    src={`/characters/square/${data.select[2].id}.png`}
                    width={70}
                    height={70}
                    alt={data.select[2].id}
                    priority
                  />

                  <div className="absolute right-1 bottom-1 font-bold bg-red-500 px-1 text-sm">
                    {data.select[2].bond}
                  </div>
                </div>
                <div className="relative">
                  <Image
                    className="h-full rounded-md"
                    src={`/characters/square/${data.select[3].id}.png`}
                    width={70}
                    height={70}
                    alt={data.select[3].id}
                    priority
                  />
                  <div className="absolute right-1 bottom-1 font-bold bg-red-500 px-1 text-sm">
                    {data.select[3].bond}
                  </div>
                </div>
                <div className="relative">
                  <Image
                    className="h-full rounded-md"
                    src={`/characters/square/${data.select[4].id}.png`}
                    width={70}
                    height={70}
                    alt={data.select[4].id}
                    priority
                  />
                  <div className="absolute right-1 bottom-1 font-bold bg-red-500 px-1 text-sm">
                    {data.select[4].bond}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </DialogTrigger>
        <DialogContent className="w-[350px]">
          <DialogHeader>
            <DialogTitle>{charList[data.select[0].id].name}隊長</DialogTitle>
          </DialogHeader>
          <div>
            <div className="text-sm">
              <Badge
                className={parseColor(charList[data.select[0].id].attribute)}
              >
                {charList[data.select[0].id].name}
              </Badge>
              <Separator className="my-1" />
              <div className="flex flex-wrap gap-2">
                <Badge className="px-1">{data.select[0].bond}辦</Badge>
                <Badge className="px-1">{data.select[0].stars}星</Badge>
                <Badge className="px-1">{data.select[0].level}級</Badge>
                <Badge className="px-1">{data.select[0].hpPot}%HP</Badge>
                <Badge className="px-1">{data.select[0].atkPot}%攻</Badge>
                <Badge className="px-1">{data.select[0].discipline}寢</Badge>
              </div>
            </div>

            <Separator className="my-1 h-[3px]" />
            <div className="text-sm">
              <Badge
                className={parseColor(charList[data.select[1].id].attribute)}
              >
                {charList[data.select[1].id].name}
              </Badge>
              <Separator className="my-1" />
              <div className="flex flex-wrap gap-2">
                <Badge className="px-1">{data.select[1].bond}辦</Badge>
                <Badge className="px-1">{data.select[1].stars}星</Badge>
                <Badge className="px-1">{data.select[1].level}級</Badge>
                <Badge className="px-1">{data.select[1].hpPot}%HP</Badge>
                <Badge className="px-1">{data.select[1].atkPot}%攻</Badge>
                <Badge className="px-1">{data.select[1].discipline}寢</Badge>
              </div>
            </div>

            <Separator className="my-1 h-[3px]" />
            <div className="text-sm">
              <Badge
                className={parseColor(charList[data.select[2].id].attribute)}
              >
                {charList[data.select[2].id].name}
              </Badge>
              <Separator className="my-1" />
              <div className="flex flex-wrap gap-2">
                <Badge className="px-1">{data.select[2].bond}辦</Badge>
                <Badge className="px-1">{data.select[2].stars}星</Badge>
                <Badge className="px-1">{data.select[2].level}級</Badge>
                <Badge className="px-1">{data.select[2].hpPot}%HP</Badge>
                <Badge className="px-1">{data.select[2].atkPot}%攻</Badge>
                <Badge className="px-1">{data.select[2].discipline}寢</Badge>
              </div>
            </div>

            <Separator className="my-1 h-[3px]" />
            <div className="text-sm">
              <Badge
                className={parseColor(charList[data.select[3].id].attribute)}
              >
                {charList[data.select[3].id].name}
              </Badge>
              <Separator className="my-1" />
              <div className="flex flex-wrap gap-2">
                <Badge className="px-1">{data.select[3].bond}辦</Badge>
                <Badge className="px-1">{data.select[3].stars}星</Badge>
                <Badge className="px-1">{data.select[3].level}級</Badge>
                <Badge className="px-1">{data.select[3].hpPot}%HP</Badge>
                <Badge className="px-1">{data.select[3].atkPot}%攻</Badge>
                <Badge className="px-1">{data.select[3].discipline}寢</Badge>
              </div>
            </div>

            <Separator className="my-1 h-[3px]" />
            <div className="text-sm">
              <Badge
                className={parseColor(charList[data.select[4].id].attribute)}
              >
                {charList[data.select[4].id].name}
              </Badge>
              <Separator className="my-1" />
              <div className="flex flex-wrap gap-2">
                <Badge className="px-1">{data.select[4].bond}辦</Badge>
                <Badge className="px-1">{data.select[4].stars}星</Badge>
                <Badge className="px-1">{data.select[4].level}級</Badge>
                <Badge className="px-1">{data.select[4].hpPot}%HP</Badge>
                <Badge className="px-1">{data.select[4].atkPot}%攻</Badge>
                <Badge className="px-1">{data.select[4].discipline}寢</Badge>
              </div>
            </div>

            <Separator className="my-1 h-[3px]" />
            {actionList.map((action, index) => {
              return (
                <div className="grid grid-cols-6">
                  T{index + 1}:
                  {action.map((x, i) => {
                    // @ts-ignore
                    const a = JSON.parse(x);
                    return (
                      <div className="items-center">
                        <div className="text-sm">
                          {parseActionName(a.position)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

function parseActionName(action: number) {
  switch (action) {
    case 0:
      return "1普攻";
    case 1:
      return "2普攻";
    case 2:
      return "3普攻";
    case 3:
      return "4普攻";
    case 4:
      return "5普攻";
    case 5:
      return "1必殺";
    case 6:
      return "2必殺";
    case 7:
      return "3必殺";
    case 8:
      return "4必殺";
    case 9:
      return "5必殺";
  }
}

function parseColor(attr: CharacterAttribute) {
  switch (attr) {
    case CharacterAttribute.DARK:
      return "bg-purple-600";
    case CharacterAttribute.LIGHT:
      return "bg-yellow-600";
    case CharacterAttribute.WATER:
      return "bg-blue-600";
    case CharacterAttribute.FIRE:
      return "bg-red-600";
    case CharacterAttribute.WIND:
      return "bg-green-600";
    default:
      return "";
  }
}
