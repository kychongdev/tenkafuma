"use client";

import { ClientOnly } from "@/components/ClientOnly";
import Rift from "./rift";

export default function StagePage() {
  return (
    <ClientOnly>
      <Rift />
    </ClientOnly>
  );
}
