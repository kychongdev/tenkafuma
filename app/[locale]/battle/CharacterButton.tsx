import Image from "next/image";
import { useGameState } from "../(battle)/GameState";
import { Progress } from "@/components/ui/progress";
import { f } from "../(battle)/utils";
import { Button } from "@/components/ui/button";
import { CharacterStatus } from "./CharacterStatus";
import { CharacterState } from "../(battle)/types/Select";
import { HpBar } from "./HpBar";
import { AffectType } from "../(battle)/types/Skill";
import { useBattleSettings } from "../(battle)/BattleSettings";

export const CharacterButton = ({ position }: { position: number }) => {
  const character = useGameState((state) => state.characters[position]);
  const enemies = useGameState((state) => state.enemies);
  const { basicAction, ultAction, guardAction } = useGameState(
    (state) => state,
  );
  const buff = useGameState((state) => state.characters[position].buff);
  const shield = buff.reduce((acc, cur) => {
    if (cur._0 && cur._0.affectType === AffectType.RAW_SHIELD) {
      return acc + cur._0.value;
    }
    return acc;
  }, 0);
  const isGameEnd = enemies.every((enemy) => !enemy.isExist || enemy.isDead);
  const halfPic = useBattleSettings((state) => state.halfPic);
  const imgSrc = halfPic
    ? `/characters/square/${
        character.id == "" || !character.id ? "char_nr" : character.id
      }.png`
    : `/characters/full/${
        character.id == "" || !character.id ? "char_nr" : character.id
      }.png`;

  return (
    <div>
      <div className="relative h-2">
        <div className="absolute w-full">
          <Progress
            value={(character.hp / character.maxHp) * 100}
            className="rounded-none"
          />
        </div>
        <div className="absolute w-full">
          <HpBar
            value={
              (shield / character.maxHp) * 100 > 100
                ? 100
                : (shield / character.maxHp) * 100
            }
          />
        </div>
      </div>
      <div>
        <Image
          className={`border-solid border-2 border-white ${
            isMoveable(character) && !isGameEnd ? "" : "opacity-50"
          } `}
          src={imgSrc}
          width={167}
          height={512}
          priority
          alt={`char_${position}`}
          onClick={() => {
            if (isMoveable(character) && !isGameEnd) {
              basicAction(position);
            }
          }}
        />
        <div className="text-center text-xs">{f(character.hp)}</div>
        <Button
          disabled={!isMoveable(character) || isGameEnd || character.cd !== 0}
          className="py-0 h-6 my-1 w-full"
          onClick={() => {
            if ((isMoveable(character) && !isGameEnd) || character.cd !== 0) {
              ultAction(position);
            }
          }}
        >
          必殺
        </Button>
        <Button
          disabled={!isMoveable(character) || isGameEnd}
          className="py-0 h-6 my-1 w-full"
          onClick={() => {
            if (isMoveable(character) && !isGameEnd) {
              guardAction(position);
            }
          }}
        >
          防禦
        </Button>
        <CharacterStatus position={position} />
      </div>
    </div>
  );
};

function isMoveable(character: CharacterState) {
  return (
    !(
      character.isDead ||
      character.isMoved ||
      character.isGuard ||
      character.isSleep ||
      character.isSilence ||
      character.isParalysis
    ) && character.isExist
  );
}
