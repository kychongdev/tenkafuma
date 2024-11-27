'use client';
import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TurnState, useGameState } from '@/core/GameState';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { CharacterButton } from './CharacterButton';
import { Button } from '@/components/ui/button';
import { useRouter } from '@/app/i18n/routing';
import { useEffect, useState } from 'react';
import { f, p } from '../_core/utils';
import { BattleControlDrawer } from './BattleControlDrawer';
import { BattleLog } from './BattleLog';
import { EnemyStatus } from './EnemyStatus';
import { useSimulateTeamState } from '../_core/SimulateTeamState';

export default function Battle() {
  const t = useTranslations('Battle');
  const [api, setApi] = useState<CarouselApi>();
  const router = useRouter();
  const {
    ready,
    wave,
    turn,
    turn_state: turnState,
    enemies,
    setTargeting,
    targeting,
    initBattle,
    select,
    undoLastAction,
    debug,
    action,
    damage_log_1,
    damage_log_2,
    damage_log_3,
    damage_log_4,
    damage_log_5,
  } = useGameState((state) => state);

  const { saveToTeam } = useSimulateTeamState((state) => state);

  useEffect(() => {
    if (!api) {
      return;
    }
    api.on('select', () => {
      setTargeting(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="w-full mx-auto md:max-w-[600px] font-[family-name:var(--font-geist-sans)]">
      <div className="px-4 py-2">
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Badge>{t('turn', { turn })}</Badge>
            <Badge>Wave {wave}</Badge>
          </div>
          <Badge>
            {turnState === TurnState.PLAYER_TURN
              ? t('player_turn')
              : turnState === TurnState.ENEMY_TURN
                ? t('enemy_turn')
                : t('data_error')}
          </Badge>
        </div>
        <Progress
          value={(enemies[targeting].hp / enemies[targeting].maxHp) * 100}
          className="mt-3 w-full"
        />
        <div className="text-end text-sm">
          {f(enemies[targeting].hp)}
          {'      '}(
          {((enemies[targeting].hp / enemies[targeting].maxHp) * 100).toFixed(
            2,
          )}
          %) HP
        </div>
        <div className="flex min-h-[100px] justify-center mt-4 mx-16 items-center">
          {ready ? (
            <Carousel setApi={setApi} className="w-full max-w-xs mb-3">
              <CarouselContent>
                {enemies.map((enemy, index) => (
                  <CarouselItem key={index} className="">
                    <EnemyStatus position={index} />
                    <div className="text-white text-center">
                      Enemy {index + 1}
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          ) : (
            <Button
              onClick={() => {
                router.push('/team');
              }}
            >
              Please pick a team
            </Button>
          )}
        </div>
        <div className="grid grid-cols-5 gap-2 mb-5">
          <CharacterButton position={0} />
          <CharacterButton position={1} />
          <CharacterButton position={2} />
          <CharacterButton position={3} />
          <CharacterButton position={4} />
        </div>

        <div className="grid grid-cols-3 gap-2">
          <Button
            onClick={() => {
              if (select) initBattle(select);
            }}
          >
            Reset
          </Button>
          <BattleLog />

          <Button
            onClick={() => {
              router.push('/stage');
            }}
          >
            Stage
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-2">
          <Button
            onClick={() => {
              undoLastAction();
            }}
          >
            Undo
          </Button>
          <Button
            onClick={() => {
              router.push('/battle/stats');
            }}
          >
            Stats
          </Button>
          <Button
            onClick={() => {
              debug();
            }}
          >
            Debug
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-2">
          <Button
            onClick={() => {
              if (select) {
                saveToTeam(
                  p(select),
                  p(action),
                  p({
                    damage_log_1,
                    damage_log_2,
                    damage_log_3,
                    damage_log_4,
                    damage_log_5,
                  }),
                  p(turn),
                );
              } else {
                console.log('no team selected');
              }
            }}
          >
            Save To Analysis
          </Button>
        </div>
      </div>
    </div>
  );
}
