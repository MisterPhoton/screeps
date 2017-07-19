'use strict';

/*
 * quester checks if quests are solved
 */

roles.quester = {};
roles.quester.settings = {
  layoutString: 'M',
  maxLayoutAmount: 1
};

roles.quester.action = function(creep) {
  let quest = Memory.quests[creep.memory.level];

  if (quest.quest == 'buildcs') {
    // Give time before end to build the last CS
    if (quest.end - Game.time > 300) {
      let cs = creep.room.find(FIND_CONSTRUCTION_SITES);
      if (cs.length === 0) {
        creep.pos.createConstructionSite(STRUCTURE_ROAD);
      }
    }
    if (quest.end < Game.time) {
      let cs = creep.room.find(FIND_CONSTRUCTION_SITES);
      if (cs.length === 0) {
        creep.log(`Quest won: ${JSON.stringify(quest)}`);
        let response = {
          type: 'Quest',
          id: quest.id,
          reputation: '100',
          result: 'won'
        };
        let room = Game.rooms[quest.origin];
        room.terminal.send(RESOURCE_ENERGY, 100, quest.player.room, JSON.stringify(response));
      }
    }
  }

  creep.moveRandom();
};
