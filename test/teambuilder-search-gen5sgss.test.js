d client const assert = require('assert');

describe('Teambuilder search uses format-mod Dex', function () {
  it('search backend should use the modded Dex when format has a mod (gen5sgss)', function () {
    require('../play.pokemonshowdown.com/js/battle-dex.js');

    // Load search implementation into the global context so DexSearch is available
    const fs = require('fs');
    const vm = require('vm');
    const searchCode = fs.readFileSync(require.resolve('../play.pokemonshowdown.com/js/battle-dex-search.js'), 'utf8');
    vm.runInNewContext(searchCode, global);

    const formats = require('../play.pokemonshowdown.com/data/formats.js').Formats;
    const tb = require('../play.pokemonshowdown.com/data/teambuilder-tables.js').BattleTeambuilderTable;

    global.window = global.window || global;
    window.BattleFormats = window.BattleFormats || {};
    for (const f of formats) {
      if (f && f.name) {
        const id = ('' + f.name).toLowerCase().replace(/[^a-z0-9]+/g, '');
        window.BattleFormats[id] = f;
      }
    }
    window.BattleTeambuilderTable = tb;

    // Create a DexSearch for the teambuilder format and ensure it uses the modded Dex
    const DexSearch = global.DexSearch;
    const ds = new DexSearch('pokemon', '[Gen 5] Sacred Gold & Storm Silver');

    // typedSearch.dex should be the modded Dex
    assert(ds.typedSearch, 'typedSearch should exist');
    const typedDex = ds.typedSearch.dex;
    assert.strictEqual(typedDex.modid, 'gen5sgss', 'typed search Dex should be the gen5sgss mod');

    // Ensure species lookup uses overridden stats
    const butter = typedDex.species.get('butterfree');
    assert.deepStrictEqual(butter.baseStats, { hp: 60, atk: 45, def: 50, spa: 100, spd: 100, spe: 80 });
    assert.strictEqual(butter.abilities && butter.abilities[0], 'Tinted Lens');
  });
});
