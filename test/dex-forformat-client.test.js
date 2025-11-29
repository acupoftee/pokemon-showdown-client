const assert = require('assert');

describe('Dex.forFormat client behavior', function () {
  it('should return a modded Dex when the format has a mod (gen5sgss)', function () {
    require('../play.pokemonshowdown.com/js/battle-dex.js');

    const formats = require('../play.pokemonshowdown.com/data/formats.js').Formats;
    const tb = require('../play.pokemonshowdown.com/data/teambuilder-tables.js').BattleTeambuilderTable;

    // Ensure window exists and populate BattleFormats/BattleTeambuilderTable as the client does
    global.window = global.window || global;
    window.BattleFormats = window.BattleFormats || {};
    for (const f of formats) {
      if (f && f.name) {
        // toID implementation used by the client
        const id = ('' + f.name).toLowerCase().replace(/[^a-z0-9]+/g, '');
        window.BattleFormats[id] = f;
      }
    }
    window.BattleTeambuilderTable = tb;

    const Dex = global.Dex;
    const dex = Dex.forFormat('[Gen 5] Sacred Gold & Storm Silver');

    assert.strictEqual(dex.modid, 'gen5sgss', 'Dex.forFormat should return the gen5sgss modded Dex');

    // Check that mod overrides are applied in species data
    const butter = dex.species.get('butterfree');
    assert.deepStrictEqual(butter.baseStats, { hp: 60, atk: 45, def: 50, spa: 100, spd: 100, spe: 80 });
    assert.strictEqual(butter.abilities && butter.abilities[0], 'Tinted Lens');
  });
});
