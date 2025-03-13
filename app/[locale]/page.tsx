import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import localforage from "localforage";
import { ResetButton } from "./reset";

export default function Home() {
  return (
    <div className="w-full mx-auto md:max-w-[600px] font-[family-name:var(--font-geist-sans)] p-4">
      <Accordion type="single" className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>免責聲明</AccordionTrigger>
          <AccordionContent>
            本站工具所提供的數據與實際情形發生差異而導致的利害一概不負責，最終請以官方及遊戲內數據為主。
            本站圖源來自與tkfmdata.com
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>注意事項</AccordionTrigger>
          <AccordionContent>
            目前戰鬥不支援三免疫，技能延遲
            <br />
            數值因小數點關係，每次數值結算可能會有1～2的偏差。
            <br />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>更新日誌</AccordionTrigger>
          <AccordionContent>脫離BETA才寫</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>開發路線</AccordionTrigger>
          <AccordionContent>
            支援全角色包含R和SR角色
            <br />
            模擬遊戲關卡
            <br />
            玩家分享功能
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <ResetButton />
    </div>
  );
}
