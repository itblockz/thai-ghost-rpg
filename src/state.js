export const player = { name: 'หมอผีน้อย', hp: 30, maxHp: 30, atk: 7, def: 2, exp: 0 };
export function resetPlayer() { Object.assign(player, { hp: 30, maxHp: 30, exp: 0 }); }
