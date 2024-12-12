import Image from "next/image";
export default function Spire() {
  return (
    <div className="w-full mx-auto md:max-w-[600px] font-[family-name:var(--font-geist-sans)]">
      <Image
        className="px-4 py-2"
        src={"/stages/s22.png"}
        alt="stages_s21"
        width={1000}
        height={1000}
      />
      <Image
        className="px-4 py-2"
        src={"/stages/s21.png"}
        alt="stages_s21"
        width={1000}
        height={1000}
      />
    </div>
  );
}
