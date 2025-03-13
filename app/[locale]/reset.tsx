"use client";
import localforage from "localforage";

export function ResetButton() {
  return (
    <button
      onClick={() => {
        localforage.removeItem("game-state");
        localforage.removeItem("simulate-team");
        localforage.removeItem("simulation");
        localStorage.removeItem("team");
      }}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      重置
    </button>
  );
}
