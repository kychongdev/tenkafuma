import { Button } from "@/components/ui/button";
import stage from "@/core/stages/stage.json";
import _ from "lodash";
import { useGameState } from "@/core/GameState";
import { useRouter } from "next/navigation";

//import { Locale, usePathname, useRouter } from '@/app/i18n/routing';

export default function Stage() {
  const stageList = _.pickBy(stage, (value) => {
    return value.available;
  });

  const s = _.values(stageList);

  const { initStage } = useGameState((state) => state);
  const router = useRouter();

  return (
    <div className="w-full mx-auto md:max-w-[600px] font-[family-name:var(--font-geist-sans)]">
      <div className="grid gap-2 px-4 py-2">
        {s.map((x) => (
          <Button
            key={x.name}
            onClick={() => {
              initStage(x.value);
              router.push("/battle");
            }}
          >
            {x.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
