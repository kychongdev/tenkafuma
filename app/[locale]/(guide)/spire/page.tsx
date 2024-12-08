"use client";

import { ClientOnly } from "@/components/ClientOnly";
import Spire from "./spire";

export default function StagePage() {
  return (
    <ClientOnly>
      <Spire />
    </ClientOnly>
  );
}
