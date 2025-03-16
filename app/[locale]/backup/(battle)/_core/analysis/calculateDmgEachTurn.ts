import { groupBy } from 'lodash';
import { DamageLog } from '@/types/Game';

export function calculateDmgEachTurn(
  damageLog: DamageLog[],
  damageLog1: DamageLog[],
  damageLog2: DamageLog[],
  damageLog3: DamageLog[],
  damageLog4: DamageLog[],
  turns: number,
) {
  const groupByTurn = groupBy(damageLog, 'turn');
  const groupByTurn1 = groupBy(damageLog1, 'turn');
  const groupByTurn2 = groupBy(damageLog2, 'turn');
  const groupByTurn3 = groupBy(damageLog3, 'turn');
  const groupByTurn4 = groupBy(damageLog4, 'turn');

  const damageArr = [];
  for (const key in groupByTurn) {
    const sum = groupByTurn[key].reduce((acc, curr) => acc + curr.damage, 0);
    damageArr.push({ turn: key, damage: sum });
  }
  const damageArr1 = [];
  for (const key in groupByTurn1) {
    const sum = groupByTurn1[key].reduce((acc, curr) => acc + curr.damage, 0);
    damageArr1.push({ turn: key, damage: sum });
  }
  const damageArr2 = [];
  for (const key in groupByTurn2) {
    const sum = groupByTurn2[key].reduce((acc, curr) => acc + curr.damage, 0);
    damageArr2.push({ turn: key, damage: sum });
  }
  const damageArr3 = [];
  for (const key in groupByTurn3) {
    const sum = groupByTurn3[key].reduce((acc, curr) => acc + curr.damage, 0);
    damageArr3.push({ turn: key, damage: sum });
  }
  const damageArr4 = [];
  for (const key in groupByTurn4) {
    const sum = groupByTurn4[key].reduce((acc, curr) => acc + curr.damage, 0);
    damageArr4.push({ turn: key, damage: sum });
  }

  const data = [];
  for (let i = 0; i < turns; i++) {
    data.push({
      turn: i + 1,
      0: damageArr[i] ? damageArr[i].damage : 0,
      1: damageArr1[i] ? damageArr1[i].damage : 0,
      2: damageArr2[i] ? damageArr2[i].damage : 0,
      3: damageArr3[i] ? damageArr3[i].damage : 0,
      4: damageArr4[i] ? damageArr4[i].damage : 0,
    });
  }
  return data;
}
