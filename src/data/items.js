// Every player skill comes from an item (ของขลัง).
// Slot 1 must always hold an item with cooldown 0, so the player always has a move.
// Names/lore are placeholders — story comes later.
export const ITEMS = {
  knife: {
    name: 'มีดหมอ', icon: 'item_knife',
    lore: 'มีดด้ามไม้ใบสั้นลงอักขระ ของประจำตัวหมอผี',
    skill: { name: 'ฟัน', dmg: 6, cooldown: 0 },
  },
};

export const STARTING_ITEMS = ['knife'];
