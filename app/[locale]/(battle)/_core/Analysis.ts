import localforage from 'localforage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { p } from './utils';

interface Analysis {}
export const useAnalysis = create<Analysis>()(
  persist(
    immer((set) => ({
      select: null,
    })),
    {
      name: 'analysis',
      storage: createJSONStorage(() => localforage),
    },
  ),
);
