var assert = require('assert');
var Speaker = require('../util/speaker.js');

describe('should translate mana text', () => {
    it('should translate normal mana', async () => {
        var result = Speaker.filterMana("{W}{U}{B}{R}{G}{2}");
        assert.equal(result, '{White}{Blue}{Black}{Red}{Green}{2}');
    });

    it('should translate phyrexian mana', async () => {
        var result = Speaker.filterMana("{B/P}{B/P}");
        assert.equal(result, '{Phyrexian Black}{Phyrexian Black}');
    });

    it('should translate snow', async () => {
        var result = Speaker.filterMana("{S}");
        assert.equal(result, '{Snow}');
    });

    it('should translate energy', async () => {
        var result = Speaker.filterMana("{E}");
        assert.equal(result, '{Energy}');
    });

});