const assert = require('assert');

describe('Teambuilder tables: expected mods present', function () {
  it('should include expected mod entries', function () {
    const tb = require('../play.pokemonshowdown.com/data/teambuilder-tables.js').BattleTeambuilderTable;

    assert(tb, 'BattleTeambuilderTable must be present');

    //  ensure mods processed by build-indexes exist in the generated table
    const expectedMods = ['gen3rs', 'gen5bw1', 'gen5sgss', 'gen7letsgo', 'gen8bdsp', 'gen9ssb', 'gen9legendsou'];
    for (const mod of expectedMods) {
      assert(tb[mod], `${mod} should exist in BattleTeambuilderTable`);
    }
  });
});
