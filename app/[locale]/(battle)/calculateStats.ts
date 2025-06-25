import Big from "big.js";

export function calculateStats(
  initStats: number,
  level: number,
  star: number,
  room: number,
  pot: number,
  lib: number,
) {
  const starStats = Big(
    star === 3 ? 1 : star === 4 ? 1.125 : star === 5 ? 1.25 : 1,
  );
  const roomStats = Big(
    room === 1 ? 1.05 : room === 2 ? 1.15 : room === 3 ? 1.3 : 1,
  );
  const libStats = Big(lib > 1 ? 1.1 : 1);
  const lvl = Big(1.1).pow(level - 1);
  console.log(initStats, level, star, room, pot, lib);

  if (lib < 1) {
    return Big(initStats)
      .mul(lvl)
      .mul(starStats)
      .mul(roomStats)
      .mul(1 + pot / 100)
      .round(0, Big.roundDown)
      .toNumber();
  }
  return Big(initStats)
    .mul(lvl)
    .mul(starStats)
    .mul(roomStats)
    .mul(1 + pot / 100)
    .mul(libStats)
    .round(0, Big.roundDown)
    .toNumber();
}
