import Image from "next/image";
import { useGameState } from "../(battle)/GameState";
import { Progress } from "@/components/ui/progress";
import { f } from "../(battle)/utils";
import { Button } from "@/components/ui/button";
import { CharacterStatus } from "./CharacterStatus";
import { SaveBattle } from "./SaveBattle";
import { CharacterState } from "../(battle)/types/Select";

export const CharacterButton = ({ position }: { position: number }) => {
  const character = useGameState((state) => state.characters[position]);
  const { basicAction, ultAction, guardAction } = useGameState(
    (state) => state,
  );
  const enemy = useGameState((state) => state.enemies);

  return (
    <div>
      <Progress
        value={(character.hp / character.maxHp) * 100}
        className="w-full rounded-none"
      />
      <Image
        className={`border-solid border-2 border-white ${
          isMoveable(character) ? "" : "opacity-50"
        }`}
        src={`/characters/full/${
          character.id == "" || !character.id ? "char_nr" : character.id
        }.png`}
        width={167}
        height={512}
        priority
        alt={`char_${position}`}
        onClick={() => {
          if (isMoveable(character)) {
            basicAction(position);
          }
        }}
      />
      <div className="text-center text-xs">{f(character.hp)}</div>
      <Button
        disabled={!isMoveable(character) || character.cd !== 0}
        className="py-0 h-6 my-1 w-full"
        onClick={() => {
          if (isMoveable(character) || character.cd !== 0) {
            ultAction(position);
          }
        }}
      >
        必殺
      </Button>
      <Button
        disabled={!isMoveable(character)}
        className="py-0 h-6 my-1 w-full"
        onClick={() => {
          if (isMoveable(character)) {
            guardAction(position);
          }
        }}
      >
        防禦
      </Button>
      <CharacterStatus position={position} />
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

function checkEnemyAlive(enemies: CharacterState[]) {
  return enemies.filter((enemy) => enemy.hp > 0).length > 0;
}
