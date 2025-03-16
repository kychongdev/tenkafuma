import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useRouter } from "@/app/i18n/routing";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslations } from "next-intl";
import { useSimulateTeamState } from "../../../(simulate)/useSimulateState";

export const DisplaySelect = ({ index }: { index: number }) => {
  const t = useTranslations("Team");
  const router = useRouter();
  const teams = useSimulateTeamState((state) => state.teams);
  const team = teams[index].team;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Card>
          <CardContent className="p-2 w-full flex items-center">
            <div className="grid grid-cols-5 gap-2">
              <Image
                className="h-full rounded-md"
                src={`/characters/square/${team["0"].id !== "" && team["0"].id !== undefined && team["0"].id !== null ? team["0"].id : "char_nr"}.png`}
                width={70}
                height={70}
                alt=""
                priority
              />
              <Image
                className="h-full rounded-md"
                src={`/characters/square/${team["1"].id !== "" && team["1"].id !== undefined && team["1"].id !== null ? team["1"].id : "char_nr"}.png`}
                width={70}
                height={70}
                alt=""
                priority
              />
              <Image
                className="h-full rounded-md"
                src={`/characters/square/${team["2"].id !== "" && team["2"].id !== undefined && team["2"].id !== null ? team["2"].id : "char_nr"}.png`}
                width={70}
                height={70}
                alt=""
                priority
              />
              <Image
                className="h-full rounded-md"
                src={`/characters/square/${team["3"].id !== "" && team["3"].id !== undefined && team["3"].id !== null ? team["3"].id : "char_nr"}.png`}
                width={70}
                height={70}
                alt=""
                priority
              />
              <Image
                className="h-full rounded-md"
                src={`/characters/square/${team["4"].id !== "" && team["4"].id !== undefined && team["4"].id !== null ? team["4"].id : "char_nr"}.png`}
                width={70}
                height={70}
                alt=""
                priority
              />
            </div>
          </CardContent>
        </Card>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32">
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              router.push(`/simulate/select/${index}`);
            }}
          >
            調整練度模擬
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => {
              router.push(`/simulate/select/${index}`);
            }}
          >
            刪除所有紀錄
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
