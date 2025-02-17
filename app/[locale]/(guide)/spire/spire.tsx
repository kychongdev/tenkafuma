import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsDown } from "lucide-react";
import { useState } from "react";
import { SpireCard } from "./SpireCard";
export default function Spire() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full mx-auto md:max-w-[600px] font-[family-name:var(--font-geist-sans)] px-4 py-2">
      <div className="flex items-center justify-between rounded-md border px-4 py-2 font-mono text-sm shadow-sm mb-2">
        開放中
      </div>
      <SpireCard num={23} />
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-full"
      >
        <div className="flex items-center justify-between rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
          <h4 className="text-sm font-semibold">
            歷代摸魚塔
          </h4>

          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              <ChevronsDown className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="space-y-2">
          <SpireCard num={22} />
          <SpireCard num={21} />
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
