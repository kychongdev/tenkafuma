'use client';
import { ClientOnly } from '@/components/ClientOnly';
import Edit from './edit';

export default function EditPage() {
  return (
    <ClientOnly>
      <Edit />
    </ClientOnly>
  );
}
