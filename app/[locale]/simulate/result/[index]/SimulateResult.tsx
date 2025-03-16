import { calculateDamageEachTurn } from "./calculateDamageEachTurn";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { DisplaySelect } from "./DisplaySelect";
import { Button } from "@/components/ui/button";
import { ChevronDown, Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { CharacterTeam } from "@/app/[locale]/backup/(battle)/_types/Select";
import { useParams } from "next/navigation";
import { useSimulateTeamState } from "../../../(simulate)/useSimulateState";
import {
  calculateDamageDifference,
  formatNumber,
  p,
  parseMoveSet,
} from "../../../(battle)/utils";

export function SimulateResult() {
  const params = useParams();
  const index = parseInt(params.index as string);
  console.log(index);
  const result = useSimulateTeamState((state) => state.teams[index]);
  const st = useSimulateTeamState((state) => state);
  console.log(p(st));
  console.log(result);
  const deleteAnalysis = useSimulateTeamState((state) => state.deleteAnalysis);
  const baseEachTurnResult = calculateDamageEachTurn(
    result.baseResult.damageLog1,
    result.baseResult.damageLog2,
    result.baseResult.damageLog3,
    result.baseResult.damageLog4,
    result.baseResult.damageLog5,
    result.turn,
  );

  const totalDamage = result.baseResult.damageLog1.reduce(
    (acc, cur) => acc + cur.damage,
    0,
  );
  const totalDamage2 = result.baseResult.damageLog2.reduce(
    (acc, cur) => acc + cur.damage,
    0,
  );
  const totalDamage3 = result.baseResult.damageLog3.reduce(
    (acc, cur) => acc + cur.damage,
    0,
  );
  const totalDamage4 = result.baseResult.damageLog4.reduce(
    (acc, cur) => acc + cur.damage,
    0,
  );
  const totalDamage5 = result.baseResult.damageLog5.reduce(
    (acc, cur) => acc + cur.damage,
    0,
  );
  console.log("Base Action:", baseEachTurnResult);
  const total =
    totalDamage + totalDamage2 + totalDamage3 + totalDamage4 + totalDamage5;
  const baseEachTurnTotal = baseEachTurnResult.map((value) => {
    return value[0] + value[1] + value[2] + value[3] + value[4];
  });

  function parsePercentage(base: number, current: number, words: string = "") {
    const diff = calculateDamageDifference(base, current);
    if (diff > 0) {
      return (
        <h4 className="text-md font-semibold text-green-500">
          {words}
          {formatNumber(current)} (+{diff}%)
        </h4>
      );
    }
    if (diff === 0) {
      return (
        <h4 className="text-md font-semibold ">
          {words}
          {formatNumber(current)} (+{diff}%)
        </h4>
      );
    }

    if (diff < 0) {
      return (
        <h4 className="text-md font-semibold text-red-500">
          {words}
          {formatNumber(current)} ({diff}%)
        </h4>
      );
    }
  }

  function parseBond(char: CharacterTeam) {
    return `絆數: ${char[0].bond}${char[1].bond}${char[2].bond}${char[3].bond}${char[4].bond}`;
  }

  return (
    <div className="w-full mx-auto md:max-w-[600px] font-[family-name:var(--font-geist-sans)] p-2">
      <DisplaySelect index={index} />

      <Card className="p-1">
        <Collapsible>
          <div className="flex items-center justify-between space-x-4 px-1">
            {parseBond(result.team)}
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                <ChevronDown className="h-4 w-4" />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent>
            <div className="grid grid-cols-5">
              {result.baseAction.map((value, i) => {
                return (
                  <div key={"action" + i} className="text-center">
                    {parseMoveSet(value.position)}
                  </div>
                );
              })}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </Card>
      <Card className="p-1">
        <Collapsible>
          <div className="flex items-center justify-between space-x-4 px-1">
            {`總傷: ${formatNumber(total)}`}
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                <ChevronDown className="h-4 w-4" />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent>
            <div className="grid grid-cols-3 w-full gap-1 ">
              <Badge className="p-0.5 px-auto justify-center w-full">
                {formatNumber(totalDamage)}
              </Badge>
              <Badge className="p-0.5 px-auto justify-center w-full">
                {formatNumber(totalDamage2)}
              </Badge>
              <Badge className="p-0.5 px-auto justify-center w-full">
                {formatNumber(totalDamage3)}
              </Badge>
            </div>
            <div className="grid grid-cols-3 w-full gap-1 mt-1 ">
              <Badge className="p-0.5 px-auto justify-center w-full">
                {formatNumber(totalDamage4)}
              </Badge>
              <Badge className="p-0.5 px-auto justify-center w-full">
                {formatNumber(totalDamage5)}
              </Badge>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      <Card className="p-1">
        <Collapsible>
          <div className="flex items-center justify-between space-x-4 px-1">
            每回合輸出
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                <ChevronDown className="h-4 w-4" />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent>
            {baseEachTurnResult.map((value, i) => {
              const total =
                value[0] + value[1] + value[2] + value[3] + value[4];
              return (
                <div key={"baseTeam" + i}>
                  {total !== 0 ? (
                    <Card className="p-1">
                      <Collapsible>
                        <div className="flex items-center justify-between space-x-4 px-1">
                          T{i + 1}輸出:
                          {formatNumber(total)}
                          <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <ChevronDown className="h-4 w-4" />
                              <span className="sr-only">Toggle</span>
                            </Button>
                          </CollapsibleTrigger>
                        </div>
                        <CollapsibleContent>
                          <div className="grid grid-cols-3 w-full gap-1 ">
                            <Badge className="p-0.5 px-auto justify-center w-full">
                              {formatNumber(value[0])}
                            </Badge>
                            <Badge className="p-0.5 px-auto justify-center w-full">
                              {formatNumber(value[1])}
                            </Badge>
                            <Badge className="p-0.5 px-auto justify-center w-full">
                              {formatNumber(value[2])}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-3 w-full gap-1 mt-1 ">
                            <Badge className="p-0.5 px-auto justify-center w-full">
                              {formatNumber(value[3])}
                            </Badge>
                            <Badge className="p-0.5 px-auto justify-center w-full">
                              {formatNumber(value[4])}
                            </Badge>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    </Card>
                  ) : null}
                </div>
              );
            })}
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {result.analysis.map((value, i) => {
        console.log(value);
        const eachTurnDmg = calculateDamageEachTurn(
          value.damageLog1,
          value.damageLog2,
          value.damageLog3,
          value.damageLog4,
          value.damageLog5,
          result.turn,
        );
        console.log("Ult Action:", eachTurnDmg);
        console.log(value.damageLog5);

        const dmg1 = value.damageLog1.reduce((acc, cur) => acc + cur.damage, 0);
        const dmg2 = value.damageLog2.reduce((acc, cur) => acc + cur.damage, 0);
        const dmg3 = value.damageLog3.reduce((acc, cur) => acc + cur.damage, 0);
        const dmg4 = value.damageLog4.reduce((acc, cur) => acc + cur.damage, 0);
        const dmg5 = value.damageLog5.reduce((acc, cur) => acc + cur.damage, 0);

        return (
          <div key={"analysis" + i}>
            <Separator className="my-2" />
            <Card className="p-2">
              <div className="flex items-center justify-between space-x-4 px-1">
                {parseBond(value.select)}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteAnalysis(index, i)}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Toggle</span>
                </Button>
              </div>
            </Card>
            <Card className="p-1">
              <Collapsible>
                <div className="flex items-center justify-between space-x-4 px-1">
                  {parsePercentage(
                    total,
                    dmg1 + dmg2 + dmg3 + dmg4 + dmg5,
                    `隊${i + 1} 總傷: `,
                  )}
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <ChevronDown className="h-4 w-4" />
                      <span className="sr-only">Toggle</span>
                    </Button>
                  </CollapsibleTrigger>
                </div>
                <CollapsibleContent>
                  <div className="grid grid-cols-3 w-full gap-1 ">
                    <Badge className="p-0.5 px-auto text-center w-full">
                      {parsePercentage(totalDamage, dmg1, "")}
                    </Badge>
                    <Badge className="p-0.5 px-auto text-center w-full">
                      {parsePercentage(totalDamage2, dmg2, "")}
                    </Badge>
                    <Badge className="p-0.5 px-auto text-center w-full">
                      {parsePercentage(totalDamage3, dmg3, "")}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 w-full gap-1 mt-1 ">
                    <Badge className="p-0.5 px-auto text-center w-full">
                      {parsePercentage(totalDamage4, dmg4, "")}
                    </Badge>
                    <Badge className="p-0.5 px-auto text-center w-full">
                      {parsePercentage(totalDamage5, dmg5, "")}
                    </Badge>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </Card>

            <Card className="p-1">
              <Collapsible>
                <div className="flex items-center justify-between space-x-4 px-1">
                  每回合輸出
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <ChevronDown className="h-4 w-4" />
                      <span className="sr-only">Toggle</span>
                    </Button>
                  </CollapsibleTrigger>
                </div>
                <CollapsibleContent>
                  {eachTurnDmg.map((value, i) => {
                    const total =
                      value[0] + value[1] + value[2] + value[3] + value[4];
                    console.log(i);
                    return (
                      <div key={"baseTeam" + i}>
                        {total !== 0 ? (
                          <Card className="p-1">
                            <Collapsible>
                              <div className="flex items-center justify-between space-x-4 px-1">
                                {parsePercentage(
                                  baseEachTurnTotal[i],
                                  total,
                                  `T${i + 1}輸出: `,
                                )}
                                <CollapsibleTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <ChevronDown className="h-4 w-4" />
                                    <span className="sr-only">Toggle</span>
                                  </Button>
                                </CollapsibleTrigger>
                              </div>
                              <CollapsibleContent>
                                <div className="grid grid-cols-3 w-full gap-1 ">
                                  <Badge className="p-0.5 px-auto text-center w-full">
                                    {parsePercentage(
                                      baseEachTurnResult[i][0],
                                      value[0],
                                      "",
                                    )}
                                  </Badge>
                                  <Badge className="p-0.5 px-auto text-center w-full">
                                    {parsePercentage(
                                      baseEachTurnResult[i][1],
                                      value[1],
                                      "",
                                    )}
                                  </Badge>
                                  <Badge className="p-0.5 px-auto text-center w-full">
                                    {parsePercentage(
                                      baseEachTurnResult[i][2],
                                      value[2],
                                      "",
                                    )}
                                  </Badge>
                                </div>
                                <div className="grid grid-cols-3 w-full gap-1 mt-1 ">
                                  <Badge className="p-0.5 px-auto text-center w-full">
                                    {parsePercentage(
                                      baseEachTurnResult[i][3],
                                      value[3],
                                      "",
                                    )}
                                  </Badge>
                                  <Badge className="p-0.5 px-auto text-center w-full">
                                    {parsePercentage(
                                      baseEachTurnResult[i][4],
                                      value[4],
                                      "",
                                    )}
                                  </Badge>
                                </div>
                              </CollapsibleContent>
                            </Collapsible>
                          </Card>
                        ) : null}
                      </div>
                    );
                  })}
                </CollapsibleContent>
              </Collapsible>
            </Card>
          </div>
        );
      })}
    </div>
  );
}
