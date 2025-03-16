import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

export default function AnalysisCharacter() {
  //enable
  const characters = ["10148"];

  return (
    <div className="px-4 pt-4 w-full mx-auto md:max-w-[600px] font-[family-name:var(--font-geist-sans)]">
      {characters.map((char) => {
        return (
          <Avatar
            className="w-12 h-12"
            key={char}
            onClick={() => {
            }}
          >
            <AvatarImage
              src={`/characters/square/${char}.png`}
              alt={char}
            />
            <AvatarFallback>{char}</AvatarFallback>
          </Avatar>
        );
      })}
    </div>
  );
}
