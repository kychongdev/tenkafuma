export function calculateStats(
  initStats: number,
  level: number,
  star: number,
  room: number,
  pot: number,
  lib: number,
) {
  const starStats = star === 3 ? 1 : star === 4 ? 1.125 : star === 5 ? 1.25 : 1;
  const roomStats =
    room === 1 ? 1.05 : room === 2 ? 1.15 : room === 3 ? 1.3 : 1;
  const levelStats = level - 1;
  const libStats = lib > 1 ? 1.1 : 1;
  const res = Math.floor(
    Math.floor(
      initStats * 1.1 ** levelStats * starStats * roomStats * (1 + pot / 100),
    ) * libStats,
  );
  console.log(res);
  return res;
}
