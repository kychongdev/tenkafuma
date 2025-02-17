import { Card, CardContent } from "@/components/ui/card";
import { CharacterTeam } from "../_types/Select";
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
import { useLocalStorage } from "@uidotdev/usehooks";
import { useGameState } from "../_core/GameState";

export const CharTeamCard = ({
  team,
  index,
}: { team: CharacterTeam; index: number }) => {
  const t = useTranslations("Team");
  const router = useRouter();
  const [_team, setTeam] = useLocalStorage<CharacterTeam[]>("team", []);
  const initBattle = useGameState((state) => state.initBattle);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Card>
          <CardContent className="p-2 w-full flex items-center">
            <div className="grid grid-cols-5 gap-2">
              <Image
                className="h-full rounded-md"
                src={`/characters/square/${
                  team["0"].id !== "" && team["0"].id !== undefined &&
                    team["0"].id !== null
                    ? team["0"].id
                    : "char_nr"
                }.png`}
                width={70}
                height={70}
                alt=""
                priority
              />
              <Image
                className="h-full rounded-md"
                src={`/characters/square/${
                  team["1"].id !== "" && team["1"].id !== undefined &&
                    team["1"].id !== null
                    ? team["1"].id
                    : "char_nr"
                }.png`}
                width={70}
                height={70}
                alt=""
                priority
              />
              <Image
                className="h-full rounded-md"
                src={`/characters/square/${
                  team["2"].id !== "" && team["2"].id !== undefined &&
                    team["2"].id !== null
                    ? team["2"].id
                    : "char_nr"
                }.png`}
                width={70}
                height={70}
                alt=""
                priority
              />
              <Image
                className="h-full rounded-md"
                src={`/characters/square/${
                  team["3"].id !== "" && team["3"].id !== undefined &&
                    team["3"].id !== null
                    ? team["3"].id
                    : "char_nr"
                }.png`}
                width={70}
                height={70}
                alt=""
                priority
              />
              <Image
                className="h-full rounded-md"
                src={`/characters/square/${
                  team["4"].id !== "" && team["4"].id !== undefined &&
                    team["4"].id !== null
                    ? team["4"].id
                    : "char_nr"
                }.png`}
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
              //console.log('testttt', _team[index]);
              initBattle(_team[index]);
              router.push(`/battle/`);
            }}
          >
            {t("Battle")}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push(`/team/edit/${index}`)}>
            {t("Edit")}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setTeam((prev) => prev.filter((_, i) => i !== index));
            }}
          >
            {t("Delete")}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
