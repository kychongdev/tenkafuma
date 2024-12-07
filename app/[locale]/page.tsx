import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Home() {
  return (
    <div className="w-full mx-auto md:max-w-[600px] font-[family-name:var(--font-geist-sans)] p-4">
      開發中!! 請勿使用!! 一堆BUG你用來幹什麼!
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>免責聲明</AccordionTrigger>
          <AccordionContent>
            本站工具所提供的數據與實際情形發生差異而導致的利害一概不負責，最終請以官方及遊戲內數據為主。
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>注意事項</AccordionTrigger>
          <AccordionContent>
            目前功能極其不穩定，因為實裝了敵人還要加護盾/治療/站位等等，如要使用請自行承擔風險。
            <br />
            數值因小數點關係，每次數值結算會有1～9的偏差。
            <br />
            未實裝：
            <br />
            免疫類效果
            <br />
            負面效果如睡眠，麻痹等
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
            增加更多遊戲關卡（SP，魔塔）
            <br />
            玩家分享功能
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
