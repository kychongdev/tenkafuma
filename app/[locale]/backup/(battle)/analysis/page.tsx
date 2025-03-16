"use client";

import { ClientOnly } from "@/components/ClientOnly";
import AnalysisCharacter from "./AnalysisCharacter";

export default function SimulatePage() {
  return (
    <ClientOnly>
      <AnalysisCharacter />
    </ClientOnly>
  );
}
