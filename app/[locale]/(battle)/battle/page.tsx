"use client";

import { ClientOnly } from "@/components/ClientOnly";
import Battle from "./Battle";

export default function BattlePage() {
  return (
    <ClientOnly>
      <Battle />
    </ClientOnly>
  );
}
