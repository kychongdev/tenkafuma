import { useSimulateTeamState } from '@/core/SimulateTeamState';
import { calculateDamageEachTurn } from './calculateDamageEachTurn';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { calculateDamageDifference, formatNumber } from '@/core/utils';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { DisplaySelect } from './DisplaySelect';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export function SimulateResult({ index }: { index: number }) {
  const result = useSimulateTeamState((state) => state.teams[index]);
  const baseEachTurnResult = calculateDamageEachTurn(
    result.baseResult.damage_log_1,
    result.baseResult.damage_log_2,
    result.baseResult.damage_log_3,
    result.baseResult.damage_log_4,
    result.baseResult.damage_log_5,
    result.turn,
  );

  const totalDamage = result.baseResult.damage_log_1.reduce(
    (acc, cur) => acc + cur.damage,
    0,
  );
  const totalDamage2 = result.baseResult.damage_log_2.reduce(
    (acc, cur) => acc + cur.damage,
    0,
  );
  const totalDamage3 = result.baseResult.damage_log_3.reduce(
    (acc, cur) => acc + cur.damage,
    0,
  );
  const totalDamage4 = result.baseResult.damage_log_4.reduce(
    (acc, cur) => acc + cur.damage,
    0,
  );
  const totalDamage5 = result.baseResult.damage_log_5.reduce(
    (acc, cur) => acc + cur.damage,
    0,
  );
  const total =
    totalDamage + totalDamage2 + totalDamage3 + totalDamage4 + totalDamage5;

  function parsePercentage(base: number, current: number, words: string = '') {
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
        <h4 className="text-md font-semibold">
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

  return (
    <div className="w-full mx-auto md:max-w-[600px] font-[family-name:var(--font-geist-sans)] p-2">
      <DisplaySelect index={index} />
      <Card className="p-1">
        <Collapsible>
          <div className="flex items-center justify-between space-x-4 px-1">
            總傷:
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
            {baseEachTurnResult.map((value, i) => {
              const total =
                value[0] + value[1] + value[2] + value[3] + value[4];
              return (
                <div key={'baseTeam' + i}>
                  {total !== 0 ? (
                    <Card className="p-2">
                      <Collapsible>
                        <CollapsibleTrigger>
                          <div className="font-bold text-md">
                            T{i + 1}輸出:
                            {formatNumber(total)}
                          </div>
                        </CollapsibleTrigger>
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
        const eachTurnDmg = calculateDamageEachTurn(
          value.damage_log_1,
          value.damage_log_2,
          value.damage_log_3,
          value.damage_log_4,
          value.damage_log_5,
          result.turn,
        );

        const dmg1 = value.damage_log_1.reduce(
          (acc, cur) => acc + cur.damage,
          0,
        );
        const dmg2 = value.damage_log_2.reduce(
          (acc, cur) => acc + cur.damage,
          0,
        );
        const dmg3 = value.damage_log_3.reduce(
          (acc, cur) => acc + cur.damage,
          0,
        );
        const dmg4 = value.damage_log_4.reduce(
          (acc, cur) => acc + cur.damage,
          0,
        );
        const dmg5 = value.damage_log_5.reduce(
          (acc, cur) => acc + cur.damage,
          0,
        );

        return (
          <div key={'analysis' + i}>
            <Separator className="my-2" />
            <Card className="p-1">
              <Collapsible defaultOpen>
                <div className="flex items-center justify-between space-x-4 px-1">
                  {parsePercentage(
                    total,
                    dmg1 + dmg2 + dmg3 + dmg4 + dmg5,
                    '總傷: ',
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
                    <Badge className="p-0.5 px-auto justify-center w-full">
                      {parsePercentage(totalDamage, dmg1, '')}
                    </Badge>
                    <Badge className="p-0.5 px-auto justify-center w-full">
                      {parsePercentage(totalDamage2, dmg2, '')}
                    </Badge>
                    <Badge className="p-0.5 px-auto justify-center w-full">
                      {parsePercentage(totalDamage3, dmg3, '')}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 w-full gap-1 mt-1 ">
                    <Badge className="p-0.5 px-auto justify-center w-full">
                      {parsePercentage(totalDamage4, dmg4, '')}
                    </Badge>
                    <Badge className="p-0.5 px-auto justify-center w-full">
                      {parsePercentage(totalDamage5, dmg5, '')}
                    </Badge>
                  </div>
                  {eachTurnDmg.map((value, i) => {
                    const total =
                      value[0] + value[1] + value[2] + value[3] + value[4];
                    return (
                      <div key={'baseTeam' + i}>
                        {total !== 0 ? (
                          <Card className="p-1">
                            <Collapsible>
                              <div className="flex items-center justify-between space-x-4 px-1">
                                <h4 className="text-md font-semibold">
                                  T{i + 1}輸出:
                                  {formatNumber(total)}
                                </h4>
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
          </div>
        );
      })}
    </div>
  );
}
