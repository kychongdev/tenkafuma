import { useRouter } from "@/app/i18n/routing";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function SpireCard({ num }: { num: number }) {
  const router = useRouter();
  return (
    <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm mb-2">
      <div className="flex items-center justify-between ">
        <h4 className="text-sm font-semibold w-4">
          第二十一季
        </h4>
        <Image
          className="px-4 py-2"
          src={`/stages/s${num}.png`}
          alt={`stages_s${num}`}
          width={500}
          height={500}
        />
      </div>

      <div className="flex justify-between gap-2">
        <Button
          className="py-0 h-6 my-1 w-full"
          onClick={() => {
            router.push(`/spire/s${num}_61`);
          }}
        >
          61層
        </Button>
        <Button
          className="py-0 h-6 my-1 w-full"
          onClick={() => {
            router.push(`/spire/s${num}_62`);
          }}
        >
          62層
        </Button>

        <Button
          className="py-0 h-6 my-1 w-full"
          onClick={() => {
            router.push(`/spire/s${num}_63`);
          }}
        >
          63層
        </Button>
      </div>
    </div>
  );
}
